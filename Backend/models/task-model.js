const { number } = require('framer-motion');
let mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    },
    icon:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
});

let taskModel = mongoose.model("Tasks",taskSchema);
module.exports = taskModel;