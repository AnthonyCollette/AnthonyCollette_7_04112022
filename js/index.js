let filters = document.getElementsByClassName('filter')

for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', () => {
        filters[i].classList.contains('open') ? filters[i].classList.remove('open') : filters[i].classList.add('open')
    })
}