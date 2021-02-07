const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();

    fetch(` https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputTxt}`)

    .then(response => response.json())
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
        });
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

const mealDetails = document.getElementById("meal-card");
mealDetails.addEventListener("click", () => {
    getMealRecipe;

})

function getMealRecipe(e) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));

}
// create a modal
function mealRecipeModal(meal) {

    meal = meal[0];
    let html = `
    <div class = "recipe-meal-img">
    <img src = "${meal.strMealThumb}" alt = "">
</div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        
      
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
          
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-ingredient">
        <h3>Ingredient:</h3>
      
        <p>${meal.strIngredient1}</p>
        <p>${meal.strIngredient3}</p>
        <p>${meal.strIngredient2}</p>
        <p>${meal.strIngredient5}</p>
        <p>${meal.strIngredient4}</p>
    </div>
       
       
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}