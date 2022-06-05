// bodyChildren
const body = document.getElementById("body");
const title = document.createElement("div");
const contentDivContainer = document.createElement("div");
const contentDivRow = document.createElement("div");
// titleDiv
title.setAttribute("class", "h1 row justify-content-center title");
title.textContent = "Weather Dashboard";
contentDivContainer.setAttribute("class", "container-fluid");
contentDivRow.setAttribute("class", "row");
//leftDivContainer
const leftDivContainer = document.createElement("div");
const leftDivRow = document.createElement("div");
leftDivContainer.setAttribute("id", "leftDivContainer");
leftDivContainer.setAttribute("class", "col-3");
leftDivRow.setAttribute("class", "row");
// leftDiv Child-1
const leftColTitle = document.createElement("div");
leftColTitle.setAttribute("class", "col h4");
leftColTitle.textContent = "Search for a City:";
// leftDiv Child-2 (searchBar)
const inputGroup = document.createElement("div");
inputGroup.setAttribute("class", "input-group");
const formOutline = document.createElement("div");
formOutline.setAttribute("class", "form-outline");
//target searchInput.value to create city search.
const searchInput = document.createElement("input");
searchInput.setAttribute("type", "search");
searchInput.setAttribute("id", "form1");
searchInput.setAttribute("class", "form-control");
const searchLabel = document.createElement("label");
searchLabel.setAttribute("class", "form-label");
searchLabel.setAttribute("for", "form1");
// leftDiv Child-3 (searchButton)
const searchButton = document.createElement("div");
searchButton.setAttribute("id", "search-button");
searchButton.setAttribute("type", "button");
searchButton.setAttribute("class", "btn btn-primary");
const searchIcon = document.createElement("i");
searchIcon.setAttribute("class", "bi bi-search");
//rightDiv Container
const rightDivContainer = document.createElement("div");
const rightDivRow = document.createElement("div");
rightDivContainer.setAttribute("id", "rightDiv");
rightDivContainer.setAttribute("class", "col");
// append to document
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

//beginning of logic:
const api_key = "37da8c9a08447f616fa749bd4ecfb171";
const requestURL =
  "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + api_key;

let currentDate = moment().format("MM/D/YYYY");

// function
function getForecast() {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      // cities appended to search results
      let searchResultsEl = document.createElement("div");
      searchResultsEl.setAttribute("class", "list-group");
      leftDivContainer.appendChild(searchResultsEl);
      //example array
      let citiesArray = [
        "Austin",
        "Chicago",
        "New York",
        "Orlando",
        "San Francisco",
        "Seattle",
        "Denver",
        "Atlanta",
      ];
      //for loop fetching example array
      for (let i = 0; i < citiesArray.length; i++) {
        let appendCitiesRow = document.createElement("a");
        appendCitiesRow.setAttribute("href", "#");
        appendCitiesRow.setAttribute(
          "class",
          "list-group-item list-group-item-action cityNames"
        );
        appendCitiesRow.textContent = citiesArray[i];
        searchResultsEl.appendChild(appendCitiesRow);
      }
      // city title right div | this container has two children: cityNameDiv and currentWeatherDiv
      let rightDivTop = document.createElement("div");
      rightDivTop.setAttribute("class", "container rightDivTop");
      let cityNameDiv = document.createElement("div");
      cityNameDiv.setAttribute("class", "h4");
      let cityName = data.city.name;
      let cloudIcon = document.createElement("i");
      cloudIcon.setAttribute("class", "bi bi-cloud cloudIcon");
      cityNameDiv.innerText = cityName + " (" + currentDate + ") ";
      rightDivTop.appendChild(cityNameDiv);
      cityNameDiv.appendChild(cloudIcon);
      //currentWeather example array
      let currentWeather = [
        "Temperature:",
        "Humidity:",
        "Wind Speed:",
        "UV Index:",
      ];
      let fillingInInfo = ["90.9°F", "41%", "4.7 MPH", "9.49"]; // delete and access through API
      let currentWeatherContainer = document.createElement("ul");
      currentWeatherContainer.setAttribute("class", "list-group");
      rightDivTop.appendChild(currentWeatherContainer);
      // loop over both arrays and append the info.
      for (let j = 0; j < currentWeather.length; j++) {
        let weatherRow = document.createElement("li");
        weatherRow.setAttribute("class", "list-group-item border-0");
        weatherRow.textContent = currentWeather[j] + " " + fillingInInfo[j];
        currentWeatherContainer.appendChild(weatherRow);
      }
      //5-day forecast div
      let rightDivBottom = document.createElement("div");
      rightDivBottom.setAttribute("class", "col rightDivBottom");
      //5-day forecast Title
      let rightBottomTitle = document.createElement("div");
      rightBottomTitle.setAttribute("class", "h4");
      rightBottomTitle.innerText = "5-Day Forecast:";
      //example array
      let exampleArray = ["8/16/2022", "Temp: 88.46", "Humidity: 37%"];
      //forecast container
      let ongoingForecastContainer = document.createElement("div");
      ongoingForecastContainer.setAttribute(
        "class",
        "container forecastContainer"
      );
      let ongoingForecastRow = document.createElement("div");
      ongoingForecastRow.setAttribute("class", "row");
      //for loop to generate 5-day forecast
      for (let k = 0; k < 5; k++) {
        let forecastEl = document.createElement("div");
        forecastEl.setAttribute("class", "col forecastEl");
        // forecastEl.innerText = "hello world"
        ongoingForecastRow.appendChild(forecastEl);
        //nested for loop to append forecast information
        for (let l = 0; l < 1; l++) {
          let forecastUl = document.createElement("div");
          forecastUl.setAttribute("class", "ul forecastUl");
          let forecastLiDate = document.createElement("li");
          forecastLiDate.setAttribute("class", "list-group-item border-0");
          forecastLiDate.innerHTML = exampleArray[0];
          let forecastIcon = document.createElement("i");
          forecastIcon.setAttribute("class", "bi bi-brightness-high sunIcon");
          let forecastLiTemp = document.createElement("li");
          forecastLiTemp.setAttribute("class", "list-group-item border-0");
          forecastLiTemp.innerHTML = exampleArray[1] + "°F";
          let forecastLiHumidity = document.createElement("li");
          forecastLiHumidity.setAttribute("class", "list-group-item border-0");
          forecastLiHumidity.innerHTML = exampleArray[2];
          //append Children
          forecastEl.appendChild(forecastUl);
          forecastUl.appendChild(forecastLiDate);
          forecastUl.appendChild(forecastIcon);
          forecastUl.appendChild(forecastLiTemp);
          forecastUl.appendChild(forecastLiHumidity);
        }
      }

      rightDivRow.appendChild(rightDivTop);
      rightDivRow.appendChild(rightDivBottom);
      rightDivBottom.appendChild(rightBottomTitle);
      rightDivBottom.appendChild(ongoingForecastContainer);
      ongoingForecastContainer.appendChild(ongoingForecastRow);
    });
}
getForecast();
