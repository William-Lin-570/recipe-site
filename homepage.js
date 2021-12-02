const apiKey = '636a1bbe30c1423fbc94c278e16834d7';
let user_input = "";
// Ingredient list = pantry list
let currentIngredientList = [];
let defaultText = "Ingredients you input will show up here!";
document.getElementById("pantryList").innerText = defaultText;
updatePantryListText(currentIngredientList);
document.getElementsByClassName("recipeBox").innerText = "Recipes you generate will show up here!";

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

async function generateRecipes() {
    if (currentIngredientList.length == 0) {
        return;
    }
    let ingredientString = pantryList.innerText;
    let recipeResponse = await fetch('https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + apiKey + '&ingredients=' + ingredientString + '&number=1');
    let recipeText = recipeResponse.text();
    console.log(recipeText);
    document.getElementById("recipeBox").innerText = recipeText;
    pantryList.innerText = defaultText;
}

async function readableGeneration() {
    if (currentIngredientList.length == 0) {
        return;
    }
    //the current list of ingredients
    let ingredientString = pantryList.innerText;
    
    //the stuff we will write into recipe area
    let outputArray = [];

    let numToFetch = 30;

    //the url that we make API call to, with ingredients appended onto the end of query
    let fetchString = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + apiKey + '&ingredients=' + ingredientString + '&number=' + numToFetch;
    
    //make API call
    const myRequest = new Request(fetchString);

    //responseJson is what the API returns to us; it is a json
    let responseJson = await fetch(myRequest)

    //we use this weird .then() thing because we have to wait for API repsonse, so .then() means to wait
    //before proceeding
    //here we convert repsonse to json
    .then(response => response.json())
    .then(data => {
        //we iterate through the json now:
        for (let recipe of data) {

            //create empty dictionary for Json values that contains the elements that we want
            var dict = {
                "recipeName": "null",
                "uses": "null",
                "needs": "null"
            }

            console.log(data[0]);

            //we extract the desired elements form json and input to our dictionary
            dict["recipeName"] = recipe.title;
            dict["uses"] = recipe.usedIngredients.map(function(element) {return element["original"]});
            dict["needs"] = recipe.missedIngredients.map(function(element) {return element["original"]});
            console.log("populated!");
            console.log(dict);

            //generate formatted string for recipe:

            //start with empty string
            let recipeText = "";

            //iterate through dictionary to get something that looks like
            //name: apple pie
            //uses: apple,cinnamon,sugar
            //needs:flour
            //where name is the name of the recipe ("title" in json),
            //uses is the ingredients from our ingredients list that we use,
            //and needs is what we are missing in order to make this recipe
            for (let key in dict) {
            recipeText = recipeText + key + ": " + dict[key] + "\n";
            }

            //add string to output array
            outputArray.push(recipeText);
        }
    }
    )
    //catch errors in case API call errors
    .catch(console.error);
    console.log(outputArray);

    //empty string of what we will write to recipe box
    outputStr = "";

    //iterate through output Array to create the string we want
    for (let str of outputArray) {
        outputStr = outputStr + (str + "\n" + "-----" + "\n")
    }

    //set text of recipe box as outputStr
    document.getElementById("recipeBox").innerText = outputStr;

    //reset ingredient list to be empty
    currentIngredientList = [];
    updatePantryListText(currentIngredientList);

}

[{"id":73420,"title":"Apple Or Peach Strudel","image":"https://spoonacular.com/recipeImages/73420-312x231.jpg","imageType":"jpg","usedIngredientCount":2,"missedIngredientCount":2,"missedIngredients":[{"id":18371,"amount":1.0,"unit":"tsp","unitLong":"teaspoon","unitShort":"tsp","aisle":"Baking","name":"baking powder","original":"1 tsp baking powder","originalString":"1 tsp baking powder","originalName":"baking powder","metaInformation":[],"meta":[],"image":"https://spoonacular.com/cdn/ingredients_100x100/white-powder.jpg"},{"id":1123,"amount":1.0,"unit":"","unitLong":"","unitShort":"","aisle":"Milk, Eggs, Other Dairy","name":"egg","original":"1 egg","originalString":"1 egg","originalName":"egg","metaInformation":[],"meta":[],"image":"https://spoonacular.com/cdn/ingredients_100x100/egg.png"}],"usedIngredients":[{"id":9003,"amount":6.0,"unit":"large","unitLong":"larges","unitShort":"large","aisle":"Produce","name":"apples","original":"6 large baking apples","originalString":"6 large baking apples","originalName":"baking apples","metaInformation":[],"meta":[],"image":"https://spoonacular.com/cdn/ingredients_100x100/apple.jpg"},{"id":2010,"amount":1.0,"unit":"tsp","unitLong":"teaspoon","unitShort":"tsp","aisle":"Spices and Seasonings","name":"cinnamon","original":"1 tsp cinnamon","originalString":"1 tsp cinnamon","originalName":"cinnamon","metaInformation":[],"meta":[],"image":"https://spoonacular.com/cdn/ingredients_100x100/cinnamon.jpg"}],"unusedIngredients":[],"likes":0}]
    