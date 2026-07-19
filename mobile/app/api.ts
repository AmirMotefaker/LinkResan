const API_URL = "https://linkresan-api.onrender.com/api";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "خطا در ورود");
  return data;
};

export const getLinks = async (token: string) => {
  const res = await fetch(`${API_URL}/links`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error("خطا در دریافت لینک‌ها");
  return data.links;
};

export const createLink = async (token: string, originalUrl: string) => {
  const res = await fetch(`${API_URL}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ original_url: originalUrl }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "خطا در ساخت لینک");
  return data;
};