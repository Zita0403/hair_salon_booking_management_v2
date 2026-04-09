import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

db.connect()
  .then(() => console.log("Connected to PostgreSQL (API)"))
  .catch(err => console.error("Database connection error", err.stack));

const app = express();
const port = 4000;

app.use(cors({
  origin: ["https://hairsalon.zita.dev", "http://localhost:3001"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/services", async (req, res) => {
  try {
    const result = await db.query("SELECT service_name, service_price FROM services ORDER BY service_name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Szerverhiba"});
  }
});

app.get("/api/hairdressers", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        h.id,
        h.hairdresser_name AS name,
        h.hairdresser_phone_number AS phone_number,
        h.hairdresser_email_address AS email,
        h.work_start_time,
        h.work_end_time,
        h.profile_image,
        ARRAY_AGG(s.service_name ORDER BY s.service_name) AS services
      FROM 
        hairdressers h
      LEFT JOIN 
        hairdresser_services hs ON h.id = hs.hairdresser_id
      LEFT JOIN 
        services s ON hs.service_id = s.id
      GROUP BY 
        h.id, h.hairdresser_name, h.hairdresser_phone_number, h.hairdresser_email_address, h.work_start_time, h.work_end_time, h.profile_image
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Szerverhiba"});
  }
});

app.post("/api/appointments", async (req, res) => {
  const { hairdresser_id, customer_name, customer_phone, appointment_date, service } = req.body;

  if (!hairdresser_id || !customer_name || !customer_phone || !appointment_date || !service) {
    return res.status(400).json({ error: "Minden mező kitöltése kötelező!" });
  }

  try {
    const conflict = await db.query(
      "SELECT * FROM appointments WHERE hairdresser_id = $1 AND appointment_date = $2",
      [hairdresser_id, appointment_date]
    );

    if (conflict.rows.length > 0) {
      return res.status(409).json({ error: "Ez az időpont már foglalt." });
    }

    await db.query(
      `INSERT INTO appointments (hairdresser_id, customer_name, customer_phone, appointment_date, service)
       VALUES ($1, $2, $3, $4, $5)`,
      [hairdresser_id, customer_name, customer_phone, appointment_date, service]
    );

    res.status(201).json({ message: "Időpont sikeresen mentve." });

  } catch (err) {
    console.error("Hiba az időpont mentésekor:", err);
    res.status(500).json({ error: "Szerverhiba." });
  }
});

app.get("/api/get-appointments/:apiKey", async (req, res) => {
  const { apiKey } = req.params;
  if (apiKey !== process.env.MY_API_KEY) {
      return res.status(403).json({ error: "Érvénytelen API kulcs." });
  }
  try {
    const result = await db.query(`
      SELECT 
        a.appointment_date,
        a.customer_name,
        a.customer_phone,
        a.service,
        h.hairdresser_name
      FROM appointments a
      JOIN hairdressers h ON a.hairdresser_id = h.id
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Szerverhiba" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});