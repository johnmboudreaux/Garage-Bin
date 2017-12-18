/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function () {
  let sparklingCount = 0,
      dustyCount = 0,
      rancidCount = 0,
      garageItems = [];

  $('.show-garage').on('click', '.show-items-butn', event => openDoor(event));
  $('.input-form').on('click', '.submit-button', () => addItem());
  $('.show-garage').on('click', '.sort-items-up-butn', () => sortAsc());
  $('.show-garage').on('click', '.sort-items-down-butn', () => sortDsc());
  $('.items').on('click', '.item-name', event => showDetails(event));

  $(document).ready(() => fetchItems());

  const openDoor = event => {
    $('.slide-top').toggleClass("slide-open");
  };

  const fetchItems = () => {
    fetch('/api/v1/items').then(response => response.json()).then(items => appendItems(items));
  };

  const appendItems = items => {
    items.forEach(item => {
      garageItems.push(item);
      $('.items').append(`<div class="appended-items">
        <li class="item-name">Item Name: ${item.itemName}</li>
        <li class="item-reason">Item Reason: ${item.itemReason}</li>
        <li class="item-cleanliness">Item Cleanliness: ${item.itemCleanliness}</li>
      </div>`);
      switch (item.itemCleanliness.toLowerCase()) {
        case 'sparkling':
          sparklingCount++;
          $('.sparkling-count').text(sparklingCount);
          break;
        case 'dusty':
          dustyCount++;
          $('.dusty-count').text(dustyCount);
          break;
        case 'rancid':
          rancidCount++;
          $('.rancid-count').text(rancidCount);
          break;
        default:
      }
    });
    $('.item-count').text($('.items .appended-items').length);
  };

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
    }).then(response => response.json()).then(item => appendItems(item)).catch(error => console.log(error));
  };

  const sortAsc = () => {
    $('.items').html('');
    let sortedArray = garageItems.sort((a, b) => {
      if (a.itemName < b.itemName) return -1;
      if (a.itemName > b.itemName) return 1;
      return 0;
    });
    garageItems = [];
    sparklingCount = 0;
    dustyCount = 0;
    rancidCount = 0;
    appendItems(sortedArray);
  };

  const sortDsc = () => {
    $('.items').html('');
    let sortedArray = garageItems.sort((a, b) => {
      if (a.itemName < b.itemName) return -1;
      if (a.itemName > b.itemName) return 1;
      return 0;
    });
    sortedArray.reverse();
    garageItems = [];
    sparklingCount = 0;
    dustyCount = 0;
    rancidCount = 0;
    appendItems(sortedArray);
  };

  const showDetails = event => {
    let $elemParent = $(event.target).parent();
    $elemParent.toggleClass('show-all');
  };
})();

/***/ })
/******/ ]);