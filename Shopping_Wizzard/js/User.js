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
    
  //maximum length of password validation  
    if(pw.length > 15) {  
       document.getElementById("pswdMessage").innerHTML = "**Password length must not exceed 15 characters";  
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