import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mysql from 'mysql2/promise';

dotenv.config();

const pool = mysql.createPool({
    host: "bxcev0kmaiq9fgbmbhwr-mysql.services.clever-cloud.com",
    password: "fYuY6k7lIoDRnnqxkBlA",
    user: "u3lfqvszuygjnawp",
    database: "bxcev0kmaiq9fgbmbhwr",
    port: 3306,
    connectionLimit: 10,
});

const PORT = 8000;
const app = express();

const createConnection = async () => {
    try {
        console.log("DB Connected");
    } catch (error) {
        console.error(error.message);
    }
};

createConnection();

app.use(cors());
app.use(express.json());

app.post('/postBooks', async (req, res) => {
    const { name, author, description } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO books(name, author, description) VALUES(?, ?, ?)', [name, author, description]);
        return res.status(201).json({ message: 'Book added successfully', id: result.insertId });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/getBooks', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM books');
        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/deleteBook', async (req, res) => {
    const { name } = req.body;
    try {
        const [result] = await pool.query('DELETE FROM books WHERE name = ?', [name]);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.use((req, res) => {
    return res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
    console.log("Server Listening at port " + PORT);
});
