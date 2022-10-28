const express = require('express');
const { appendFile } = require('fs');
const mysql = require('mysql2');

// ENV 
const dotenv = require('dotenv');
dotenv.config()

// DB connection //
const connection = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: 'company_db'
    },
    console.log(`Connected to company_db database`)
)

connection.connect(function (err){
    if (err) console.log(err);
})

module.exports = connection;