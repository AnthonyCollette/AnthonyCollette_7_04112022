export function searchFactory(recipes) {
	let selectedFilters = document.getElementsByClassName(
		'selected-filters__item'
	)
	let resultsSection = document.getElementById('results')
	let selectedFiltersSection = document.getElementById('selected-filters')
	let ingredientsListDiv = document.getElementById('ingredients-list')
	let appliancesListDiv = document.getElementById('appliances-list')
	let ustensilsListDiv = document.getElementById('ustensils-list')
	let ingredientsInput = document.getElementById('ingredients-input')
	let appareilsInput = document.getElementById('appareils-input')
	let ustensilesInput = document.getElementById('ustensiles-input')
	let recipesToDisplay = []
	let allIngredients = []
	let allAppliances = []
	let allUstensils = []
	let allFilters = []
	let filteredIngredients = []
	let filteredAppliances = []
	let filteredUstenstils = []

	function addFilter(type, value) {
		allFilters.push({ sortBy: type, value: value })
		sortRecipes()
	}

	function addFilterByClick(filter, type) {
		switch (type) {
			case 'ingredient':
				selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--blue">
                        <p>${filter}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
                addFilter('ingredient', filter.toLowerCase())
				break

			case 'appareil':
				selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--green">
                        <p>${filter}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
                addFilter('appareil', filter.toLowerCase())
				break

			case 'ustensile':
				selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--red">
                        <p>${filter}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
                addFilter('ustensile', filter.toLowerCase())
				break

			default:
				break
		}
		deleteFilterByClick()
		refreshSelectedFilters()
	}

	function addFilterBySubmit(type) {
		switch (type) {
			case 'ingredient':
				selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--blue" data-type="ingredient">
                        <p>${ingredientsInput.value}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
				addFilter('ingredient', ingredientsInput.value)
				displayAllIngredients()
				break

			case 'appareil':
				selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--green" data-type="appareil">
                        <p>${appareilsInput.value}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
				addFilter('appareil', appareilsInput.value)
				displayAllAppliances()
				break

			case 'ustensile':
				selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--red" data-type="ustensile">
                        <p>${ustensilesInput.value}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
				addFilter('ustensile', ustensilesInput.value)
				displayAllUstensils()
				break

			default:
				break
		}
		deleteFilterByClick()
		refreshSelectedFilters()
	}

	function deleteFilterByClick() {
		for (let filter of selectedFilters) {
			filter.addEventListener('click', (e) => {
				let type = filter.getAttribute('data-type')
				let value = filter.childNodes[1].textContent.toLowerCase()
				removeFilter(type, value)
				filter.remove()
				selectedFilters = document.getElementsByClassName(
					'selected-filters__item'
				)
			})
		}
	}

	function displayAllRecipes() {
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
	}

	function displayRecipes() {
		resultsSection.innerHTML = ''
		for (let recipe of recipesToDisplay) {
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
	}

	function displayAllAppliances() {
		allAppliances.forEach((item) => {
			appliancesListDiv.innerHTML += `
                <li data-type="appareil" class="filter-name">${item}</li>
            `
		})
	}

	function displayAllIngredients() {
		ingredientsListDiv.innerHTML = ''
		allIngredients.forEach((item) => {
			ingredientsListDiv.innerHTML += `
                <li data-type="ingredient" class="filter-name">${item}</li>
            `
		})
	}

	function displayAllUstensils() {
		allUstensils.forEach((item) => {
			ustensilsListDiv.innerHTML += `
                <li data-type="ustensile" class="filter-name">${item}</li>
            `
		})
	}

	function displayFilteredAppliances() {
		appliancesListDiv.innerHTML = ''
		for (let item of filteredAppliances) {
			appliancesListDiv.innerHTML += `
            <li data-type="appliances" class="filter-name">${item}</li>
        `
		}
	}

	function displayFilteredIngredients() {
		ingredientsListDiv.innerHTML = ''
		for (let item of filteredIngredients) {
			ingredientsListDiv.innerHTML += `
            <li data-type="ingredient" class="filter-name">${item}</li>
        `
		}
	}

	function displayFilteredUstensils() {
		ustensilsListDiv.innerHTML = ''
		for (let item of filteredUstenstils) {
			ustensilsListDiv.innerHTML += `
            <li data-type="ustensils" class="filter-name">${item}</li>
        `
		}
	}

	function getAllIngredients() {
		for (let recipe of recipes) {
			for (let i = 0; i < recipe.ingredients.length; i++) {
				let ingredient = recipe.ingredients[i].ingredient
				if (!allIngredients.includes(ingredient)) {
					allIngredients.push(ingredient)
				}
			}
		}
	}

	function getAllAppliances() {
		for (let recipe of recipes) {
			for (let i = 0; i < recipe.appliance.length; i++) {
				let appliance = recipe.appliance
				if (!allAppliances.includes(appliance)) {
					allAppliances.push(appliance)
				}
			}
		}
	}

	function getAllUstensils() {
		for (let recipe of recipes) {
			for (let i = 0; i < recipe.ustensils.length; i++) {
				let ustensil = recipe.ustensils[i]
				if (!allUstensils.includes(ustensil)) {
					allUstensils.push(ustensil)
				}
			}
		}
	}

	function refreshSelectedFilters() {
		selectedFilters = document.getElementsByClassName('selected-filters__item')
	}

	function removeFilter(type, value) {
		allFilters = allFilters.filter((filter) => {
			return filter.type !== type && filter.value !== value
		})
		recipesToDisplay = recipes
		sortRecipes()

		refreshSelectedFilters()
	}

	function searchFilters(type, value) {
		switch (type) {
			case 'ingredients':
				filteredIngredients = allIngredients.filter((ingredient) =>
					ingredient.toLowerCase().includes(value)
				)
				displayFilteredIngredients()
				break

			case 'appliances':
				filteredAppliances = allAppliances.filter((appliance) =>
					appliance.toLowerCase().includes(value)
				)
				displayFilteredAppliances()
				break

			case 'ustensils':
				filteredUstenstils = allUstensils.filter((ustensil) =>
					ustensil.toLowerCase().includes(value)
				)
				displayFilteredUstensils()
				break

			default:
				getAllIngredients()
				break
		}
	}

	function sortRecipes(mainInputValue) {
		if (mainInputValue) {
			allFilters = []
			selectedFiltersSection.innerHTML = ''
			refreshSelectedFilters()
			recipesToDisplay = recipes
			if (mainInputValue !== 'reset') {
				recipesToDisplay = recipesToDisplay.filter((recipe) => {
					let ingredientsOfRecipe = []
					let ustensilsOfRecipe = []
					for (let item of recipe.ingredients) {
						ingredientsOfRecipe.push(item.ingredient.toLowerCase())
					}
					for (let ustensil of recipe.ustensils) {
						ustensilsOfRecipe.push(ustensil.toLowerCase())
					}
					if (recipe.name.toLowerCase().includes(mainInputValue) || recipe.appliance.toLowerCase().includes(mainInputValue) || ingredientsOfRecipe.includes(mainInputValue) || ustensilsOfRecipe.includes(mainInputValue) || recipe.description.toLowerCase().includes(mainInputValue)) {
						return recipe
					}
				}
				)
			}
		}
		for (let filter of allFilters) {
			let filterSortBy = filter.sortBy
			let filterValue = filter.value

			if (recipesToDisplay.length < 1) {
				recipesToDisplay = recipes
			}
			if (filterSortBy === 'ingredient') {
				recipesToDisplay = recipesToDisplay.filter((recipe) => {
					let listOfIngredients = []
					for (let list of recipe.ingredients) {
						listOfIngredients.push(list.ingredient.toLowerCase())
					}
					for (let item of listOfIngredients) {
						if (item.includes(filterValue)) {
							return recipe
						}
					}
				})
			}
			if (filterSortBy === 'appareil') {
				recipesToDisplay = recipesToDisplay.filter((recipe) => {
					if (recipe.appliance.toLowerCase().includes(filterValue)) {
						return recipe
					}
				})
			}
			if (filterSortBy === 'ustensile') {
				recipesToDisplay = recipesToDisplay.filter((recipe) => {
					for (let ustensil of recipe.ustensils) {
						if (ustensil.includes(filterValue)) {
							return recipe
						}
					}
				})
			}
		}
		displayRecipes()
	}

	return {
		selectedFilters,
		addFilterBySubmit,
		addFilterByClick,
		removeFilter,
		refreshSelectedFilters,
		displayAllRecipes,
		displayRecipes,
		sortRecipes,
		getAllIngredients,
		displayAllIngredients,
		getAllAppliances,
		displayAllAppliances,
		getAllUstensils,
		displayAllUstensils,
		displayFilteredIngredients,
		displayFilteredAppliances,
		displayFilteredUstensils,
		searchFilters,
		deleteFilterByClick,
	}
}
