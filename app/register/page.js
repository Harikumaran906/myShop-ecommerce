"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function registerUser() {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        isAdmin: false,
      }),
    });

    const data = await res.json();
    setMessage(data.message || "Registered");
  }

  return (
    <main className="container mt-4">
      <h1>Register</h1>

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
          type="password"
          className="form-control"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-success" onClick={registerUser}>
        Register
      </button>

      {message && <p className="mt-3">{message}</p>}
    </main>
  );
}
