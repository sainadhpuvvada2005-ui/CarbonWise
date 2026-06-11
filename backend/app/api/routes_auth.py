from datetime import datetime, timedelta
import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.security import create_access_token, hash_password, verify_password
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import PasswordResetConfirm, PasswordResetRequest, Token, UserCreate, UserLogin, UserRead

router = APIRouter(tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate, db: Session = Depends(get_db)):
    exists = db.query(User).filter(User.email == payload.email.lower()).first()
    if exists:
        raise HTTPException(status_code=409, detail="Email already registered")
    user = User(
        email=payload.email.lower(),
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login", response_model=Token)
def login(payload: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    return Token(access_token=create_access_token(str(user.id)))


@router.post("/logout")
def logout():
    return {"message": "Logged out. Remove the token on the client."}


@router.post("/password-reset/request")
def request_password_reset(payload: PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email.lower()).first()
    if not user:
        return {"message": "If the email exists, a reset link has been generated."}
    token = secrets.token_urlsafe(32)
    user.reset_token_hash = hash_password(token)
    user.reset_token_expires_at = datetime.utcnow() + timedelta(minutes=30)
    db.commit()
    response = {"message": "If the email exists, a reset link has been generated."}
    # Development helper. Production should email this token and omit it from the response.
    response["dev_reset_token"] = token
    return response


@router.post("/password-reset/confirm")
def confirm_password_reset(payload: PasswordResetConfirm, db: Session = Depends(get_db)):
    users = db.query(User).filter(User.reset_token_hash.isnot(None)).all()
    for user in users:
        if user.reset_token_expires_at and user.reset_token_expires_at >= datetime.utcnow():
            if verify_password(payload.token, user.reset_token_hash):
                user.hashed_password = hash_password(payload.new_password)
                user.reset_token_hash = None
                user.reset_token_expires_at = None
                db.commit()
                return {"message": "Password reset successful"}
    raise HTTPException(status_code=400, detail="Invalid or expired reset token")


@router.get("/me", response_model=UserRead)
def me(user: User = Depends(get_current_user)):
    return user
