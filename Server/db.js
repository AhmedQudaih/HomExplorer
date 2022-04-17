const mongoose = require('mongoose');
const category = require('./Model/categoryModel');
const type = require('./Model/estateTypeModel');
const user = require('./Model/userModel');
const estate = require('./Model/estateModel');
main().catch(err => console.log(err));

async function main() {
  //await mongoose.connect('mongodb://localhost:27017/HomExplorer'); // local DB

  await mongoose.connect('mongodb+srv://wamb:wamb123@homeexplorerdb.ykmn0.mongodb.net/HomExplorer'); // Atlas DB Server
}



initDb();
function initDb(){
/*

const apartment = new category.categoryModel({ name: 'Apartment' });
const villa = new category.categoryModel({ name: 'Villa' });

category.categoryModel.insertMany([apartment,villa]).then(function(){
    console.log("category inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});

const auction = new type.estateTypeModel({ name: 'Auction' });
const sell = new type.estateTypeModel({ name: 'Sell' });
const rent = new type.estateTypeModel({ name: 'Rent' });

type.estateTypeModel.insertMany([auction , sell , rent ]).then(function(){
    console.log("type inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});

const newUser = new user.userModel({
  name: "AdminUser",
  password: "Admin@user123",
  email: "Admin@user.com",
  phoneNumber: "00121414252",
  admin:"false"
});

newUser.save(function(err) {
       if (err) {
           console.log(err);
         }
       console.log("user inserted")
   });
*/
}
