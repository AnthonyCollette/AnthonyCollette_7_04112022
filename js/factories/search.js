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


	function sortRecipes(data, dataType) {

		// Ajout du tag dans les filtres
		if (dataType === 'ingredient' || dataType === 'appareil' || dataType === 'ustensil') {
			let alreadyFiltred = false
			for (let filter of filters) {
				if (filter.data === data && filter.dataType === dataType) {
					alreadyFiltred = true
				}
			}
			if (!alreadyFiltred) {
				filters.push({ data, dataType })
			}
		}
		switch (dataType) {
			case 'input':
				filteredRecipes = []
				for (let filter of filters) {
					if (filter.dataType === 'input') {
						const index = filters.indexOf(filter)
						filters.splice(index, 1)
					}
				}
				filters.push({ data, dataType })

				for (let recipe of recipes) {
					if (recipe.name.toLowerCase().includes(data.toLowerCase()) || recipe.description.toLowerCase().includes(data.toLowerCase())) {
						if (!filteredRecipes.includes(recipe)) {
							filteredRecipes.push(recipe)
						}
					}
					for (let ingredient of recipe.ingredients) {
						if (ingredient.ingredient.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
							filteredRecipes.push(recipe)
						}
					}
				}
				break;

			case 'ingredient':
				if (filteredRecipes.length > 0) {
					for (let recipe of filteredRecipes) {
						for (let ingredient of recipe.ingredients) {
							if (ingredient.ingredient.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}
						}
					}
				} else {
					for (let recipe of recipes) {
						for (let ingredient of recipe.ingredients) {
							if (ingredient.ingredient.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}
						}
					}
				}

			case 'appareil':
				if (filteredRecipes.length > 0) {
					for (let recipe of filteredRecipes) {
						if (recipe.appliance.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
							filteredRecipes.push(recipe)
						}
					}
				} else {
					for (let recipe of recipes) {
						if (recipe.appliance.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
							filteredRecipes.push(recipe)
						}
					}
				}

			case 'ustensile':
				if (filteredRecipes.length > 0) {
					for (let recipe of filteredRecipes) {
						for (let ustensil of recipe.ustensils) {
							if (ustensil.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}
						}
					}
				} else {
					for (let recipe of recipes) {
						for (let ustensil of recipe.ustensils) {
							if (ustensil.toLowerCase().includes(data.toLowerCase()) && !filteredRecipes.includes(recipe)) {
								filteredRecipes.push(recipe)
							}
						}
					}
				}
			default:
				break;
		}
		displayRecipes(filteredRecipes)
		displayFilters(filteredRecipes)
	}

	function sortRecipesAfterDelete(data, dataType) {
		newFilters = []
		filteredRecipes = recipes
		for (let filter of filters) {
			if ((filter.data !== data || filter.dataType !== dataType) && !newFilters.includes(filter)) {
				newFilters.push(filter)
			}
		}
		filters = newFilters
		console.log(filters)
		for (let filter of newFilters) {
			sortRecipes(filter.data, filter.dataType)
		}
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
				sortRecipes(filterText, filterAttribute)
				deleteTag(filterText, filterAttribute)
			})
		}
	}

	function deleteTag() {
		for (let tag of tags) {
			tag.addEventListener('click', (e) => {
				sortRecipesAfterDelete(tag.innerText, tag.getAttribute('data-type'))
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
