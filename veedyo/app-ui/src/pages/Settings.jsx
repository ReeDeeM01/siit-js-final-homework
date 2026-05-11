import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Settings() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:3001/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData({
          fullName: res.data.fullName,
          username: res.data.username,
          email: res.data.email,
          bio: res.data.bio || "",
          location: res.data.location || "",
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (formData.username.includes(" ")) {
      setError("Username cannot contain spaces");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:3001/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setSuccess("Profile updated successfully!");
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
        <h1 style={{ fontSize: "24px", marginBottom: "8px" }}>Settings</h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          Update your account information
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

        {success && (
          <div
            style={{
              backgroundColor: "rgba(77, 255, 128, 0.1)",
              border: "1px solid #4dff80",
              color: "#4dff80",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Username
            </label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Bio
            </label>
            <input
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Location
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>

        <button
          onClick={() => navigate("/profile")}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "12px",
            backgroundColor: "transparent",
            color: "var(--text-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Back to Profile
        </button>
        <button
  onClick={async () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This cannot be undone.')
    if (!confirm) return

    const token = localStorage.getItem('token')
    await axios.delete('http://localhost:3001/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }}
  style={{
    marginTop: '12px',
    width: '100%',
    padding: '12px',
    backgroundColor: 'transparent',
    color: '#ff4d4d',
    border: '1px solid #ff4d4d',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer'
  }}>
  Delete Account
</button>
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
