const {mongoose} = require('./requires')

const url = 'mongodb://localhost:27017/chat';
mongoose.connect(url,{
    useNewUrlParser : true,
    useFindAndModify : false,
    useUnifiedTopology : true,
    useCreateIndex : true
})

mongoose.connection.on('connected',()=>{
    console.log('Connected to database ');
})
mongoose.connection.on('error',()=>{
    console.log('Connected error ');
})