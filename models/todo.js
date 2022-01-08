const mongoose=require('mongoose');
//creating schema
const todoSchema=new mongoose.Schema({
    todo:{
        type:String,
        required:true
    },
    desc:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        require:true
    }
})
//exporting schema
const Todo= mongoose.model('TOdo',todoSchema);
module.exports=Todo;