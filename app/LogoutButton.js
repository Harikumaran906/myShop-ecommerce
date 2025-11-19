"use client";

export default function LogoutButton() {
  function logout() {
    localStorage.removeItem("user");
    alert("Logged out!");
  }

  return (
    <button
      onClick={logout}
      className="btn btn-sm btn-outline-danger ms-3"
      style={{ height: "30px" }}
    >
      Logout
    </button>
  );
}
