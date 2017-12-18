$('.input-form').on('click', '.submit-button', (event) => openDoor(event));


const openDoor = (event) => {
  $('.slide-top').toggleClass("slide-open");
}
