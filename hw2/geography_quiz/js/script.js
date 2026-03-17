//Event listener for the button
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables 
var score = 0;
var attempts = localStorage.getItem("totalAttempts");

displayQ4Choices();
displayQ8Choices();

//dunction to display  question 4 choices
function displayQ4Choices(){
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for(let i=0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;    
}
}//displayQ4Choices

//dunction to display  question 8 choices
function displayQ8Choices(){
    let q8ChoicesArray = ["Florida", "Hawaii", "California", "New York"];
    q8ChoicesArray = _.shuffle(q8ChoicesArray);
    for(let i=0; i < q8ChoicesArray.length; i++){
        document.querySelector("#q8Choices").innerHTML += ` <input type="radio" name="q8" id= "${q8ChoicesArray[i]}" value="${q8ChoicesArray[i]}"> <label for="${q8ChoicesArray[i]}"> ${q8ChoicesArray[i]}</label>`;    
}
}//displayQ8Choices



//Function to validate form
function isFormValid(){
    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered.";
    }
    return isValid;
}//isFormValid

//Function to grade the quiz
function gradeQuiz(){
 console.log("Grading quiz...");
 document.querySelector("#validationFdbk").innerHTML = ""; //resets validation feedback
 if(!isFormValid()){
    return;
 }

 //variables
 score = 0;
 let q1Reponse = document.querySelector("#q1").value.toLowerCase();
 let q2Reponse = document.querySelector("#q2").value;
 let q4Reponse = document.querySelector("input[name=q4]:checked").value;
 let q5Reponse = document.querySelector("#q5").value.toLowerCase();
 let q6Reponse = document.querySelector("#q6").value;
 let q8Reponse = document.querySelector("input[name=q8]:checked").value;
 let q9Reponse = document.querySelector("#q9").value.toLowerCase();
 let q10Reponse = document.querySelector("#q10").value.toLowerCase();



 console.log(q1Reponse);
 console.log(q2Reponse);
 console.log(q4Reponse);
 console.log(q5Reponse);
 console.log(q6Reponse);
 console.log(q7Reponse);
 console.log(q8Reponse);
 console.log(q9Reponse);
 console.log(q10Reponse);

 //grading question 1
 if(q1Reponse == "sacramento"){
    rightAnswer(1);
}
else{
    wrongAnswer(1);
}

 //grading question 2
 if(q2Reponse == "ms"){
   rightAnswer(2);
}
else{
    wrongAnswer(2);
}

//grading question 3
if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked){
    rightAnswer(3);
}
else{
    wrongAnswer(3);
}

//grade question 4
if(q4Reponse == "Rhode Island"){
    rightAnswer(4);
}else{
    wrongAnswer(4);
}

//grade question 5
 if(q5Reponse == "louisville"){
    rightAnswer(5);
}
else{
    wrongAnswer(5);
}

//grade question 6
 if(q2Reponse == "al"){
   rightAnswer(6);
}
else{
    wrongAnswer(6);
}

//grade question 7
if(document.querySelector("#Florida").checked && document.querySelector("#South Carolina").checked && !document.querySelector("#Texas").checked && document.querySelector("#New Hampshire").checked){
    rightAnswer(7);
}
else{
    wrongAnswer(7);
}

//grade question 8
if(q8Reponse == "Florida"){
    rightAnswer(8);
}else{
    wrongAnswer(8);
}

//grade question 9
 if(q1Reponse == "california"){
    rightAnswer(9);
}
else{
    wrongAnswer(9);
}

//grade question 10
 if(q10Reponse == "6"){
    rightAnswer(10);
}
else{
    wrongAnswer(10);
}


document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
//add if statement here to Display the Total Score message in red if the score is lower than 80 or in green otherwise.
//Display a congratulatory message if the score is above 80 points.
if(score < 80){
    document.querySelector("#totalScore").className = "text-danger";
    document.querySelector("#congratsMessage").innerHTML = "";
}else if(score == 80){
    document.querySelector("#totalScore").className = "text-success";
    document.querySelector("#congratsMessage").innerHTML = "";
}else{
    document.querySelector("#totalScore").className = "text-success";
    document.querySelector("#congratsMessage").innerHTML = "Congratulations! You got over 80 points!";
    document.querySelector("#congratsMessage").className = "text-success";
}

document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
localStorage.setItem("totalAttempts", attempts);    
}//gradeQuiz

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML ="<img src='img/checkmark.png'>";
    score += 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect.";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML ="<img src='img/xmark.png'>";
}