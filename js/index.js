import { recipes } from './recipes/recipes.js'
import { searchFactory } from './factories/search.js'

const search = searchFactory()
let filters = document.getElementsByClassName('filter')
let resultsSection = document.getElementById('results')
let searchIngredients = document.getElementById('form-ingredients')

// Toggle filters
for (let i = 0; i < filters.length; i++) {
	filters[i].addEventListener('click', () => {
		filters[i].classList.contains('open')
			? filters[i].classList.remove('open')
			: filters[i].classList.add('open')
	})
}

// Display recipes
for (let recipe of recipes) {
    resultsSection.innerHTML += `
    <div class="result">
        <div class="result__img-wrapper">
            <img src="" alt="">
        </div>
        <div class="result__text-wrapper">
            <div class="result__header">
                <h2>${recipe.name}</h2>
                <h3><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
                </svg>
                 ${recipe.time}min</h3>
            </div>
            <div class="result__texts">
                <ul class="ingredients" id="ingredients-${recipe.id}"></ul>
                <p>${recipe.description}</p>
            </div>
        </div>
    </div>
    `
    let ingredientsList = document.getElementById(`ingredients-${recipe.id}`)
    for (let ingredient of recipe.ingredients) {
        let unit = ingredient.unit ? ingredient.unit : ''
        if (unit.length > 2) {
            unit = ' ' + unit
        }
        let quantity = ingredient.quantity ? ingredient.quantity : ''
        let doublePoints = ingredient.quantity ? ':' : ''
        ingredientsList.innerHTML += `
            <li><strong>${ingredient.ingredient}${doublePoints}</strong> ${quantity}${unit}</li>
        `
    }
}

// Search by filter
searchIngredients.addEventListener('submit', (e) => {
    e.preventDefault()
    search.addFilter()
    searchIngredients.reset()
})

// Remove filter
search.removeFilter()
