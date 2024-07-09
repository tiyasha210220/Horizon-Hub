const apiKey = "c84ffe88b5e8e7270f9fac127e757668";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + apiKey + "&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); 
const weatherIcon = document.querySelector(".weather-icon");     

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city);
        const data = await response.json();

        if (data.cod === "404") {
            alert("Invalid City Name.");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°";
        document.querySelector(".pressure").innerHTML = Math.round(data.main.pressure) + "mb";

        switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "/icons/clear.png";
                break;
            case "Clouds":
                weatherIcon.src = "/icons/cloudy.png";
                break;
            case "Rain":
                weatherIcon.src = "/icons/thunderstorm.png";
                break;
            case "Drizzle":
                weatherIcon.src = "/icons/rainy.png";
                break;
            case "Wind":
                weatherIcon.src = "/icons/windy.png";
                break;
            case "Haze":
                weatherIcon.src = "/icons/cloudy.png";
            break;
            default:
                weatherIcon.src = "/icons/clear.png"; // fallback icon
                break;
        }
    } catch (error) {
        alert("An error occurred while fetching the weather data.");
        console.error(error);
    }


document.querySelector(".weather").style.display = "block";
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
