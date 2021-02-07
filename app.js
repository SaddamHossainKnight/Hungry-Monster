const apiBase = 'https://www.themealdb.com/api/json/v1/1/search.php';
const getMealData = search => {
    const url = `${apiBase}?f=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => updateMeal(data.meals))
}
const searchBtn = document.getElementById('search_button');
searchBtn.addEventListener('click', () => {
    const inputMeal = document.getElementById('search').value;
    getMealData(inputMeal);
})
updateMeal = meals => {
    const mealsDiv = document.getElementById('show-meals');
    meals.forEach(meal => {
        const mealDiv = document.createElement('div') || "Unknown Location!";
        mealDiv.className = 'meal';
        const mealDetails = `
            <div onclick='displayMealDetails("${meal.strMeal}")'>
                <img class='meal-image' src="${meal.strMealThumb}">
                <h3 class='meal-name'>${meal.strMeal}</h3>
            </div>
        `
        mealDiv.innerHTML = mealDetails;
        mealsDiv.appendChild(mealDiv);
    });
}
const displayMealDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealDetails(data.meals[0]))
}
const mealDetails = meal => {
    const mealDiv = document.getElementById('mealDetail');
    mealDiv.innerHTML = `
        <div class='meal-container'>
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <h5>Ingredients</h5>
            <p>${meal.strIngredient1}</p>
            <p>${meal.strIngredient2}</p>
            <p>${meal.strIngredient3}</p>
            <p>${meal.strIngredient4}</p>
            <p>${meal.strIngredient5}</p>
            <p>${meal.strIngredient6}</p>
        </div> `
}