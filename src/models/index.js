const mongoose = require("mongoose");



const db = {};


//Ket noi CSDL
db.connectDB = async () => {
  try{
      await mongoose.connect(process.env.MONGODB_URI)
          .then(() => console.log("Connected to MongoDB"));

  } catch(err) {
      next(err)
      process.exit();
  }
  
}

module.exports = db;
