var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Day = require("../models/day").model;

router.post("/", (req, res, next) => {
    console.log("request attempted");
    console.log(req.body);
    const dateTime = new Date (req.body.date);

    Day.find({ date: dateTime}, (err,docs) => {
        if(!err) {
            if(docs.length > 0) {
                console.log("Dados já existentes");
                res.status(200).send(docs[0]);
            } else {
                const allTables = require("../data/allTables");
                const day = new Day ({
                    date: dateTime,
                    tables: allTables
                });
                day.save(err => {
                    if(err) {
                        res.status(400).send("Erro na hora de salvar a data");
                    } else {
                        console.log("Criada uma nova data");
                        Day.find({ date:dateTime}, (err, docs) => {
                        err ? res.sendStatus(400) : res.status(200).send(docs[0]);
                        });
                    }});
            }
            } else {
                res.status(400).send("Não foram encontrados dados para data");
        }
    });
});


module.exports = router;