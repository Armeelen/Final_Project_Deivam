let login=require('./login.js');
const slugify = require("slugify");


const path=require('path');

// console.log(`Your login details are: ${login.email} ${login.password}`);

if (login.authenticate('deelen@gmail.com','O4hvn%379')==true){
    console.log('Login successful');
}else{
    console.log('Login failed- Invalid credentials provided');
}

console.log(slugify("hello world", "-"));

base='/images';
filename='image1.jpg';
fullpath=path.join(base,filename);
console.log(fullpath);

current_directory=path.join(__dirname);
newpath=path.resolve(__dirname,fullpath);
console.log(newpath);