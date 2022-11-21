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

  var $coinsOwnedForm = document.createElement('form');
  $coinsOwnedForm.className = 'coins-owned-form';

  var $coinsOwnedLabel = document.createElement('label');
  $coinsOwnedLabel.setAttribute('for', 'coins-owned');
  $coinsOwnedLabel.className = 'coins-owned-label';
  $coinsOwnedLabel.textContent = 'Coins Owned:';

  var $coinsOwnedInputBar = document.createElement('input');
  $coinsOwnedInputBar.setAttribute('type', 'text');
  $coinsOwnedInputBar.setAttribute('id', 'coins-owned');
  $coinsOwnedInputBar.className = 'coins-owned-input-bar';
  $coinsOwnedInputBar.setAttribute('name', 'coins');
  $coinsOwnedInputBar.setAttribute('placeholder', 'Amount...');

  var $coinsOwnedSubmitButton = document.createElement('button');
  $coinsOwnedSubmitButton.setAttribute('type', 'submit');
  $coinsOwnedSubmitButton.className = 'coins-owned-submit-button';
  $coinsOwnedSubmitButton.setAttribute('name', 'submit');

  var $coinsOwnedSubmitSymbol = document.createElement('i');
  $coinsOwnedSubmitSymbol.className = 'fa-regular fa-circle-check coins-owned-submit-symbol';

  var $coinsOwnedEditSymbol = document.createElement('i');
  $coinsOwnedEditSymbol.className = 'fa-solid fa-pencil coins-owned-edit-symbol hidden';

  $columnThirdsList.appendChild($listGrayBackgroundDiv);
  $listGrayBackgroundDiv.appendChild($divRow);
  $listGrayBackgroundDiv.appendChild($deleteIcon);
  $divRow.appendChild($columnOneSixthDiv);
  $divRow.appendChild($columnTwoThirdsDiv);
  $columnOneSixthDiv.appendChild($listImage);
  $columnTwoThirdsDiv.appendChild($listName);
  $columnTwoThirdsDiv.appendChild($coinsOwnedForm);
  $coinsOwnedForm.appendChild($coinsOwnedLabel);
  $coinsOwnedForm.appendChild($coinsOwnedInputBar);
  $coinsOwnedForm.appendChild($coinsOwnedSubmitButton);
  $coinsOwnedSubmitButton.appendChild($coinsOwnedSubmitSymbol);
  $coinsOwnedForm.appendChild($coinsOwnedEditSymbol);

  $coinsOwnedForm.addEventListener('submit', coinsOwnedSubmitHandler);

  $coinsOwnedEditSymbol.addEventListener('click', coinsOwnedEditHandler);

  return $columnThirdsList;

}
var $unorderedListRow = document.querySelector('ul');
window.addEventListener('DOMContentLoaded', treeHandler);

function treeHandler(event) {
  if (data.view === 'search') {
    searchViewHandler();
  } else if (data.view === 'details') {
    detailsHandler(data.currentCurrencyData);
    detailsViewHandler();
    $addButton.className = 'add-button hidden';
  } else if (data.view === 'watchlist') {
    watchlistViewHandler();
  }
  for (var i = 0; i < data.list.length; i++) {
    var newCryptoEntry = renderCrypto(data.list[i]);
    $unorderedListRow.appendChild(newCryptoEntry);
  }
}

$unorderedListRow.addEventListener('click', listToDetails);
function listToDetails(event) {
  if (event.target.closest('li') && (event.target.tagName !== 'INPUT') && (event.target.tagName !== 'I')) {
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
function coinsOwnedSubmitHandler(event) {
  event.preventDefault();
  var $coinsOwnedSubmitButton = event.target.elements.submit;
  var $coinsOwnedSubmitSymbol = $coinsOwnedSubmitButton.querySelector('i');
  var $coinsOwnedEditSymbol = event.target.querySelector('.coins-owned-edit-symbol');
  var $coinsOwnedInputBar = event.target.elements.coins;
  var $coinsOwnedLabel = event.target.querySelector('label');
  for (var i = 0; i < data.list.length; i++) {
    var dataEntryNumberString = event.target.closest('.column-thirds').getAttribute('data-entry-id');
    if (data.list[i].Id === parseInt(dataEntryNumberString)) {
      data.list[i].coins_owned = event.target.elements.coins.value;
      data.editing = parseInt(dataEntryNumberString);
    }
    var $listItems = document.querySelectorAll('li');
    for (var j = 0; j < $listItems.length; j++) {
      var dataEntryNumberStringTwo = ($listItems[j].getAttribute('data-entry-id'));
      if (parseInt(dataEntryNumberStringTwo) === data.editing) {
        $coinsOwnedSubmitButton.className = 'coins-owned-submit-button hidden';
        $coinsOwnedSubmitSymbol.className = 'fa-regular fa-circle-check coins-owned-submit-symbol hidden';
        $coinsOwnedEditSymbol.className = 'fa-solid fa-pencil coins-owned-edit-symbol';
        $coinsOwnedInputBar.className = 'coins-owned-input-bar hidden';
        $coinsOwnedLabel.textContent = 'Coins Owned:' + ' ' + data.list[j].coins_owned;
      }
    }
  }
  calculateNetWorth(data.list);
  var $currentNetWorth = document.querySelector('.current-net-worth');
  $currentNetWorth.textContent = 'Current Net Worth:' + ' ' + '$' + calculateNetWorth(data.list);

}
function coinsOwnedEditHandler(event) {
  var $coinsOwnedForm = event.target.closest('.coins-owned-form');
  var $coinsOwnedSubmitButton = $coinsOwnedForm.elements.submit;
  var $coinsOwnedSubmitSymbol = $coinsOwnedSubmitButton.querySelector('i');
  var $coinsOwnedEditSymbol = $coinsOwnedForm.querySelector('.coins-owned-edit-symbol');
  var $coinsOwnedLabel = $coinsOwnedForm.querySelector('label');
  var $coinsOwnedInputBar = $coinsOwnedForm.elements.coins;
  for (var i = 0; i < data.list.length; i++) {
    var dataEntryNumberString = event.target.closest('.column-thirds').getAttribute('data-entry-id');
    if (data.list[i].Id === parseInt(dataEntryNumberString)) {
      data.editing = parseInt(dataEntryNumberString);
    }
  }
  var $listItems = document.querySelectorAll('li');
  for (var j = 0; j < $listItems.length; j++) {
    var dataEntryNumberStringTwo = ($listItems[j].getAttribute('data-entry-id'));
    if (parseInt(dataEntryNumberStringTwo) === data.editing) {
      $coinsOwnedSubmitButton.className = 'coins-owned-submit-button';
      $coinsOwnedSubmitSymbol.className = 'fa-regular fa-circle-check coins-owned-submit-symbol';
      $coinsOwnedEditSymbol.className = 'fa-solid fa-pencil coins-owned-edit-symbol hidden';
      $coinsOwnedInputBar.value = '';
      $coinsOwnedInputBar.className = 'coins-owned-input-bar';
      $coinsOwnedLabel.textContent = 'Coins Owned:';
    }
  }
}
function calculateNetWorth(array) {
  var totalNetWorth = 0;
  for (var i = 0; i < data.list.length; i++) {
    if (data.list[i].coins_owned !== undefined) {
      totalNetWorth += Math.floor(data.list[i].coins_owned * data.list[i].current_price);
    }
  }
  return totalNetWorth;
}

calculateNetWorth(data.list);
var $currentNetWorth = document.querySelector('.current-net-worth');
$currentNetWorth.textContent = 'Current Net Worth:' + ' ' + '$' + calculateNetWorth(data.list);

var $modalCloseButton = document.querySelector('.no-button');
var $confirmDeletionButton = document.querySelector('.yes-button');
var $modal = document.querySelector('.modal');
var $overlay = document.querySelector('.overlay');
$unorderedListRow.addEventListener('click', showModal);
$modalCloseButton.addEventListener('click', hideModal);
$confirmDeletionButton.addEventListener('click', deleteHandler);

function showModal(event) {
  if (event.target.matches('.fa-xmark')) {
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
  var $currentNetWorth = document.querySelector('.current-net-worth');
  $currentNetWorth.textContent = 'Current Net Worth:' + ' ' + '$' + calculateNetWorth(data.list);
  hideModal();
  watchlistViewHandler();
}
