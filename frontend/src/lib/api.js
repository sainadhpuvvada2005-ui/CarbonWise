const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

function getToken() {
  return localStorage.getItem("carbonwise_token");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }
  return data;
}

export const api = {
  register: (payload) => request("/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => request("/logout", { method: "POST" }),
  me: () => request("/me"),
  activities: () => request("/activity"),
  createActivity: (payload) => request("/activity", { method: "POST", body: JSON.stringify(payload) }),
  updateActivity: (id, payload) => request(`/activity/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
  deleteActivity: (id) => request(`/activity/${id}`, { method: "DELETE" }),
  analytics: () => request("/analytics"),
  recommendations: () => request("/recommendations"),
  goals: () => request("/goal"),
  createGoal: (payload) => request("/goal", { method: "POST", body: JSON.stringify(payload) }),
  leaderboard: () => request("/leaderboard")
};

export function setToken(token) {
  localStorage.setItem("carbonwise_token", token);
}

export function clearToken() {
  localStorage.removeItem("carbonwise_token");
}
