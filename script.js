// const apiKey = "fb8d0b14973e5fabcf559f209126aad8";
// const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// const searchBox = document.querySelector(".search input");
// const searchButton = document.querySelector(".search button");

// async function checkWeather(city) {
//     const response = await fetch(apiURL + city + `&appid=${apiKey}`);
//     var data = await response.json();

//     console.log(data);
// }

// document.querySelector(".city").innerHTML = data.name;
// document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
// document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
// document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

// searchButton.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });







// Define your API key (get your own from https://openweathermap.org/api)
const apiKey = "fb8d0b14973e5fabcf559f209126aad8"; // Replace 'YOUR_API_KEY' with your actual API key

// Select elements from the DOM
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === 200) {
      // Successfully fetched weather data
      tempElement.textContent = `${Math.round(data.main.temp)}°C`;
      cityElement.textContent = data.name;
      humidityElement.textContent = `${data.main.humidity}%`;
      windElement.textContent = `${data.wind.speed} km/h`;

      // Set the weather icon based on API response
      const weatherCondition = data.weather[0].main.toLowerCase();
      if (weatherCondition.includes("rain")) {
        weatherIcon.src = "images/rain.png";
      } else if (weatherCondition.includes("cloud")) {
        weatherIcon.src = "images/clouds.png";
      } else if (weatherCondition.includes("snow")) {
        weatherIcon.src = "images/snow.png";
      } else {
        weatherIcon.src = "images/clear.png"; // Default clear weather
      }
    } else {
      // Handle errors (e.g., city not found)
      alert("City not found! Please enter a valid city name.");
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching the weather data. Please try again.");
  }
}

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

// Optional: Allow pressing Enter to search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
