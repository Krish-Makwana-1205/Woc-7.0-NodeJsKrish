const mongoose = require('mongoose');
const cron = require('node-cron');


const lostschema = new mongoose.Schema({
    lostuser : {
        type:String,
        required:true,
    },
     description : {
        type:String,
     },
     imgurl:{
        type:String
     },
     createdAt:{
        type:Date,
        required:true
     },
     name:{
        type:String,
        required:true,
        unique:true,
     }
});



const category = new mongoose.Schema({
    category:{
        type:String,
        required:true,
    },
    lost:[lostschema]
});

const found = mongoose.model('found', category);

cron.schedule('* * * * *', async() => {
   const uno = new Date();
   uno.setDate(uno.getDate() - 1);

   try{
      await found.updateMany(
         { 'lost.createdAt': { $lt: uno } },
         { $pull: { lost: { createdAt: { $lt: uno } } } }
     );
     console.log("deleted");
   }catch(error){
      console.log("error in cron job");
   }
});
module.exports = found;