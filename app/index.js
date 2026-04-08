import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function requireAuth(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
}

app.get("/", (req, res) => {
    res.render("index.ejs", {title: "Főoldal", page: "home"});
});

app.get("/login", (req, res) => {
    res.render("login.ejs", {title: "Belépés", page: "login"});
});

app.get("/admin", requireAuth, (req, res) => {
  res.render("admin.ejs", { title: "Admin oldal", page: "admin", user: req.user });
});

app.get("/admin/get-appointments", requireAuth, async (req, res) => {
  try {
    const apiKey = process.env.MY_API_KEY; 
    const response = await axios.get(`http://localhost:4000/api/appointments/${apiKey}`);
    
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Hiba az adatok lekérésekor");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  

  try {
    const result = await db.query("SELECT * FROM users WHERE user_email = $1", [email]);
    const user = result.rows[0];
    console.log(user);
    

    if (!user) {
      return res.status(401).send("Hibás email vagy jelszó.");
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).send("Hibás email vagy jelszó.");
    }

    // Token létrehozása
    const token = jwt.sign({ user_id: user.id, role: user.user_role }, process.env.JWT_SECRET, { expiresIn: "1h" });


    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 // 1 óra
    });

    res.redirect("/admin");

  } catch (error) {
    console.error("Bejelentkezési hiba:", error);
    res.status(500).send("Szerverhiba.");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});