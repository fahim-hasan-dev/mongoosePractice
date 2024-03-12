const express =require("express")
const cors = require("cors")
const app = express()
const mongoose = require('mongoose')
const videoRouter = require("./Routs/video");
const port = 5000
app.use(express.json())
app.use(cors())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://VibeWabe:k2WfXLcTgoHyFoHH@cluster0.m2apie0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/mongooseTest');
  console.log('database connected successfully')
}

app.use('/video',videoRouter)

app.get('/',(req,res)=>{
    res.send('server is running')
})
app.listen(port,()=>{
    console.log('app is rnning ont he port of 5000')
})