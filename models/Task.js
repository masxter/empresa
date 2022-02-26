
//add o mongo
const mongoose = require('mongoose');

// schema do banco de dados 

const TaskSchema = new mongoose.Schema({
    titulo:{
        type:String,
        required:true,
       
    },

    descricao:{
        type:String,
        required:true,
        
    },

    foto:{
        type:String,
        required: true
    },
    
    username:{
        type:String,
        required:true
    }
},
  {timestamps:true}
);

//exportando esse modulo

module.exports = mongoose.model('task',TaskSchema);