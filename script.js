'use strict';
var createDiv = document.createElement('section');
createDiv.setAttribute('class', 'container-fluid mt-3');
document.body.append(createDiv);

var createForm = document.createElement('form');
createForm.setAttribute('class', 'formName');
createForm.setAttribute('action', '');
createForm.innerHTML = `  <b><u>Find a  Brewery </u> : </b>
<input
type="search"
class="inputField"
id="search-box"
placeholder="Search Here"
/>`;
document.querySelector('section').append(createForm);

var createTable = document.createElement('table');
createTable.setAttribute('class', 'table table-striped table-bordered');
createTable.innerHTML = ` <thead>
<tr>
  <th>Name</th>
  <th>Type</th>
  <th>Country</th>
  <th>URL</th>
  <th>Phone</th>
</tr>
</thead>
<tbody id="table-body"></tbody>
`;
document.querySelector('section').append(createTable);

async function brewaryAPI() {
  try {
    let res = await fetch('https://api.openbrewerydb.org/breweries/');
    let breweryAPI = await res.json();
    console.log(breweryAPI[1].city);
    let displayBrewery = (breweries) => {
      let tablebody = document.querySelector('#table-body');
      let tableRow = '';
      for (let brewery of breweries) {
        console.log(brewery.street);
        if (brewery.website_url !== null) {
          brewery.website_url = `${brewery.website_url}`;
        } else {
          brewery.website_url = '* Website Under Construction *';
        }
        if (brewery.phone !== null) {
          brewery.phone = brewery.phone;
        } else {
          brewery.phone = '* Number not available';
        }
        if (brewery.street !== null) {
          brewery.street = brewery.street;
        } else {
          brewery.street = ``;
        }
        tableRow += `
          <tr>
          <td>${brewery.name}</td>
          <td>${brewery.brewery_type}</td>
          <td>${brewery.street}  ${brewery.city}<br/>
          ${brewery.state} ${brewery.postal_code}<br/>
          ${brewery.country}</td>
          <td>${brewery.website_url}</td>
          <td>${brewery.phone}</td>
          </tr>
          `;
        tablebody.innerHTML = tableRow;
      }
    };

    displayBrewery(breweryAPI);
    let searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('keydown', function () {
      let textEntered = searchBox.value;

      let filteredBreweries = [];
      if (textEntered != '') {
        filteredBreweries = breweryAPI.filter(function (brewery) {
          return (
            brewery.name.toLowerCase().includes(textEntered.toLowerCase()) ||
            brewery.brewery_type
              .toLowerCase()
              .includes(textEntered.toLowerCase()) ||
            brewery.country.toLowerCase().includes(textEntered.toLowerCase()) ||
            brewery.website_url
              .toLowerCase()
              .includes(textEntered.toLowerCase()) ||
            brewery.phone.includes(textEntered)
          );
        });
        displayBrewery(filteredBreweries);
      }
    });
  } catch (error) {}
}
brewaryAPI();
