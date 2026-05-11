import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (formData.username.includes(" ")) {
      setError("Username cannot contain spaces");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:3001/register", formData);

      const loginRes = await axios.post("http://localhost:3001/login", {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 60px)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "40px",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>
          Create an account
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          Join VeedYo today
        </p>

        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 77, 77, 0.1)",
              border: "1px solid var(--primary)",
              color: "var(--primary)",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: "var(--text-secondary)",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "var(--primary)", textDecoration: "none" }}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "var(--text)",
  fontSize: "15px",
  outline: "none",
  width: "100%",
};

const buttonStyle = {
  backgroundColor: "var(--primary)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  width: "100%",
};
