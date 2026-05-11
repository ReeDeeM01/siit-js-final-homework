import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUsers, saveUsers } from "./db.js";

const app = express();
const PORT = 3001;
const JWT_SECRET = "veedyo-secret-key";

app.use(cors());
app.use(express.json());

// Register
app.post("/register", async (req, res) => {
 const { fullName, username, email, password, bio, location } = req.body;

  const users = getUsers();

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    fullName,
    username,
    email,
    password: hashedPassword,
    bio: bio || "",
    location: location || "",
  };

  users.push(newUser);
  saveUsers(users);

  res.status(201).json({ message: "Account created successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const users = getUsers();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  });
});

// Auth middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
}

// Get Profile
app.get("/profile", authenticateToken, (req, res) => {
  const users = getUsers();
  const user = users.find((u) => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

 res.json({
  id: user.id,
  fullName: user.fullName,
  username: user.username,
  email: user.email,
  bio: user.bio || '',
  location: user.location || ''
})

;
});

// Update Profile
app.put("/profile", authenticateToken, async (req, res) => {
  const { fullName, username, email, bio, location } = req.body;

  const users = getUsers();
  const index = users.findIndex((u) => u.id === req.user.id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    ...users[index],
    fullName: fullName || users[index].fullName,
    username: username || users[index].username,
    email: email || users[index].email,
    bio: bio !== undefined ? bio : users[index].bio,
    location: location !== undefined ? location : users[index].location,
  };

  saveUsers(users);

  res.json({
    id: users[index].id,
    fullName: users[index].fullName,
    username: users[index].username,
    email: users[index].email,
  });
});

// Delete Account
app.delete("/profile", authenticateToken, (req, res) => {
  const users = getUsers()
  const newUsers = users.filter(u => u.id !== req.user.id)
  saveUsers(newUsers)
  res.json({ message: "Account deleted successfully" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
