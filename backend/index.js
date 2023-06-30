const http=require("http")
const express=require("express")
const socketio=require("socket.io")
const cors=require("cors")
const { connection } = require("./config/db")
const { userRout } = require("./routs/userRouts")
require("dotenv").config()

 
const app=express()
app.use(cors({origin:"*"}))

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("hi")
})

app.use("/user",userRout)

const server=http.createServer(app)

const io=socketio(server)
























server.listen(process.env.PORT,async ()=>{
    try {
        await connection
        console.log(`connected to DB at port: ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})




