const api_key = "37da8c9a08447f616fa749bd4ecfb171";
const requestURL =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + api_key;

const body = document.getElementById("body");
const title = document.createElement("div");
const contentDivContainer = document.createElement("div");
const contentDivRow = document.createElement("div");
//leftDiv
const leftDivContainer = document.createElement("div");
const leftDivRow = document.createElement("div");
const leftColTitle = document.createElement("div");

// const appendList = document.createElement("ul");
// const appendListItem = document.createElement("li");

//rightDiv top
const rightDivContainer = document.createElement("div");
const rightDivRow = document.createElement("div");

const cityOverview = document.createElement("div");
const cityName = document.createElement("div");
const cityUl = document.createElement("ul");
const cityLi = document.createElement("li");
//rightDiv bottom
const forecastDiv = document.createElement("div");
const forecastUl = document.createElement("ul");
const forecastLi = document.createElement("li");

//store number of searches in a variable
// every time user searches a city name, i++ and store city info to local storage.

function getAPI() {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

  title.setAttribute("class", "h1 row justify-content-center title");
  title.textContent = "Weather Dashboard";
  contentDivContainer.setAttribute("class", "container-fluid");
  contentDivRow.setAttribute("class", "row");
  // leftDivContainer
  leftDivContainer.setAttribute("id", "leftDivContainer");
  leftDivContainer.setAttribute("class", "col-4");
  leftDivRow.setAttribute("class", "row");
  leftColTitle.setAttribute("class", "col h4");
  leftColTitle.textContent = "Search for a City:";
  // searchBar Structure
  const inputGroup = document.createElement("div");
  inputGroup.setAttribute("class", "input-group");
  const formOutline = document.createElement("div");
  formOutline.setAttribute("class", "form-outline");
  const searchInput = document.createElement("input");
  searchInput.setAttribute("type", "search");
  searchInput.setAttribute("id", "form1");
  searchInput.setAttribute("class", "form-control");
  const searchLabel = document.createElement("label");
  searchLabel.setAttribute("class", "form-label");
  searchLabel.setAttribute("for", "form1");
  //search button
  const searchButton = document.createElement("div");
  searchButton.setAttribute("id", "search-button");
  searchButton.setAttribute("type", "button");
  searchButton.setAttribute("class", "btn btn-primary");
  const searchIcon = document.createElement("i");
  searchIcon.setAttribute("class", "bi bi-search");

  //append list
  //   appendList.setAttribute("class", "list-group");
  //   appendListItem.setAttribute(
  //     "class",
  //     "list-group-item list-group-item-action appendListItem"
  //   );
  // the line of code above should include an on hover, add class "active"

  rightDivContainer.setAttribute("id", "rightDiv");
  rightDivContainer.setAttribute("class", "col");

  body.appendChild(title);
  body.appendChild(contentDivContainer);
  contentDivContainer.appendChild(contentDivRow);
  contentDivRow.appendChild(leftDivContainer);
  leftDivContainer.appendChild(leftDivRow);
  contentDivRow.appendChild(rightDivContainer);
  rightDivContainer.appendChild(rightDivRow);
  leftDivContainer.appendChild(leftColTitle);

  leftDivContainer.appendChild(inputGroup);
  inputGroup.appendChild(formOutline);
  inputGroup.appendChild(formOutline);
  formOutline.appendChild(searchInput);
  formOutline.appendChild(searchLabel);
  searchButton.appendChild(searchIcon);
  inputGroup.appendChild(searchButton);
}

getAPI();

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
