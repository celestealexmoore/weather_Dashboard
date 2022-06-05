/* 
With a tutor:
1) Figure out how to link two JS files to each other using the module system.
2) searchInput.value is re-appending same information multiple times.
3) for each search, entire page is re-rendering to body, but I want to replace the current info with the new search info.
*/

// globalVariables
let fetchedData = [];
// for (let i = 0; i < 1; i++) {
//   if (localStorage.getItem('citySearch')) {
//     fetchedData.push(localStorage.getItem("citySearch[i]"));
//   }
// }
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
// searchIcon
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
searchButton.onclick = function () {
  const api_key = "12238cffbe773f1e1977fae9e256dc2e";
  const requestURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=` +
    api_key;
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
        //onclick searchBar functionality
        fetchedData.push(searchInput.value);
        localStorage.setItem("citySearch", searchInput.value);
        // fetchedData.push(localStorage.getItem("citySearch"));
        function appendIt() {
          for (let i = 0; i < fetchedData.length; i++) {
            let appendCitiesRow = document.createElement("a");
            appendCitiesRow.setAttribute("href", "#");
            appendCitiesRow.setAttribute(
              "class",
              "list-group-item list-group-item-action cityNames"
            );
            appendCitiesRow.textContent = fetchedData[i];
            searchResultsEl.appendChild(appendCitiesRow);
          }
        }
        appendIt();
        let rightDivTop = document.createElement("div");
        rightDivTop.setAttribute("class", "container rightDivTop");
        let cityNameDiv = document.createElement("div");
        cityNameDiv.setAttribute("class", "h4");
        let cityName = data.city.name;
        let cloudIcon = document.createElement("img");
        cloudIcon.setAttribute(
          "src",
          `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
        );
        cityNameDiv.innerText = cityName + " (" + currentDate + ") ";
        rightDivTop.appendChild(cityNameDiv);
        cityNameDiv.appendChild(cloudIcon);
        //currentWeather example array
        let currentWeather = [
          "Temperature: ",
          "Humidity: ",
          "Wind Speed: ",
          "High: ",
        ];
        let min = Math.round((data.list[0].main.temp_min - 273.15) * 1.8) + 32;
        let dataFetch = [
          Math.round((data.list[0].main.temp - 273.15) * 1.8) + 32 + "°F",
          data.list[0].main.humidity + "%",
          data.list[0].wind.speed + " MPH",
          Math.round((data.list[0].main.temp_max - 273.15) * 1.8) +
            32 +
            "°F |" +
            " Low: " +
            min +
            "°F",
        ];
        let currentWeatherContainer = document.createElement("ul");
        currentWeatherContainer.setAttribute("class", "list-group");
        rightDivTop.appendChild(currentWeatherContainer);
        // loop over both arrays and append the info.
        for (let j = 0; j < currentWeather.length; j++) {
          let weatherRow = document.createElement("li");
          weatherRow.setAttribute("class", "list-group-item border-0");
          weatherRow.textContent = currentWeather[j] + dataFetch[j];
          currentWeatherContainer.appendChild(weatherRow);
        }
        //5-day forecast div
        let rightDivBottom = document.createElement("div");
        rightDivBottom.setAttribute("class", "col rightDivBottom");
        //5-day forecast Title
        let rightBottomTitle = document.createElement("div");
        rightBottomTitle.setAttribute("class", "h4");
        rightBottomTitle.innerText = "5-Day Forecast:";
        let dateArray = [
          moment(data.list[0].dt_txt).format("M/DD/YYYY"),
          moment(data.list[5].dt_txt).format("M/DD/YYYY"),
          moment(data.list[13].dt_txt).format("M/DD/YYYY"),
          moment(data.list[21].dt_txt).format("M/DD/YYYY"),
          moment(data.list[29].dt_txt).format("M/DD/YYYY"),
        ];
        let tempArray = [
          "Temp: " +
            (Math.round((data.list[0].main.feels_like - 273.15) * 1.8) + 32) +
            "°F",
          "Temp: " +
            (Math.round((data.list[5].main.feels_like - 273.15) * 1.8) + 32) +
            "°F",
          "Temp: " +
            (Math.round((data.list[13].main.feels_like - 273.15) * 1.8) + 32) +
            "°F",
          "Temp: " +
            (Math.round((data.list[21].main.feels_like - 273.15) * 1.8) + 32) +
            "°F",
          "Temp: " +
            (Math.round((data.list[29].main.feels_like - 273.15) * 1.8) + 32) +
            "°F",
        ];
        let humidityArray = [
          "Humidity: " + data.list[0].main.humidity + "%",
          "Humidity: " + data.list[5].main.humidity + "%",
          "Humidity: " + data.list[13].main.humidity + "%",
          "Humidity: " + data.list[21].main.humidity + "%",
          "Humidity: " + data.list[29].main.humidity + "%",
        ];
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
          ongoingForecastRow.appendChild(forecastEl);
          //nested for loop to append forecast information
          for (let l = 0; l < 1; l++) {
            function forecastDataLoop() {
              let forecastUl = document.createElement("div");
              forecastUl.setAttribute("class", "ul forecastUl");
              let forecastLiDate = document.createElement("li");
              forecastLiDate.setAttribute("class", "list-group-item border-0");
              forecastLiDate.innerHTML = dateArray[k];
              let forecastIcon = document.createElement("img");
              forecastIcon.setAttribute(
                "src",
                `http://openweathermap.org/img/w/${data.list[k].weather[0].icon}.png`
              );
              let forecastLiTemp = document.createElement("li");
              forecastLiTemp.setAttribute("class", "list-group-item border-0");
              forecastLiTemp.innerText = tempArray[k];
              let forecastLiHumidity = document.createElement("li");
              forecastLiHumidity.setAttribute(
                "class",
                "list-group-item border-0"
              );
              forecastLiHumidity.innerHTML = humidityArray[k];
              //append Children
              forecastEl.appendChild(forecastUl);
              forecastUl.appendChild(forecastLiDate);
              forecastUl.appendChild(forecastIcon);
              forecastUl.appendChild(forecastLiTemp);
              forecastUl.appendChild(forecastLiHumidity);
            }
            forecastDataLoop();
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
};
