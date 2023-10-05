require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const ConnectToMongoDB = require('./config/MongoDB')
const QuestionBankRoute = require('./Routes/QuestionBankRoutes')

const app = express();

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

const startApp = async() => {
    //middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    //database connect 
    await ConnectToMongoDB(MONGO_URL,"QuestionBank");

    //routing 
    app.use('/api/v1/questionBank',QuestionBankRoute)

    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`)
    })
}

startApp();


