export function searchFactory() {

    let selectedFilters = document.getElementsByClassName('selected-filters__item')

    function addFilter(type) {
        let selectedFiltersSection = document.getElementById('selected-filters')
        switch (type) {
            case "ingredient":
                let ingredientsInput = document.getElementById('ingredients-input')
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

    return {
        selectedFilters,
        addFilter,
        removeFilter,
        refreshSelectedFilters
	}
}
