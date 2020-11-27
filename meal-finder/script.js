// get elements
const search = document.getElementById("search"),
      submit = document.getElementById("submit"),
      random = document.getElementById("random"),
      mealsEl = document.getElementById("meals"),
      resultHeading = document.getElementById("result-heading"),
      single_mealEl = document.getElementById("single-meal");



// search on submit
function searchMeal(e){
  e.preventDefault();
  // clear single meal
  single_mealEl.innerHTML =" ";
  const term = search.value
  if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json()).then(data => {
        resultHeading.innerHTML = `<h2>Results for ${term} </h2>`;
        if(data.meals === null){
          resultHeading.innerHTML = `<h2> No search results</h2>`
        }else{
          meals.innerHTML = data.meals.map(meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
           `).join("");
        }
      })
    //clear search text
    search.value = "";
  }else{
    alert("Enter value")
  }
}


// get meal by id on click
function getMealById(mealId){
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json()).then(data => {
      const meal = data.meals[0];
      addMealToDom(meal);
    })
}

// add selected meal to the dom
function addMealToDom(meal){
  const ingredients = [];

  for(let i = 1; i <= 20; i++){
    if(meal[`strIngredient${i}`]){
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }else{
      break;
    }
  }

  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}"></img>
      <div class="single-meal-info">
       ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
      </div>
    </div>
  `;

}


// event listners
submit.addEventListener('submit', searchMeal);
meals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    if(item.classList){
      return item.classList.contains('meal-info');
    }else{
      return false;
    }
  });
  if(mealInfo){
    const mealId = mealInfo.getAttribute('data-mealID')
    getMealById(mealId);
  }
});
