class User {
    
}


function verifyPassword(){
    let pw = document.getElementById("password").value;  
    //check empty password field  
    if(pw == "") {  
       document.getElementById("pswdMessage").innerHTML = "**Fill the password please!";  
       return false;  
    }  
     
   //minimum password length validation  
    if(pw.length < 8) {  
       document.getElementById("pswdMessage").innerHTML = "**Password length must be atleast 8 characters";  
       return false;  
    }  
    
    //contains number validation
    if(pw.search(/[0-9]/) < 0){
        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 number";  
    }
    
    //contains uppercas validation
    if(pw.search(/[A-Z]/) < 0){
        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 uppercase letter";  
    }
    //contains lowercase validation
    if(pw.search(/[a-z]/) < 0){
        document.getElementById("pswdMessage").innerHTML = "**Password must contain at least 1 lowercase letter";  
    }
    //maximum length of password validation  
    if(pw.length > 20) {  
       document.getElementById("pswdMessage").innerHTML = "**Password length must not exceed 20 characters";  
       return false;  
    } else {  
       alert("Password is correct");  
    }  
  }  


function confirmPassword(){
    let pw1 = document.getElementById("password");  
    let pw2 = document.getElementById("passwordConfirm");  
    if(pw1 != pw2)  
    {   
      alert("Passwords did not match");  
    } else {  
      alert("Password created successfully");  
    }  
}