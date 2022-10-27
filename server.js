const express = require('express');
const { appendFile } = require('fs');
const mysql = require('mysql');

// ENV 
const dotenv = require('dotenv');
dotenv.config()

const PORT = process.env.PORT || 3005;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB connection //
const db = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: 'company_db'
    },
    console.log(`Connected to company_db database`)
)