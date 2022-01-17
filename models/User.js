const mongoose= require('mongoose');

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true,
        min:3,
        max:20,
        unique: true
    },
    email:{
        type: String,
        require: true,
        max:50,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min:6
    },
    profilePicture:{
        type: String,
        default:"" 
    },
    coverPicture: {
        type: String,
        default:""
    },
    following:{
        type: Array,
        default:[]
    },
    followers:{
        //we keep user id inside this array'
        type: Array,
        default:[]
    },
    isAdmin:{
       type: Boolean,
       default:false
    }

},
{timestamps:true}
);

module.exports = mongoose.model('User',UserSchema)