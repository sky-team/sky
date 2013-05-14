/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function loginValidation(formElement){
    var emaillogin = document.forms["loginform"]["loginemail"].value;
    var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
     if(pattern.test(emaillogin))
     {
	return true;
       }else{   
	return false;
       }
}
function RegistrationValidation(){
    
}


