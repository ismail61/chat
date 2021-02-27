const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name : {
        type : String,
        require : true,
        minlength: 4,
        maxlength: 200
    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true.valueOf,
        minlength: 2,
        maxlength: 300
    },
},{
    timestamps : true
})

module.exports = model('User',userSchema)