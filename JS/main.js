const toggleButton = document.querySelector('.toggle-btn')
const toggleButtonIcon = document.querySelector('.toggle-btn i')
const dropDownMenu = document.querySelector('.dropdown-menu')

toggleButton.onclick = function () {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleButtonIcon.classList === isOpen
        ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
}