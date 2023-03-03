export function searchFactory(recipes) {

    let selectedFilters = document.getElementsByClassName('selected-filters__item')
    let resultsSection = document.getElementById('results')
    let recipesToDisplay = []
    let allFilters = []
    let allIngredients = []
    let allAppliances = []
    let allUstensils = []
    let mainInput = document.getElementById('main-input')
    let ingredientsInput = document.getElementById('ingredients-input')

    // function searchByName() {
    //     let mainForm = document.getElementById('searchbyname')
    //     let mainInput = document.getElementById('main-input')

    //     mainForm.addEventListener('submit', (e) => {
    //         e.preventDefault()
    //         recipesToDisplay = recipes.filter(recipe => recipe.name.toLowerCase().includes(mainInput.value.toLowerCase()))
    //         displayRecipes()
    //     })
    // }

    function sortRecipes(sortBy) {
        switch (sortBy) {
            case "name":
                recipesToDisplay = recipes.filter(recipe => recipe.name.toLowerCase().includes(mainInput.value.toLowerCase()))
                break;
        
            case "ingredient":
                allFilters.push(ingredientsInput.value.toLowerCase())
                recipesToDisplay = recipes.filter(recipe => {
                    let ingredientsList = []
                    for (let list of recipe.ingredients) {
                        let ingredient = list.ingredient.toLowerCase()
                        ingredientsList.push(ingredient)
                    }
                })
                console.log(recipesToDisplay)
                break;
            
            default:
                recipesToDisplay = recipes
                break;
        }
    }

    function addFilter(type) {
        let selectedFiltersSection = document.getElementById('selected-filters')
        switch (type) {
            case "ingredient":
                selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--blue">
                        <p>${ingredientsInput.value}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
                break;
            
            case "appareil":
                let appareilsInput = document.getElementById('appareils-input')
                selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--green">
                        <p>${appareilsInput.value}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
                break;
            
            case "ustensile":
                let ustensilesInput = document.getElementById('ustensiles-input')
                selectedFiltersSection.innerHTML += `
                    <article class="selected-filters__item selected-filters__item--red">
                        <p>${ustensilesInput.value}</p>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="white"/>
                        </svg>
                    </article>
                    `
                break;
        
            default:
                break;
        }
        refreshSelectedFilters()
        removeFilter()
	}

    function removeFilter() {
        for (let filter of selectedFilters) {
            filter.addEventListener('click', () => {
                filter.remove()
                selectedFilters = document.getElementsByClassName('selected-filters__item')
            })
        }
        refreshSelectedFilters()
    }

    function refreshSelectedFilters() {
        selectedFilters = document.getElementsByClassName('selected-filters__item')
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
        resultsSection.innerHTML = ""
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

    function displayAllIngredients() {
        let ingredientsListDiv = document.getElementById('ingredients-list')
        allIngredients.forEach(item => {
            ingredientsListDiv.innerHTML += `
                <li>${item}</li>
            `
        })
    }

    function displayAllAppliances() {
        let appliancesListDiv = document.getElementById('appliances-list')
        allAppliances.forEach(item => {
            appliancesListDiv.innerHTML += `
                <li>${item}</li>
            `
        })
    }

    function displayAllUstensils() {
        let ustensilsListDiv = document.getElementById('ustensils-list')
        allUstensils.forEach(item => {
            ustensilsListDiv.innerHTML += `
                <li>${item}</li>
            `
        })
    }

    return {
        selectedFilters,
        addFilter,
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
        displayAllUstensils
	}
}
