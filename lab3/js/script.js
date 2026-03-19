// event listeners 
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event){
    validateForm(event);
});
document.querySelector("#password").addEventListener("click", getSuggestedPassword);

displayStates();

//functions

//displaying city from Web API after entering a zip code
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    //console.log(zipCode)
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    
    //clear previous values
    document.querySelector("#city").innerHTML = "";
    document.querySelector("#latitude").innerHTML = "";
    document.querySelector("#longitude").innerHTML = "";

    //// check if zip is invalid
    if(!data.city){
        document.querySelector("#city").innerHTML = "Zip code not found";
        document.querySelector("#city").style.color = "red";
        return;
    }

    //validate zip
    document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#city").style.color = "blue";

    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

async function displayCounties(){
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for(let k of data){
        countyList.innerHTML += `<option>${k.county}</option>`;
    }
}

async function displayStates(){
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let stateList = document.querySelector("#state");
    stateList.innerHTML = "<option value=''>Select One</option>";

    for(let k of data){
        stateList.innerHTML += `<option value="${k.usps}">${k.state}</option>`;
    }
}

async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError")
    if(data.available){
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    }else{
        usernameError.innerHTML = "Username taken."
        usernameError.style.color = "red";
        }
}

function validateForm(e){
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;

    document.querySelector("#usernameError").innerHTML = "";
    document.querySelector("#passwordError").innerHTML = "";

    if(username.length == 0){
        document.querySelector("#usernameError").innerHTML = "Username Requrired!";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    }

    if(password.length < 6){
        document.querySelector("#passwordError").innerHTML = "Password must be at least 6 characters.";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }else if(password != retypePassword){
        document.querySelector("#passwordError").innerHTML = "Passwords do not match.";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }

    if(!isValid){
        e.preventDefault();
    }
}

async function getSuggestedPassword(){
    let url = "https://csumb.space/api/suggestedPassword.php";
    let response = await fetch(url);
    let data = await response.json();

    console.log(data);

    document.querySelector("#suggestedPwd").innerHTML = "Suggested Password: " + data.suggestedPassword;
    document.querySelector("#suggestedPwd").style.color = "magenta";
}

