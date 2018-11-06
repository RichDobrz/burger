const express = require("express")
const burger = require("../models/burger.js")
const router = express.Router()

router.get("/", function(req, res) {
    burger.selectAll(function(data){
        const hbObject = {
            burgers: data
        }
        console.log(hbObject)
        res.render("index", hbObject)
    })
})

router.post("/api/burger", (req, res) => {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], result => {
        res.json({id: result.insertId})
    })
})

router.put("/api/burger/:id", (req, res) => {
    const condition = "id = " + req.params.id

    console.log("condition", condition)
    burger.updateOne({

    }, condition, result => {
        if(result.changedRows === 0) {
            return res.status(404).end()
        }
    })
})


module.exports = router