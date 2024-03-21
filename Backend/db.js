const mongoose=require('mongoose')
const mongoURI='mongodb://localhost:27017/sample'

const connectMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('connected to mongoDb')
    })
    
}
module.exports=connectMongo