var mongoose = require("mongoose");
const Table = require("../models/table").model;
const fs = require("fs");

let tableDate = fs.readFileSync(__dirname + "/allTables.json");
tableData = JSON.parse(tableData).tables;

let allTables = [];
tableData.forEach(table => {
    allTables.push(new Table(table));
});

module.exports = allTables;