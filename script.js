// const apiKey = "78f8ca2387c1db8a4ddafb01c2fac57d"; // अपनी असली OpenWeatherMap API key डालो

// function getWeather() {
//   const city = document.getElementById("cityInput").value;
//   if (!city) {
//   document.getElementById("errorMessage").innerText = "⚠️ Please enter a city name.";
//   return;
// }


//   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("City not found or API error");
//       }
//       return response.json();
//     })
//     .then(data => {
//       document.getElementById("cityName").innerText = data.name + ", " + data.sys.country;
//       document.getElementById("temp").innerText = "🌡 Temperature: " + data.main.temp + " °C";
//       document.getElementById("humidity").innerText = "💧 Humidity: " + data.main.humidity + "%";
//       document.getElementById("weather").innerText = "☁ " + data.weather[0].description;
//       document.getElementById("icon").style.display="block";
//       document.getElementById("errorMessage").innerText = "City not found!";

//     })
//     .catch(error => {
//       console.error("Error fetching weather data:", error);
//       alert("Failed to fetch weather data: " + error.message);
//     });
// }

const apiKey = '78f8ca2387c1db8a4ddafb01c2fac57d'; // Replace with your OpenWeatherMap API key

document.getElementById('weatherForm').addEventListener('submit', function(e) {
  e.preventDefault();
  getWeather();
});

async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const cityName = document.getElementById('cityName');
  const temp = document.getElementById('temp');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');
  const weather = document.getElementById('weather');
  const icon = document.getElementById('icon');
  const errorMessage = document.getElementById('errorMessage');

  // Clear previous results
  cityName.textContent = '';
  temp.textContent = '';
  humidity.textContent = '';
  windSpeed.textContent = '';
  weather.textContent = '';
  icon.style.display = 'none';
  errorMessage.textContent = '';

  if (!city) {
    errorMessage.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Air Speed: ${data.wind.speed}m/s`;
    weather.textContent = `Weather: ${data.weather[0].main} (${data.weather[0].description})`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    icon.alt = data.weather[0].description;
    icon.style.display = 'inline-block';
  } catch (err) {
    errorMessage.textContent = 'City not found. Please try again.';
  }
}