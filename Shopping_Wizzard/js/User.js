class User {
    constructor(product) {
        this.email = '';
        this.password = '';
        this.firstname = '';
        this.lastname = '';
        this.birthday = '';
        this.addressOne = '';
        this.addressTwo = '';
        this.postalCode = '';
        this.country = '';
        this.phone = '';
        this.product = product;
        this.isRegularAdress = false;
    }

    showUser = () => {
        console.log(this);;
    }

    submitAddress = (e) => {
        e.preventDefault();

        if (firstname.value.length > 20) {
            return;
        }
        if (lastname.value.length > 20) {
            return;
        }
        if (addressOne.value.length > 50) {
            return;
        }
        if (addressTwo.value.length > 50) {
            return;
        }
        if (!postalCode.value.match(/^\d{5}(-\d{4})?$/)) {
            return;
        }
        if (country.value) {

        }
        if (!phone.value.match(/^[0-9]{9}$/)) {
            return;
        }

        this.assignFormValues();
        this.showUser();
        removeAddressEventListeners();
    }

    submitLogin = (e) => {
        e.preventDefault();
    }

    assignFormValues = () => {
        this.firstname = firstname.value;
        this.lastname = lastname.value;
        this.birthday = birthday.value;
        this.addressOne = addressOne.value;
        this.addressTwo = addressTwo.value;
        this.postalCode = postalCode.value;
        this.country = country.value;
        this.phone = countryPhone.value + phone.value;
        this.isRegularAdress = regularAddress.checked;
    }

    verifyPassword (){
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
    
    
    confirmPassword (){
        let pw1 = document.getElementById("password");  
        let pw2 = document.getElementById("passwordConfirm");  
        if(pw1 != pw2)  
        {   
          alert("Passwords did not match");  
        } else {  
          alert("Password created successfully");  
        }  
    }
}




