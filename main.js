// grab element :
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners:
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients:
function getMealList() {
    let searchInput = document.getElementById('search-input').value;
    if (searchInput == '') {
        alert("Please search by a word")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)

        .then(res => res.json())
            .then(data => {
                let html = "";

                console.log(data.meals)
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `                  
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>                         
                        </div>
                    </div>
                `;
                    });
                    mealList.classList.remove('notFound');
                } else {
                    html = "Sorry, we can't reach your search!";
                    mealList.classList.add('notFound');
                }
                mealList.innerHTML = html;
                document.getElementById("error").innerText = "";
            })
            .catch(err => {
                // alert("We can't reach to your food.Please try again", err);
                document.getElementById("error").innerText = "We can't reach to your food.Please try again";
                mealList.innerHTML = '';
            })
    }
}


// get recipe of the meal
// function getMealRecipe(e) {
//     e.preventDefault();
//     if (e.target.classList.contains('recipe-btn')) {
//         let mealItem = e.target.parentElement.parentElement;
//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//             .then(response => response.json())
//             .then(data => mealRecipeModal(data.meals));
//     }
// }

// meal details :
const mealDetails = document.getElementById("meal-card");
mealDetails.addEventListener("click", () => {
    getMealRecipe;
})



function getMealRecipe(e) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res => res.json())
        .then(data => mealRecipeModal(data.meals));

}


// create a modal
function mealRecipeModal(meal) {
    meal = meal[0];
    console.log(meal)
    let html = `
    <div class = "recipe-meal-img">
    <img src = "${meal.strMealThumb}" alt = "meal-image">
   </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-ingredient">
        <h3 id="ingredientHead">Ingredient:</h3>     
        <ul><li>${meal.strIngredient1}-${meal.strMeasure1} </li>
        <li>${meal.strIngredient2}-${meal.strMeasure2}</li>
        <li>${meal.strIngredient3}-${meal.strMeasure3}</li>
        <li>${meal.strIngredient4}-${meal.strMeasure4}</li>
        <li>${meal.strIngredient5}-${meal.strMeasure5}</li>
        <li>${meal.strIngredient6}-${meal.strMeasure6} </li>
        <li>${meal.strIngredient7}-${meal.strMeasure7}</li>
        <li>${meal.strIngredient8}-${meal.strMeasure8}</li>
        <li>${meal.strIngredient9}-${meal.strMeasure9}</li>
        <li>${meal.strIngredient10}-${meal.strMeasure10}</li>       
        </ul>
    </div>     
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}