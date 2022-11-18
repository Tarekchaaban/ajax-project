function getCryptoData(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&ids=' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    detailsHandler(xhr.response[0]);
    $addButton.className = 'add-button';
    detailsViewHandler();
  });
  xhr.send();
}
var $searchForm = document.querySelector('.search-form');
var $searchInput = $searchForm.querySelector('#search-input');
var $searchView = document.querySelector('.search-view');
var $detailsView = document.querySelector('.details-view-gray-background');
var $watchlistView = document.querySelector('.watchlist-view');
var $searchLink = document.querySelector('.search-link');
var $watchlistLink = document.querySelector('.watchlist-link');
var $detailsPicture = document.querySelector('.details-picture');
var $detailsName = document.querySelector('.details-name');
var $price = document.querySelector('.price');
var $marketcap = document.querySelector('.market-cap');
var $rank = document.querySelector('.rank');

$searchForm.addEventListener('submit', searchInputHandler);
$searchLink.addEventListener('click', searchViewHandler);
$watchlistLink.addEventListener('click', watchlistViewHandler);

function detailsHandler(object) {
  $detailsPicture.setAttribute('src', object.image);
  $detailsName.textContent = object.name + ' ' + '(' + object.symbol.toUpperCase() + ')';
  $price.textContent = 'Price: ' + '$' + object.current_price;
  $marketcap.textContent = 'Market Cap: ' + '$' + object.market_cap;
  $rank.textContent = 'Rank: ' + object.market_cap_rank;
  data.currentCurrencyData = object;
}

function detailsViewHandler(event) {
  $searchView.className = 'search-view hidden';
  $detailsView.className = 'details-view-gray-background';
  $watchlistView.className = 'watchlist-view hidden';
  data.view = 'details';
}

function searchInputHandler(event) {
  event.preventDefault();
  getCryptoData($searchInput.value.toLowerCase());
}

function searchViewHandler(event) {
  $searchView.className = 'search-view';
  $detailsView.className = 'details-view-gray-background hidden';
  $watchlistView.className = 'watchlist-view hidden';
  data.view = 'search';
}

function watchlistViewHandler(event) {
  $searchView.className = 'search-view hidden';
  $detailsView.className = 'details-view-gray-background hidden';
  $watchlistView.className = 'watchlist-view';
  data.view = 'watchlist';
}

var $addButton = document.querySelector('.add-button');
$addButton.addEventListener('click', addHandler);

function addHandler(event) {
  var alreadySaved = false;
  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].id === $searchInput.value.toLowerCase()) {
      alreadySaved = true;
      $searchForm.reset();
      watchlistViewHandler();
    }
  }
  if (alreadySaved === false) {
    data.currentCurrencyData.Id = data.nextEntryId;
    data.nextEntryId++;
    data.list.unshift(data.currentCurrencyData);
    var newCrypto = renderCrypto(data.currentCurrencyData);
    $unorderedListRow.prepend(newCrypto);
    watchlistViewHandler();
    $searchForm.reset();
  }
}
function renderCrypto(currencyData) {
  var $columnThirdsList = document.createElement('li');
  $columnThirdsList.className = 'column-thirds margin';
  $columnThirdsList.setAttribute('data-entry-id', currencyData.Id);

  var $listGrayBackgroundDiv = document.createElement('div');
  $listGrayBackgroundDiv.className = 'list-gray-background relative';

  var $deleteIcon = document.createElement('i');
  $deleteIcon.className = 'fa-solid fa-xmark delete-icon';

  var $divRow = document.createElement('div');
  $divRow.className = 'row';

  var $columnOneSixthDiv = document.createElement('div');
  $columnOneSixthDiv.className = 'column-one-sixth as-center';

  var $listImage = document.createElement('img');
  $listImage.className = 'list-image';
  $listImage.setAttribute('src', currencyData.image);
  $listImage.setAttribute('alt', 'picture of coin');

  var $columnTwoThirdsDiv = document.createElement('div');
  $columnTwoThirdsDiv.className = 'column-two-thirds';

  var $listName = document.createElement('p');
  $listName.textContent = currencyData.name + ' ' + '(' + currencyData.symbol.toUpperCase() + ')';
  $listName.className = 'list-name';

  $columnThirdsList.appendChild($listGrayBackgroundDiv);
  $listGrayBackgroundDiv.appendChild($divRow);
  $listGrayBackgroundDiv.appendChild($deleteIcon);
  $divRow.appendChild($columnOneSixthDiv);
  $divRow.appendChild($columnTwoThirdsDiv);
  $columnOneSixthDiv.appendChild($listImage);
  $columnTwoThirdsDiv.appendChild($listName);

  return $columnThirdsList;

}

var $unorderedListRow = document.querySelector('ul');
window.addEventListener('DOMContentLoaded', treeHandler);

function treeHandler(event) {
  for (var i = 0; i < data.list.length; i++) {
    var newCryptoEntry = renderCrypto(data.list[i]);
    $unorderedListRow.appendChild(newCryptoEntry);
  }
}

$unorderedListRow.addEventListener('click', listToDetails);
function listToDetails(event) {
  if (event.target.closest('li')) {
    for (var i = 0; i < data.list.length; i++) {
      var cryptoEntryNumberString = event.target.closest('.column-thirds').getAttribute('data-entry-id');
      if (parseInt(cryptoEntryNumberString) === data.list[i].Id) {
        detailsHandler(data.list[i]);
        detailsViewHandler();
        $addButton.className = 'add-button hidden';
      }

    }
  }
}

var $modalCloseButton = document.querySelector('.no-button');
var $confirmDeletionButton = document.querySelector('.yes-button');
var $modal = document.querySelector('.modal');
var $overlay = document.querySelector('.overlay');
$unorderedListRow.addEventListener('click', showModal);
$modalCloseButton.addEventListener('click', hideModal);
$confirmDeletionButton.addEventListener('click', deleteHandler);

function showModal(event) {
  if (event.target.tagName === 'I') {
    $modal.className = 'modal';
    $overlay.className = 'overlay';
    watchlistViewHandler();
    var dataEntryNumberString = event.target.closest('.column-thirds').getAttribute('data-entry-id');
    data.editing = parseInt(dataEntryNumberString);
  }
}

function hideModal(event) {
  $modal.className = 'modal hidden';
  $overlay.className = 'overlay hidden';
  data.editing = null;
}

function deleteHandler(event) {
  for (var i = 0; i < data.list.length; i++) {
    if (data.editing === data.list[i].Id) {
      data.list.splice(i, 1);
    }
  }
  var $listItems = document.querySelectorAll('li');
  for (var j = 0; j < $listItems.length; j++) {
    var dataEntryNumberString = $listItems[j].getAttribute('data-entry-id');
    if (parseInt(dataEntryNumberString) === data.editing) {
      $listItems[j].remove();
      data.editing = null;
    }
  }
  hideModal();
  watchlistViewHandler();
}
