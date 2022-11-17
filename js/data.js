/* exported data */
var data = {
  view: 'search',
  list: [],
  currentCurrencyData: {},
  nextEntryId: 1,
  editing: null
};

window.addEventListener('beforeunload', unloadHandler);
var previousData = localStorage.getItem('crypto-catalog-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

function unloadHandler(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('crypto-catalog-local-storage', dataJSON);
}
