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
   The code is divided into various functions for easy debugging and for future reusability of code.
*/
var generatePassword = function(){

  //Create an empty string to store password.
  var password ='';
  
  var lengthInput= choosePasswordLength();

  //If user chooses to cancel the password creation stop running the code.
  //All such return statements will return empty string to prevent the UI from displaying text undefined.
  if(!lengthInput)
  {
    return "";
  }

  //This function returns an array containing all character types chosen by the user.
  var characterArrayInput  = chooseCharacter();
  if(!characterArrayInput)
  {
    return "";
  }

  //Provide user with a list of choices and option to confirm or cancel the process.
  var message = "Here are your choices! Press OK to generate password";
    message += "\r\n";
    message += "Password length : "+ lengthInput;
    message += "\r\n";
    message += "Included characters : "+ characterArrayInput;
  var proceed=  window.confirm(message);

  //A second copy of user choices , this will be later used to ensure that the each selected character type is chosen atleast once.
  var ensureCharacterType = [...characterArrayInput];
  
  if (proceed)
    {
        //Run the loop untill the user's password length requirement is met.
        for (var i = 0; i < lengthInput ; i++)
        {
            var randomChoice  = pickaRandomCharacterType(characterArrayInput,ensureCharacterType);
            password += pickRandomCharacter(randomChoice);
       }
       console.log("Generated password "+password);
    }   
  else{
    return "";
  }
    return password;
}

/* Function provides user with the option to specify password length.
   The following validations are run to check for user input validity.
   If any of them are is not met , user is given the option to provide input again:
   1. Check that input is a integer. Decimals will fail validation.
   2. Check that the input falls between 8 and 128 (inclusive).
   3. For other inputs like string, empty , decimal etc display an error message and ask user to choose again.

   If user presses cancel in input prompt, the program exits without generating password.
   For this to work user input is compared with null.
*/
var choosePasswordLength = function(){  
  var lengthInput = window.prompt("Choose a password length between 8 and 128");
  
  //If user presses cancel , skip execution of code.
  if(lengthInput === null)
  {
    return;
  } 

  //Convert the input to a number from string. Using parseFloat instead of parseInt, so that we can check for decimal entries from user.
  length = parseFloat(lengthInput);
  
  if (!isNaN(length) && length >= 8  &&  length <= 128 && Number.isInteger(length) )
  {      
      return length;
  }
  else{
      window.alert("Choose a number between 8 and 128. Please try again!");
      //Recursively call the function to provide user the option to choose valid input.
      return choosePasswordLength();
  }
}

var chooseCharacter = function() {
  //Create empty array to store user choices.
  var arrayOfChoices=[];
  var idx=0;

  lowerCaseInput = window.confirm("Press OK to include LOWER CASE characters");
  upperCaseInput = window.confirm("Press OK to include UPPER CASE characters");
  specialCharInput = window.confirm('Press OK to include SPECIAL CHARACTERS');
  numberInput = window.confirm("Press OK to include NUMBERS");
  
  if (!lowerCaseInput && !upperCaseInput && !specialCharInput && !numberInput)
  {
    //Using a confirm window instead of alert. This gives the user the option to cancel or proceed with password generation.
      var chooseOne= window.confirm("Please choose atleast one character type. Click OK to try again!");
      if(chooseOne)
      {
        //Recursively call function untill user makes a choice or hits cancel.
        return chooseCharacter();
      }
      else
      {
        return;
      }      
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

var pickaRandomCharacterType = function( arrayOfChoices, arrayOfChoicesOne){
  var returnVal;

  //Choose a random character type each iteration.
  // Use arrayOfChoicesOne to make sure each character type is chosen atleast once.
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

//Based on a chosen character type choose a character from the global variables containing the character choices.
var pickRandomCharacter = function(charType)
{
    var char='';
    console.log("Chosen character type :" +charType);
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

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
