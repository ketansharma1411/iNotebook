const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({

    //this is an forign key --> which is used to connect two tables/collections.
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    tags:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

module.exports=mongoose.model('notes',notesSchema)