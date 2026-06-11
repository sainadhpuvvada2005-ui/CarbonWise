import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import { AuthProvider } from "../context/AuthContext.jsx";
import Register from "../pages/Register.jsx";

vi.mock("../lib/api.js", () => ({
  api: {
    register: vi.fn(),
    login: vi.fn(async () => ({ access_token: "token", token_type: "bearer" })),
    me: vi.fn(async () => ({ full_name: "Test User", email: "test@example.com", green_points: 0, sustainability_level: "Seedling", green_streak: 0 }))
  },
  setToken: vi.fn(),
  clearToken: vi.fn()
}));

describe("Register", () => {
  it("validates short passwords", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Register />
        </AuthProvider>
      </BrowserRouter>
    );
    await userEvent.type(screen.getByLabelText(/full name/i), "Test User");
    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "short");
    await userEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/at least 8/i);
  });
});
