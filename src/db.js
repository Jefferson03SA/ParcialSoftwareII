import mongoose from 'mongoose';
export const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost/softwaredb');
        console.log("DB conectada")
    }
    catch(error){
        console.log(error);
    }
}
