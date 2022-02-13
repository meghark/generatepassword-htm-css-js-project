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
    message += "Included characters:"+ characterArrayInput;
    var proceed=  window.confirm(message);

  var ensureCharacterType = [...characterArrayInput];

  if (proceed)
    {
        for (var i = 0; i < length ; i++)
        {
            var randomChoice  = pickaRandomCharacterType(characterArrayInput,ensureCharacterType);
            password += pickRandomCharacter(randomChoice);
       }
       console.log(password);
    }   

    return password;
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
      arrayOfChoices[idx] = 'LowerCase';
      idx++;
  }

  if (upperCaseInput)
  {
      arrayOfChoices[idx] = 'UpperCase';
      idx++;
  }

  if(specialCharInput)
  {
      arrayOfChoices[idx] = 'SpecialCharacters';    
      idx++;    
  }

  if(numberInput)
  {
      arrayOfChoices[idx] = 'Numbers';      
  } 
  return arrayOfChoices;  
}


var pickRandomCharacter = function(charType)
{
    var char='';
    console.log(charType);
    switch(charType){
        case "LowerCase":
            char= lowerCase.charAt(Math.floor(Math.random()* lowerCase.length));
            break;
        case "UpperCase":
            char = upperCase.charAt(Math.floor(Math.random()* upperCase.length));
            break;
        case "SpecialCharacters":
            char = specialChar.charAt(Math.floor(Math.random() * specialChar.length));
            break;
        case "Numbers":
            char = numbers.charAt(Math.floor(Math.random() * numbers.length));
    }   
    return char;
}

var pickaRandomCharacterType = function( arrayOfChoices, arrayOfChoicesOne){
  var returnVal;
  if (arrayOfChoicesOne.length === 0)
  {
      var ch = Math.floor(Math.random()* arrayOfChoices.length);
      returnVal= arrayOfChoices[ch];
  }
  else
  {
      var ch = Math.floor(Math.random()* arrayOfChoicesOne.length);
      returnVal= arrayOfChoicesOne[ch];
      arrayOfChoicesOne.splice(ch,1);     
  }    

  return returnVal ;
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
