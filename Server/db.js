const mongoose = require('mongoose');
const category = require('./Model/categoryModel');
const type = require('./Model/estateTypeModel');
const role = require('./Model/roleModel');
const user = require('./Model/userModel');
const estate = require('./Model/estateModel');
main().catch(err => console.log(err));

async function main() {
//  await mongoose.connect('mongodb://localhost:27017/HomExplorer');
//  await mongoose.connect('mongodb+srv://wamb:wamb123@cluster0.ykmn0.mongodb.net/HomExplorer')
  await mongoose.connect('mongodb+srv://wamb:wamb123@homeexplorerdb.ykmn0.mongodb.net/HomExplorer');
}



initDb();
function initDb(){
/*
  const admin = new role.roleModel({ name: 'Admin' });
  const userRole = new role.roleModel({ name: 'User' });

  role.roleModel.insertMany([admin , userRole ]).then(function(){
      console.log("roles inserted")  // Success
  }).catch(function(error){
      console.log(error)      // Failure
  });

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
  name: "Second-User",
  password: "User22@123",
  email: "user22@gmail.com",
  phoneNumber: "00121414252",
  role:"618efd55de85932e186201af"
});

newUser.save(function(err) {
       if (err) {
           console.log(err);
         }
       console.log("user inserted")
   });
*/
}
