email='deelen@gmail.com';
password='O4hvn%379'; 

function authenticate(em,pw){
    if (em==email && pw==password){
        return true;
    }else{
        return false;
    }
}

exports.hello=function (){
    console.log('Hello from the other world');
};

// exports.email=email;
// exports.password=password;
exports.authenticate=authenticate;