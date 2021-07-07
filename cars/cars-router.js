const express = require("express");
const router = express.Router();
const db = require('../data/dbConfig');

router.get("/", (req, res) => {
    db("cars")
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve cars" });
        });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    // select * from fruits where id = 2
    db("cars")
        // .where({ id: id })
        .where("id", "=", id)
        .first()
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to retrieve the car" });
        });
});

router.post("/", (req, res) => {
    const carData = req.body;
    db("cars")
        .insert(carData) // with SQLite, by default it returns an array with the last id
        .then(ids => {
            db("cars")
                .where({ id: ids[0] })
                .then(newCarEntry => {
                    res.status(201).json(newCarEntry);
                });
        })
        .catch(err => {
            console.log("POST error", err);
            res.status(500).json({ message: "Failed to store data" });
        });
});

module.exports = router;