import { recipes } from './recipes/recipes.js'
import { searchFactory } from './factories/search.js'

const search = searchFactory(recipes)
let filters = document.getElementsByClassName('filter')
let filtersBtn = document.getElementsByClassName('filters-btn')
let searchIngredients = document.getElementById('form-ingredients')
let searchAppareils = document.getElementById('form-appareils')
let searchUstensiles = document.getElementById('form-ustensiles')
let mainForm = document.getElementById('searchbyname')

// Toggle filtersBtn
for (let i = 0; i < filtersBtn.length; i++) {
	filtersBtn[i].addEventListener('click', () => {
		filters[i].classList.contains('open')
			? filters[i].classList.remove('open')
			: filters[i].classList.add('open')
	})
}

// Display recipes
search.displayAllRecipes()

// Search by filter
searchIngredients.addEventListener('submit', (e) => {
	e.preventDefault()
	search.addFilter('ingredient')
	search.sortRecipes('ingredient')
	searchIngredients.reset()
})
searchAppareils.addEventListener('submit', (e) => {
	e.preventDefault()
	search.addFilter('appareil')
	searchAppareils.reset()
})
searchUstensiles.addEventListener('submit', (e) => {
	e.preventDefault()
	search.addFilter('ustensile')
	searchUstensiles.reset()
})

// Search by name
mainForm.addEventListener('submit', (e) => {
	e.preventDefault()
	search.sortRecipes('name')
	search.displayRecipes()
})

search.getAllIngredients()
search.getAllAppliances()
search.getAllUstensils()

// Display Filters Default Content
document.addEventListener('DOMContentLoaded', () => {
	search.displayAllIngredients()
	search.displayAllAppliances()
	search.displayAllUstensils()
})
