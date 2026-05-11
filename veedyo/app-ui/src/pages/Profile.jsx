import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
      </div>
    );
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
          maxWidth: "480px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {user.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontSize: "22px", marginBottom: "4px" }}>
              {user.fullName}
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>@{user.username}</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={fieldStyle}>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Full Name
            </span>
            <span>{user.fullName}</span>
          </div>
          <div style={fieldStyle}>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Username
            </span>
            <span>@{user.username}</span>
          </div>
          <div style={fieldStyle}>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Email
            </span>
            <span>{user.email}</span>
          </div>
          <div style={fieldStyle}>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Bio
            </span>
            <span>{user.bio || "No bio yet"}</span>
          </div>
          <div style={fieldStyle}>
            <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Location
            </span>
            <span>{user.location || "No location set"}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/settings")}
          style={{
            marginTop: "32px",
            width: "100%",
            padding: "12px",
            backgroundColor: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Edit Profile
        </button>

        <button
          onClick={() => navigate("/")}
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
          Back to Home
        </button>
      </div>
    </div>
  );
}

const fieldStyle = {
  backgroundColor: "var(--bg)",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "14px 16px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};
