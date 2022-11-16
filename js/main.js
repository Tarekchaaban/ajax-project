function getCryptoData(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&ids=' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    $detailsPicture.setAttribute('src', xhr.response[0].image);
    $detailsName.textContent = xhr.response[0].name + ' ' + '(' + xhr.response[0].symbol.toUpperCase() + ')';
    $price.textContent = 'Price: ' + '$' + xhr.response[0].current_price;
    $marketcap.textContent = 'Market Cap: ' + '$' + xhr.response[0].market_cap;
    $rank.textContent = 'Rank: ' + xhr.response[0].market_cap_rank;
    $searchView.className = 'search-view hidden';
    $detailsView.className = 'details-view-gray-background';
    data.view = 'details';
  });
  var $addButton = document.querySelector('.add-button');
  $addButton.addEventListener('click', addHandler);

  function addHandler(event) {
    data.list.push(xhr.response[0]);

  }
  xhr.send();
}
var $searchForm = document.querySelector('.search-form');
var $searchInput = $searchForm.querySelector('#search-input');
var $searchView = document.querySelector('.search-view');
var $detailsView = document.querySelector('.details-view-gray-background');
var $searchLink = document.querySelector('.search-link');
var $detailsPicture = document.querySelector('.details-picture');
var $detailsName = document.querySelector('.details-name');
var $price = document.querySelector('.price');
var $marketcap = document.querySelector('.market-cap');
var $rank = document.querySelector('.rank');

$searchForm.addEventListener('submit', searchInputHandler);
$searchLink.addEventListener('click', searchViewHandler);

function searchInputHandler(event) {
  event.preventDefault();
  getCryptoData($searchInput.value);
}

function searchViewHandler(event) {
  $searchView.className = 'search-view';
  $detailsView.className = 'details-view-gray-background hidden';
  data.view = 'search';
}

var $addButton = document.querySelector('.add-button');
$addButton.addEventListener('click', addHandler);

function addHandler(event) {

}
