export function searchFactory(recipes) {
	let filteredRecipes = []
	let results = document.getElementById('results')
	let ingredientsListDiv = document.getElementById('ingredients-list')
	let appliancesListDiv = document.getElementById('appliances-list')
	let ustensilsListDiv = document.getElementById('ustensils-list')
	let selectedFiltersSection = document.getElementById('selected-filters')
	let filtersDiv = []
	let filters = []
	let newFilters = []
	let tags = []
	let appliancesList = []
	let newAppliancesList = []
	let ingredientsList = []
	let newIngredientsList = []
	let ustensilsList = []
	let newUstensilsList = []
	let newFilteredRecipes = []


	function sortRecipes(data) {
		if (data) {
			const filteringFilters = filters.filter((item) => item.dataType !== 'input')
			filters = filteringFilters
			if (data.length > 2) {
				filters.push({ data: data.toLowerCase(), dataType: 'input' })
			} else {
				filteredRecipes = recipes
			}
		}
		if (filteredRecipes.length <= 0) {
			recipes.map((recipe) => {
				let ingredientsOfRecipe = recipe.ingredients
				let ustensilsOfRecipe = recipe.ustensils
				let applianceOfRecipe = recipe.appliance

				filters.forEach(filter => {
					let data = filter.data
					let dataType = filter.dataType

					switch (dataType) {
						case 'input':
							// FILTER BY INGREDIENT
							for (let ingredient of ingredientsOfRecipe) {
								if (ingredient.ingredient.toLowerCase().includes(data) && !filteredRecipes.includes(recipe)) {
									filteredRecipes.push(recipe)
								}
							}

							// FILTER BY USTENSIL
							for (let ustensile of ustensilsOfRecipe) {
								if (ustensile.toLowerCase().includes(data) && !filteredRecipes.includes(recipe)) {
									filteredRecipes.push(recipe)
								}
							}

							// FILTER BY APPLIANCE
							if (applianceOfRecipe.toLowerCase().includes(data) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}

							// FILTER BY DESCRIPTION
							if (recipe.description.toLowerCase().includes(data) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}

							// FILTER BY NAME
							if (recipe.name.toLowerCase().includes(data) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}
							break;
						case 'ingredient':
							for (let ingredient of ingredientsOfRecipe) {
								if (ingredient.ingredient.toLowerCase().includes(filter.data) && !filteredRecipes.includes(recipe)) {
									filteredRecipes.push(recipe)
								}
							}
							break;
						case 'ustensile':
							for (let ustensile of ustensilsOfRecipe) {
								if (ustensile.toLowerCase().includes(filter.data) && !filteredRecipes.includes(recipe)) {
									filteredRecipes.push(recipe)
								}
							}
							break;
						case 'appareil':
							if (applianceOfRecipe.toLowerCase().includes(filter.data) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}
							break;
						default:
							break;
					}
				})
			}
			)
		} else {
			filters.forEach((filter) => {
				switch (filter.dataType) {
					case 'input':
						newFilteredRecipes = recipes.filter((recipe) => {
							let lowerCasedIngredients = []
							let ingredientsMatch = false
							recipe.ingredients.forEach(list => lowerCasedIngredients.push(list.ingredient.toLowerCase()))
							lowerCasedIngredients.forEach(ingredient => {
								if (ingredient.includes(filter.data)) {
									return ingredientsMatch = true
								}
							})
							return recipe.name.toLowerCase().includes(filter.data) || recipe.description.toLowerCase().includes(filter.data) || ingredientsMatch
						})
						break;
					case 'ingredient':
						newFilteredRecipes = filteredRecipes.filter((recipe) => {

							let ingredientsFiltered = recipe.ingredients
							let ingredientsLowerCased = []
							let ingredientMatch = false

							recipe.ingredients.forEach(ingredient => ingredientsLowerCased.push(ingredient.ingredient.toLowerCase()))
							ingredientsFiltered.forEach((ingredient) => {
								let filteredIngredient = ingredient.ingredient.toLowerCase()
								if (filter.data.includes(filteredIngredient)) {
									return ingredientMatch = true
								}
							})
							return ingredientMatch
						})
						break;
				}
			})
			// filteredRecipes.filter((recipe) => {
				// let ingredientsMatch = true
				// let applianceMatch = true
				// let ustensilsMatch = true
				// let inputMatch = true

				// filters.forEach((filter) => {
				// 	let ingredientsOfRecipe = recipe.ingredients
				// 	let ustensilsOfRecipe = recipe.ustensils
				// 	let applianceOfRecipe = recipe.appliance
					
				// 	switch (filter.dataType) {
				// 		case 'input':
				// 			inputMatch = false

				// 			// FILTER BY INGREDIENT
				// 			ingredientsOfRecipe.forEach((ingredient) => {
				// 				if (ingredient.ingredient.toLowerCase().includes(filter.data)) {
				// 					inputMatch = true
				// 				}
				// 			})

				// 			// FILTER BY USTENSIL
				// 			ustensilsOfRecipe.forEach((ustensile) => {
				// 				if (ustensile.toLowerCase().includes(filter.data)) {
				// 					inputMatch = true
				// 				}
				// 			})

				// 			// FILTER BY APPLIANCE
				// 			if (applianceOfRecipe.toLowerCase().includes(filter.data)) {
				// 				inputMatch = true
				// 			}

				// 			// FILTER BY DESCRIPTION
				// 			if (recipe.description.toLowerCase().includes(filter.data)) {
				// 				inputMatch = true
				// 			}

				// 			// FILTER BY NAME
				// 			if (recipe.name.toLowerCase().includes(filter.data)) {
				// 				inputMatch = true
				// 			}
				// 			break;
				// 		case 'ingredient':
				// 			ingredientsMatch = false
				// 			ingredientsOfRecipe.forEach((ingredient) => {
				// 				if (ingredient.ingredient.toLowerCase().includes(filter.data)) {
				// 					ingredientsMatch = true
				// 				}
				// 			})
				// 			break;
				// 		case 'ustensile':
				// 			ustensilsMatch = false
				// 			ustensilsOfRecipe.forEach((ustensile) => {
				// 				if (ustensile.toLowerCase().includes(filter.data)) {
				// 					ustensilsMatch = true
				// 				}
				// 			})
				// 			break;
				// 		case 'appareil':
				// 			applianceMatch = false
				// 			if (applianceOfRecipe.toLowerCase().includes(filter.data)) {
				// 				applianceMatch = true
				// 			}
				// 			break;
				// 		default:
				// 			break;
				// 	}

				// })
				// if (ingredientsMatch && applianceMatch && ustensilsMatch && inputMatch) {
				// 	return recipe
				// }
			// })
			filteredRecipes = newFilteredRecipes
			newFilteredRecipes = []

		}

		displayRecipes(filteredRecipes)
		displayFilters(filteredRecipes)
	}

	function addFilter(data, dataType) {
		let alreadyFiltred = false
		for (let filter of filters) {
			if (filter.data === data && filter.dataType === dataType) {
				alreadyFiltred = true
			}
		}

		if (!alreadyFiltred) {
			filters.push({ data, dataType })
		}

		sortRecipes()
	}

	function addTag() {
		filtersDiv = document.getElementsByClassName('filter-name')
		for (let filter of filtersDiv) {
			filter.addEventListener('click', (e) => {
				let filterText = e.target.innerText
				let filterAttribute = e.target.getAttribute('data-type')
				let tagExists = false
				for (let tag of tags) {
					if (tag.innerText === filterText && tag.getAttribute('data-type') === filterAttribute) {
						return tagExists
					}
				}
				if (!tagExists) {
					switch (filterAttribute) {
						case 'ingredient':
							selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--blue" data-type="ingredient">
                        <p>${filterText}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>`
							break;

						case 'appareil':
							selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--green" data-type="appareil">
                        <p>${filterText}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
							break;

						case 'ustensile':
							selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--red" data-type="ustensile">
                        <p>${filterText}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
							break;

						default:
							break;
					}
				}
				tags = document.getElementsByClassName('selected-filters__item')
				addFilter(filterText, filterAttribute)
				// sortRecipes(filterText, filterAttribute)
				deleteTag(filterText, filterAttribute)
			})
		}
	}

	function deleteTag() {
		for (let tag of tags) {
			tag.addEventListener('click', (e) => {
				let data = tag.innerText
				let dataType = tag.getAttribute('data-type')
				newFilters = []
				filteredRecipes = recipes
				for (let filter of filters) {
					if ((filter.data !== data || filter.dataType !== dataType) && !newFilters.includes(filter)) {
						newFilters.push(filter)
					}
				}
				filters = newFilters
				sortRecipes()
				tag.remove()
				tags = document.getElementsByClassName('selected-filters__item')
			})
		}


	}

	function displayFilters(filteredRecipes, value, type) {

		ingredientsListDiv.innerHTML = ''
		appliancesListDiv.innerHTML = ''
		ustensilsListDiv.innerHTML = ''
		ingredientsList = []
		appliancesList = []
		ustensilsList = []
		if (filters.length > 0) {
			for (let recipe of filteredRecipes) {
				for (let ingredient of recipe.ingredients) {
					if (!ingredientsList.includes(ingredient.ingredient.toLowerCase())) {
						ingredientsList.push(ingredient.ingredient.toLowerCase())
					}
				}
				if (!appliancesList.includes(recipe.appliance.toLowerCase())) {
					appliancesList.push(recipe.appliance.toLowerCase())
				}
				for (let ustensil of recipe.ustensils) {
					if (!ustensilsList.includes(ustensil.toLowerCase())) {
						ustensilsList.push(ustensil.toLowerCase())
					}
				}
			}
		} else {
			for (let recipe of recipes) {
				for (let ingredient of recipe.ingredients) {
					if (!ingredientsList.includes(ingredient.ingredient.toLowerCase())) {
						ingredientsList.push(ingredient.ingredient.toLowerCase())
					}
				}
				if (!appliancesList.includes(recipe.appliance.toLowerCase())) {
					appliancesList.push(recipe.appliance.toLowerCase())
				}
				for (let ustensil of recipe.ustensils) {
					if (!ustensilsList.includes(ustensil.toLowerCase())) {
						ustensilsList.push(ustensil.toLowerCase())
					}
				}
			}
		}

		// TRI PAR ORDRE ALPHABETIQUE
		ingredientsList.sort()
		appliancesList.sort()
		ustensilsList.sort()

		for (let ingredient of ingredientsList) {
			ingredientsListDiv.innerHTML += `
				<li data-type="ingredient" class="filter-name">${ingredient}</li>
			`
		}

		for (let appliance of appliancesList) {
			appliancesListDiv.innerHTML += `
				<li data-type="appareil" class="filter-name">${appliance}</li>
			`
		}

		for (let ustensil of ustensilsList) {
			ustensilsListDiv.innerHTML += `
				<li data-type="ustensile" class="filter-name">${ustensil}</li>
			`
		}

		if (value && type) {
			switch (type) {

				case 'ingredient':
					newIngredientsList = []
					ingredientsListDiv.innerHTML = ''
					for (let ingredient of ingredientsList) {
						if (ingredient.includes(value.toLowerCase()) && !newIngredientsList.includes(ingredient)) {
							newIngredientsList.push(ingredient)
						}
					}
					for (let ingredient of newIngredientsList) {
						ingredientsListDiv.innerHTML += `
					<li data-type="ingredient" class="filter-name">${ingredient}</li>
				`
					}
					break;

				case 'appliance':
					appliancesListDiv.innerHTML = ''
					newAppliancesList = []
					for (let appliance of appliancesList) {
						if (appliance.includes(value.toLowerCase()) && !newAppliancesList.includes(appliance)) {
							newAppliancesList.push(appliance)
						}
					}
					for (let appliance of newAppliancesList) {
						appliancesListDiv.innerHTML += `
						<li data-type="appareil" class="filter-name">${appliance}</li>
					`
					}
					break;

				case 'ustensil':
					ustensilsListDiv.innerHTML = ''
					newUstensilsList = []
					for (let ustensil of ustensilsList) {
						if (ustensil.includes(value.toLowerCase()) && !newUstensilsList.includes(ustensil)) {
							newUstensilsList.push(ustensil)
						}
					}
					for (let ustensil of newUstensilsList) {
						ustensilsListDiv.innerHTML += `
							<li data-type="ustensile" class="filter-name">${ustensil}</li>
						`
					}


				default:
					break;
			}
		}

		addTag()
	}

	function displayRecipes(filteredRecipes) {
		results.innerHTML = ''
		if (filteredRecipes.length === 0) {
			let randomRecipes = [recipes[Math.floor(Math.random() * recipes.length)], recipes[Math.floor(Math.random() * recipes.length)], recipes[Math.floor(Math.random() * recipes.length)]]
			results.innerHTML = "<h1>Aucune recette ne correspond à votre critère. Pourquoi ne pas vous laisser tenter par une des recettes suivantes ?</h1>"
			for (let recipe of randomRecipes) {
				results.innerHTML += `
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
		for (let recipe of filteredRecipes) {
			results.innerHTML += `
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

	return {
		addTag,
		deleteTag,
		displayFilters,
		displayRecipes,
		filteredRecipes,
		sortRecipes,
	}
}
