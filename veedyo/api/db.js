import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, "db.json")

export function getUsers() {
  const data = fs.readFileSync(DB_PATH, "utf-8")
  return JSON.parse(data).users
}

export function saveUsers(users) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ users }, null, 2))
}
