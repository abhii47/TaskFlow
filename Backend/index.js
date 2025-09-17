const express = require('express')
const mongoose = require('mongoose');
const taskModel = require('./models/task-model');
require('dotenv').config()

const app = express()
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('hello world')
});

app.post('/api/task-insert',(req,res)=>{
    let{title,value,icon,color,description} = req.body;
    let taskData = new taskModel({
        title:title,
        value:value,
        icon:icon,
        color:color,
        description:description
    });
    taskData.save().then(()=>{
        res.send("data saved");
    }).catch((err)=>{
        res.send("data not saved",err);
    })
});


mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log('server listening on the',process.env.PORT)
    })
})

