// Assignment Code
var generateBtn = document.querySelector("#generate");
// Create variables holding various character types to make random choices.
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwzxyz';
const numbers = '1234567890';
//A subset of special characters are available for use.
const specialChar = '!#$%&"()*,@=+-'; 

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

/* The function generatePassword() will create the new random password based on user specified criteria.
   To do the same it will inturn call other functions to take user input , make random choices etc.
   The code is divided into various functions for easy debugging and to promot reusability.
*/
var generatePassword = function(){

  //Create an empty string to store password.
  var password ='';
  
  var lengthInput= choosePasswordLength();
  if(!lengthInput)
  {
    return "";
  }
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

/* Function provides user with the option to specify password length.
   The following validations are run to check for user input validity.
   If any of them are not met , user is given the option to provide input again:
   1. Check that input is a integer. Decimals will fail validation.
   2. Check that the input falls between 8 and 128 (inclusive).
   3. For other inputs like string, empty , decimal etc display an error message and ask user to choose again.

   If presses cancel.
*/
var choosePasswordLength = function(){   
  //debugger;
  lengthInput = window.prompt("Choose a password length between 8 and 128");
  if(lengthInput === null)
  {
    return;
  }
  
  if (!isNaN(lengthInput))
  {     
  
      if (lengthInput < 8 || lengthInput > 128  || Number.isInteger(lengthInput))
      {
          window.alert("Choose a number between 8 and 128. Please try again!");
          generatePassword();
      }
      console.log(length);
      return lengthInput;
  }
  else{
      window.alert("Choose a number between 8 and 128. Please try again!");
      generatePassword();
  }

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
