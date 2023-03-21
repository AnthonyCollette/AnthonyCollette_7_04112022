import { recipes } from './recipes/recipes.js'
import { searchFactory } from './factories/search.js'

const search = searchFactory(recipes)
let filters = document.getElementsByClassName('filter')
let filtersBtn = document.getElementsByClassName('filters-btn')
let searchIngredients = document.getElementById('form-ingredients')
let searchAppareils = document.getElementById('form-appareils')
let searchUstensiles = document.getElementById('form-ustensiles')
let mainForm = document.getElementById('searchbyname')
let mainInput = document.getElementById('main-input')
let ingredientsInput = document.getElementById('ingredients-input')
let appliancesInput = document.getElementById('appareils-input')
let ustensilsInput = document.getElementById('ustensiles-input')
let filtersNames = []

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
	search.addFilterBySubmit('ingredient')
	searchIngredients.reset()
})
searchAppareils.addEventListener('submit', (e) => {
	e.preventDefault()
	search.addFilterBySubmit('appareil')
	searchAppareils.reset()
})
searchUstensiles.addEventListener('submit', (e) => {
	e.preventDefault()
	search.addFilterBySubmit('ustensile')
	searchUstensiles.reset()
})

// Search by name
mainForm.addEventListener('submit', (e) => {
	e.preventDefault()
	search.sortRecipes(mainInput.value === '' ? 'reset' : mainInput.value.toLowerCase())
})

search.getAllIngredients()
search.getAllAppliances()
search.getAllUstensils()

// Search Filters
ingredientsInput.addEventListener('input', () => {
	search.searchFilters('ingredients', ingredientsInput.value.toLowerCase())
	filtersNames = document.getElementsByClassName('filter-name')
	for (let filterName of filtersNames) {
		filterName.addEventListener('click', () => {
			search.addFilterByClick(filterName.textContent, filterName.getAttribute('data-type'))
		})
	}
})
appliancesInput.addEventListener('input', () => {
	search.searchFilters('appliances', appliancesInput.value.toLowerCase())
	filtersNames = document.getElementsByClassName('filter-name')
	for (let filterName of filtersNames) {
		filterName.addEventListener('click', () => {
			search.addFilterByClick(filterName.textContent, filterName.getAttribute('data-type'))
		})
	}
})
ustensilsInput.addEventListener('input', () => {
	search.searchFilters('ustensils', ustensilsInput.value.toLowerCase())
	filtersNames = document.getElementsByClassName('filter-name')
	for (let filterName of filtersNames) {
		filterName.addEventListener('click', () => {
			search.addFilterByClick(filterName.textContent, filterName.getAttribute('data-type'))
		})
	}
})

document.addEventListener('DOMContentLoaded', () => {
	// Display Filters Default Content
	search.displayAllIngredients()
	search.displayAllAppliances()
	search.displayAllUstensils()


	filtersNames = document.getElementsByClassName('filter-name')
	for (let filterName of filtersNames) {
		filterName.addEventListener('click', () => {
			search.addFilterByClick(filterName.textContent, filterName.getAttribute('data-type'))
		})
	}
})