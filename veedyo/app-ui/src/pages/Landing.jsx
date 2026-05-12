import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const COLORS = [
  "#ff4d4d",
  "#4d94ff",
  "#a64dff",
  "#ff9f4d",
  "#4dff91",
  "#ff4ddb",
  "#ffd24d",
  "#4dd9ff",
];

export default function Landing() {
  const token = localStorage.getItem("token");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/videos")
        .then((res) => setVideos(res.data))
        .catch(() => {});
    }
  }, []);

  return (
    <div style={{ padding: "24px 32px" }}>
      {token && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "24px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}
        >
          {[
            "All",
            "Music",
            "Gaming",
            "Coding",
            "Travel",
            "Food",
            "Fitness",
            "Tech",
            "Chill",
          ].map((cat) => (
            <button
              key={cat}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: "none",
                backgroundColor:
                  cat === "All" ? "var(--text)" : "var(--surface)",
                color: cat === "All" ? "var(--bg)" : "var(--text)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {token && videos.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            color: "var(--text-secondary)",
          }}
        >
          <p style={{ fontSize: "18px", marginBottom: "16px" }}>
            No videos yet.
          </p>
          <Link
            to="/videos"
            style={{
              backgroundColor: "var(--primary)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Add the first video
          </Link>
        </div>
      )}

      {token && videos.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "10px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  backgroundColor: COLORS[index % COLORS.length],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span style={{ fontSize: "48px" }}>▶</span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "8px",
                    right: "8px",
                    backgroundColor: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {video.duration} min
                </span>
              </div>

              <div style={{ padding: "12px", display: "flex", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: COLORS[index % COLORS.length],
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  {video.category.charAt(0)}
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "4px",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "13px",
                      marginBottom: "2px",
                    }}
                  >
                    {video.authorName} • {video.category}
                  </p>

                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "12px",
                      marginBottom: "6px",
                      lineHeight: "1.4",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {video.description}
                  </p>

                  <a
                    href={video.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "var(--primary)", fontSize: "13px" }}
                  >
                    Watch →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!token && (
        <div
          style={{
            marginTop: "60px",
            padding: "60px 20px",
            textAlign: "center",
            borderTop: "1px solid var(--border)",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            The world is watching{" "}
            <span style={{ color: "var(--primary)" }}>VeedYo</span>
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              marginBottom: "32px",
            }}
          >
            Share your videos. Build your audience. Join millions of creators.
          </p>
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <Link
              to="/register"
              style={{
                backgroundColor: "var(--primary)",
                color: "white",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              style={{
                backgroundColor: "transparent",
                color: "var(--text)",
                padding: "14px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "16px",
                border: "1px solid var(--border)",
              }}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
