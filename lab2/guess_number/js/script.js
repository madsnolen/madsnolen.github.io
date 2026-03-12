//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);


//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
const maxAttempts = 7;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
   
   //showing the guess button
   document.querySelector("#guessBtn").style.display = "inline";
   
   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = ""; //clears the textbox

   let feedback = document.querySelector("#feedback");
   feedback.textContent = ""; //clears feedback

   //clearing previous guesses
   document.querySelector("#guesses").textContent = "";

   //reset attempts left display
   document.querySelector("#attemptsLeft").textContent = maxAttempts - attempts;

   //update score
   document.querySelector("#wins").textContent = wins;
   document.querySelector("#losses").textContent = losses;
}

function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if(guess < 1 || guess > 99){
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    console.log("Attempts: " + attempts);

    //update attempts left display
    document.querySelector("#attemptsLeft").textContent = maxAttempts - attempts;

    feedback.style.color = "orange";
    
    if(guess == randomNumber){
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    }else{ //check back here 
        document.querySelector("#guesses").textContent+= guess + " ";
        if(attempts == maxAttempts){
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            document.querySelector("#losses").textContent = losses;
            gameOver();
        }else if(guess > randomNumber){
            feedback.textContent = "Guess was high";
        }else{
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //displays Reset button
}