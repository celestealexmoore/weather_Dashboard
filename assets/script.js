const api_key = "37da8c9a08447f616fa749bd4ecfb171";
const requestURL =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + api_key;

const body = document.getElementById("body");
const title = document.createElement("div");
//leftDiv
const leftDiv = document.createElement("div");
const searchDiv = document.createElement("div");
const searchBar = document.createElement("i");
const searchBarIcon = document.createElement("div");
const appendList = document.createElement("ul");
const appendListItem = document.createElement("li");
//rightDiv top
const rightDiv = document.createElement("div");
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

  title.setAttribute("class", "row display-5");
  title.textContent = "Weather Dashboard";
  // leftDiv
  leftDiv.setAttribute("id", "leftDiv");
  leftDiv.setAttribute("class", "leftDiv col-4");

  searchDiv.setAttribute("class", "h4");
  searchDiv.textContent = "Search for a City:";
  // searchBar
  searchBar.setAttribute("class", "form-control form-control-sm col");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("placeholder", "Enter a city name.");
  //   icon
  searchBarIcon.setAttribute("class", "bi bi-search searchBarIcon col");
  //append list
  appendList.setAttribute("class", "list-group");
  appendListItem.setAttribute(
    "class",
    "list-group-item list-group-item-action appendListItem"
  );
  // the line of code above should include an on hover, add class "active"

  rightDiv.setAttribute("id", "rightDiv");
  rightDiv.setAttribute("class", "col-8");

  body.appendChild(title);
  body.appendChild(leftDiv);
  leftDiv.appendChild(searchDiv);
  searchDiv.appendChild(searchBar);
  searchBar.appendChild(searchBarIcon);
  body.appendChild(rightDiv);
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
