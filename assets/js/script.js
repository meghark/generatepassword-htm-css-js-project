// Assignment Code
var generateBtn = document.querySelector("#generate");
// Create variables holding various character types to make random choices.
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwzxyz';
const numbers = '1234567890';
//A subset of special characters are available for use.
const specialChar = '!#$%&"()*,@=+-'; 


window.alert("Welcome to the password generator!");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

/* The function generate password will create the new random password based on user specified criteria.
   To do the same it will inturn call other functions to take user input , make random choices etc.
   The code is divided into various functions for easy debugging and to promot reusability.

*/
var generatePassword = function(){

  //Create an empty string to store password.
  var password ='';
  
  var lengthInput= choosePasswordLength();
  var characterArrayInput  = chooseCharacter();

  var message = "Here are your choices!";
    message += "\r\n";
    message += "Password length : "+ lengthInput;
    message += "\r\n";
    message += "Include characters:"+ characterArrayInput;
    var proceed=  window.confirm(message);

  var ensureCharacterType = [...characterArrayInput];
  chooseCharacter();
  
}

var choosePasswordLength = function(){     
  lengthInput = window.prompt("Choose a password length between 8 and 128");
  if (!isNaN(lengthInput))
  {
      if( lengthInput % 1 != 0)
      {
          window.alert("Decimal Entry")
          choosePasswordLength();
      }

      length = parseInt(lengthInput);

      if (length < 8 && length > 128)
      {
          window.alert("Choice outof range");
          choosePasswordLength();
      }

      console.log(length);
  }
  else{
      window.alert("Invalid Entry.");
      choosePasswordLength();
  }

  return lengthInput;
}

var chooseCharacter = function() {
  var arrayOfChoices=[];
  var idx=0;

  lowerCaseInput = window.confirm("Do you want to include lower case letters in the password");
  upperCaseInput = window.confirm("Do you want to include upper case letters in the password");
  specialCharInput = window.confirm("Do you want to include special char letters in the password");
  numberInput = window.confirm("Do you want to include number input letters in the password");
  
  if (!lowerCaseInput && !upperCaseInput && !specialCharInput && !numberInput)
  {
      window.alert("Please choose atleast one character type!");
      chooseCharacter();
  } 
  
  if (lowerCaseInput)
  {
      arrayOfChoices[idx] = 'lowerCaseInput';
      idx++;
  }

  if (upperCaseInput)
  {
      arrayOfChoices[idx] = 'upperCaseInput';
      idx++;
  }

  if(specialCharInput)
  {
      arrayOfChoices[idx] = 'specialCharInput';    
      idx++;    
  }

  if(numberInput)
  {
      arrayOfChoices[idx] = 'numberInput';      
  } 
  return arrayOfChoices;
  
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
