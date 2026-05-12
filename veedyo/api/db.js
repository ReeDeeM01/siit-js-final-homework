import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DB_PATH = path.join(__dirname, "db.json")

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"))
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export function getUsers() {
  return readDB().users
}

export function saveUsers(users) {
  const db = readDB()
  writeDB({ ...db, users })
}

export function getVideos() {
  return readDB().videos
}

export function saveVideos(videos) {
  const db = readDB()
  writeDB({ ...db, videos })
}
