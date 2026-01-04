const BASE = import.meta.env.VITE_API_URL;

//  DEBUG: show API base once
console.log("🔗 API BASE URL:", BASE);

/* LOGIN */
export const loginUser = async (email, password) => {
  try {
    console.log(" LOGIN →", `${BASE}/auth/login`);

    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data; // { token, user }
  } catch (err) {
    console.error(" Login API error:", err.message);
    return { error: err.message };
  }
};

/* REGISTER */
export const registerUser = async (name, email, password) => {
  try {
    console.log("➡️ REGISTER →", `${BASE}/auth/register`);

    const res = await fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data; // { message }
  } catch (err) {
    console.error(" Register API error:", err.message);
    return { error: err.message };
  }
};
