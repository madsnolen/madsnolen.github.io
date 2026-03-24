// event listeners 
document.querySelector("#dogForm").addEventListener("submit", function(event){
    validateForm(event);
});


// function to get dog data from API FETCH function with async/await
async function getDogData(breed){
    let url = `https://api.api-ninjas.com/v1/dogs?name=${breed}`;
    let dogError = document.querySelector("#dogError");

    let response = await fetch(url, {
        headers: {
            "X-Api-Key":"8adQUinql8o3yf4k0dyfhofkEKMP8U2cCeV6EcxA"
        }
});
    let data = await response.json();

    if(data.length == 0){
        dogError.innerHTML = "Breed not found. Please try again.";
        dogError.style.color = "red";
        return;
    }

    displayDogInfo(data[0]);
}

//function to display dog info 
function displayDogInfo(dog){
    //clear previous data
    document.querySelector("#breedName").innerHTML = "";
    document.querySelector("#dogImage").src = "";
    document.querySelector("#lifeSpan").innerHTML = "";
    document.querySelector("#weight").innerHTML = "";
    document.querySelector("#energy").innerHTML = "";
    document.querySelector("#shedding").innerHTML = "";
    document.querySelector("#trainability").innerHTML = "";

    // levels 1:Very Low     2:Low,    3:Medium,  4:High,  5:Very High
    //           [0]          [1]        [2]        [3]       [4]
    let levels = ["Very Low", "Low", "Medium", "High", "Very High"];

    //display data
    document.querySelector("#breedName").innerHTML = dog.name;
    document.querySelector("#dogImage").src = dog.image_link;
    document.querySelector("#lifeSpan").innerHTML = dog.min_life_expectancy + " - " + dog.max_life_expectancy + " years";
    document.querySelector("#weight").innerHTML = dog.min_weight_male + " - " + dog.max_weight_male + " lbs";
    document.querySelector("#energy").innerHTML = levels[dog.energy - 1];
    document.querySelector("#shedding").innerHTML = levels[dog.shedding - 1];
    document.querySelector("#trainability").innerHTML = levels[dog.trainability - 1];
}

function validateForm(e){
    let breedInput = document.querySelector("#breed").value.trim();
    let dogError = document.querySelector("#dogError");

    //clear previous
    dogError.innerHTML = "";

    let isValid = true;

    //validation check input needs to be longer than 2 characters
    if(breedInput.length <2){
        dogError.innerHTML = "Please enter at least 2 letters.";
        dogError.style.color = "red";
        isValid = false;
    }

    //other wise stop submissin if invalid
    if(!isValid){
        e.preventDefault();
        return;
    }

    //we stay on same page so prevent page reload again
    e.preventDefault();

    //call to get dog data
    getDogData(breedInput);

}
