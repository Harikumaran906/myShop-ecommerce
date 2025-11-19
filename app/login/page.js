"use client";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function loginUser() {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      setMessage("Login successful!");
    } else {
      setMessage("Invalid credentials");
    }
  }

  return (
    <main className="container mt-4">
      <h1>Login</h1>

      <div className="mb-3">
        <label>Username</label>
        <input
          name="username"
          className="form-control"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          name="password"
          className="form-control"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={loginUser}>
        Login
      </button>
      <p className="mt-3">
        Don't have an account? <a href="/register">Register here</a>
      </p>


      {message && <p className="mt-3">{message}</p>}
    </main>
  );
}
