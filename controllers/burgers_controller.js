var express = require("express");

var burger = require("../models/burger.js")

var router = express.Router();

router.get("/", function(req, res) {
    burger.selectAll(function(data){
        var hbsObject = {
            burgers: data
        }
        console.log(res)
        res.render("index", hbsObject)
    })
})

router.post("/api/burger", function(req, res) {
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId })
    })
})

router.put("/api/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id

    console.log("condition", condition)
    
    burger.updateOne({

    }, condition, function(result) {
        if(result.changedRows == 0) {
            return res.status(404).end()
        }
    })
})


module.exports = router