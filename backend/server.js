import express from "express"

const app = express()

app.get("/", (req, res) =>{
    res.send("My pet app")
})

app.listen(8000, () =>{
    console.log("Server is running on port 8000")
})