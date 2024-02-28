import mongoose from "mongoose";

let isConnected=false;

export const dbConnect = async()=>{
    mongoose.set('strictQuery',true);

    if(isConnected){
        console.log('mongoose is already connected');
        return;
    }
    
    try {
        await mongoose.connect(process.env.DB_URI,{
            dbName: "inkspire",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected=true;
        console.log('database is connected now');

    } catch (error) {
        console.log(error);
    }
}