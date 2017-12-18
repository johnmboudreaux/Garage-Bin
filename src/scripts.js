(function () {

$('.show-garage').on('click', '.show-items-butn', (event) => openDoor(event));
$('.input-form').on('click', '.submit-button', (event) => addItem());

$(document).ready(() => fetchItems());

const openDoor = (event) => {
  $('.slide-top').toggleClass("slide-open");
}


const fetchItems = () => {
  fetch('/api/v1/items')
  .then(response => response.json())
  .then(items => appendItems(items))
}

const appendItems = (items) => {
  console.log('items', items);
  items.forEach((item) => {
    $('.items').append(`
      <div class="appended-items">
        <li>Item Name: ${item.itemName}</li>
        <li>Item Reason: ${item.itemReason}</li>
        <li>Item Cleanliness: ${item.cleanliness}</li>
      </div>
      `)
  })
}

const addItem = () => {
  const itemName = $('.item-to-add').val();
  const itemReason = $('.item-to-add-reason').val();
  const itemCleanliness = $('.item-to-add-cleanliness').val();
    let postBody = {
    itemName: itemName,
    itemReason: itemReason,
    itemCleanliness: itemCleanliness
  };
  fetch('/api/v1/items', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(postBody)
  })
  .then(response => response.json())
  .then(item => appendItems(item))
  .catch(error => console.log(error))
}

})();
