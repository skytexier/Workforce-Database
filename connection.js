// ENV 
require('dotenv').config()

const express = require('express');
const { appendFile } = require('fs');
const mysql = require('mysql2');



// DB connection //
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company_db'
    },
    console.log(`Connected to company_db database`)
)

connection.connect(function (err){
    if (err) console.log(err);
})

module.exports = connection;