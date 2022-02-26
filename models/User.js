
//add o mongo
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema do banco de dados 

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique: true
    },

    password:{
        type:String,
        required: true
    },
    
},
  {timestamps:true}
);

UserSchema.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;
        bcrypt.hash(this.password,10,
            (error, hashedPassword)=>{
                if(error)

                next(error)
                else {
                    this.password = hashedPassword;
                    next();
                }
            }
        )
    }
});

//metodos auxiliares do mongo

UserSchema.methods.isCorretoPass = function(password,callback)  {
    bcrypt.compare(password,this.password, function(error,same){
        if(error){
            callback(error);
        }
        else{
            callback(error,same);
        }
    });
}

//exportando esse modulo

module.exports = mongoose.model('User',UserSchema);