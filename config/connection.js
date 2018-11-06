var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "root",
    database: "burgers_db"
})

connection.connect(err => {
    if(err) {
        console.log("error connecting" + err.stack)
        return
    } 
    console.log("connected at id: " + connection.threadId)
})

module.exports = connection