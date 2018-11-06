const connection = require("../config/connection.js")

const questionMark = num => {
    let arr = []

    for (let i = 0; i < num; i++) {
        arr.push("?")
    }

    return arr.toString()
}

const objToSql = object => {
    let arr = []

    for (let key in object) {
        let value = object[key]
        if (Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0)  {
                value = "'" + value + "'"
            }
        arr.push(key + "=" + value)
        }
    }
    return arr.toString()
}

const orm = {
    selectAll: function(tableInput, cb) {
        const queryString = ("SELECT * FROM ??" + tableInput + ";")
        connection.query(queryString, function(err, result) {
            if(err) {
                throw err
            }
            cb(result)
        })
    },

    insertOne: function(table, cols, vals, cb) {
        const queryString = "INSERT INTO" + table
        
        queryString += " ("
        queryString += cols.toString()
        queryString += ") "
        queryString += "VALUES ("
        queryString += questionMark(vals.length)
        queryString += ") "
        
        console.log("queryString")

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err
            }
            cb(result)
        })
    },

    updateOne: function(table, objColVals, condition, cb) {
        const queryString = "UPDATE" + table

        queryString += " SET "
        queryString += objToSql(objColVals)
        queryString += " WHERE "
        queryString += condition
        
        console.log(queryString)
        connection.query(queryString, function(err, result){
            if (err) {
                throw err
            }

            cb(result)
        })
    }
    
}

module.exports = orm