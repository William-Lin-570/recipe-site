let user_input = "";

// Ingredient list = pantry list
let currentIngredientList = [];
let defaultText = "Ingredients you input will show up here!";
document.getElementById("pantryList").innerText = defaultText;

function setListeners() {
//Hint: We want to select all buttons from html and make it so that something happens when you click on the buttons! querySelectorAll might be helpful
    let buttons = document.querySelectorAll(".buttons");
    for (item of buttons) {
    //Hint: addEventListener might be useful.
    //Hint: event.target.innerText might be helpful. innerText return type is a string
      item.addEventListener("click", function(event) {buttonClicked(event.target.innerText)});
    }

    // listner for pantry delete button
    let pantryDeleteButton = document.querySelector('.pantrydeletebutton');
	button.addEventListener('click', deleteLastIngredient());
}
setListeners();

/*  FUNC DESCRIPTION: Now we will write the function that takes care of when a button is clicked. */
function buttonClicked(valueClicked) {
    if (isNaN(parseInt(valueClicked))) { //NaN means "Not a Number"
        //Hint: call a function we just created!
        makesSymbol(valueClicked);
    } else {
        //Hint: call a function we just created!
        makesNumber(valueClicked);
    }
    document.querySelector(".result-screen").innerText = strbuffer;
// Hint: we need to change what number appears on the screen! to change html, one listener you could use is querySelector
}

// Add ingredient to the current ingredient list

function addIngredient() {
    let newestIngredient = document.getElementById("ingredientInput").value;
    if (!newestIngredient) {
        return;
    }
    if (newestIngredient.trim()) {
        let len = currentIngredientList.push(newestIngredient);
    }
    document.getElementById("ingredientInput").value = "";
    updatePantryListText(currentIngredientList);
}

// Remove ingredient from the current ingredient list
function deleteLastIngredient() {
    let lastIngredient = currentIngredientList.pop();
    updatePantryListText(currentIngredientList);
}

// Display the current ingredient list
function updatePantryListText(arr) {
    if (arr.length === 0) {
        pantryList.innerText = defaultText;
    } else {
        pantryList.innerText = arr.toString();
    }
}
