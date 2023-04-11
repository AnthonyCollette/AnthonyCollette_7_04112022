import { recipes } from './recipes/recipes.js'
import { searchFactory } from './factories/search.js'

const search = searchFactory(recipes)
let filters = document.getElementsByClassName('filter')
let filtersBtn = document.getElementsByClassName('filters-btn')
let mainSearchInput = document.getElementById('main-search-input')
let ingredientsInput = document.getElementById('ingredients-input')
let appliancesInput = document.getElementById('appareils-input')
let ustensilsInput = document.getElementById('ustensiles-input')


// Toggle filtersBtn
for (let i = 0; i < filtersBtn.length; i++) {
	filtersBtn[i].addEventListener('click', () => {
		for (let filter of filters) {
			if (filter !== filters[i]) {
				filter.classList.remove('open')
			}
		}
		filters[i].classList.contains('open') ? filters[i].classList.remove('open') : filters[i].classList.add('open')
	})
}

mainSearchInput.addEventListener('input', (e) => {
	let numberOfCaracters = e.target.value.length
	if (numberOfCaracters > 2) {
		search.sortRecipes(e.target.value, 'input')
	}
})

document.addEventListener('DOMContentLoaded', () => {
	search.displayFilters(recipes)
})

ingredientsInput.addEventListener('input', (e) => {
	search.displayFilters(search.filteredRecipes, e.target.value, 'ingredient')
})
appliancesInput.addEventListener('input', (e) => {
	search.displayFilters(search.filteredRecipes, e.target.value, 'appliance')
})
ustensilsInput.addEventListener('input', (e) => {
	search.displayFilters(search.filteredRecipes, e.target.value, 'ustensil')
})