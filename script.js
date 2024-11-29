// Function to fetch and display weather data
async function fetchWeather(city = "") {
    const url = `https://wttr.in/${city}?format=j1`;
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      const weatherContainer = document.getElementById("forecastContainer");
      const cityDisplay = document.getElementById("cityDisplay");
  
      // Update city display
      cityDisplay.innerText = `Weather Display for ${city || "Current Location"}`;
  
      weatherContainer.innerHTML = ""; // Clear old content
  
      const todayWeather = data.weather[0].hourly;
  
      // Map times of day with dynamic indices
      const timesOfDay = [
        { label: "Morning", time: "6 AM", index: findHourlyIndex(todayWeather, 6), icon: "wi-day-sunny" },
        { label: "Noon", time: "12 PM", index: findHourlyIndex(todayWeather, 12), icon: "wi-day-cloudy" },
        { label: "Evening", time: "6 PM", index: findHourlyIndex(todayWeather, 18), icon: "wi-cloudy" },
        { label: "Night", time: "9 PM", index: findHourlyIndex(todayWeather, 21), icon: "wi-night-clear" }
      ];
  
      // Dynamically create weather cards for all times of day
      timesOfDay.forEach(({ label, time, index, icon }) => {
        const weather = todayWeather[index];
  
        if (!weather) return; // Skip if data is missing
  
        // Create weather card
        const card = document.createElement("div");
        card.classList.add("forecast-card");
        card.innerHTML = `
          <h3>${label} (${time})</h3>
          <i class="wi ${icon}"></i>
          <p>${weather.weatherDesc[0].value}</p>
          <p>Temp: ${weather.tempF}°F</p>
          <p>Feels Like: ${weather.FeelsLikeF}°F</p>
          <p>Wind: ${weather.windspeedMiles} mph</p>
          <p>Humidity: ${weather.humidity}%</p>
          <p>Pressure: ${weather.pressure} hPa</p>
          <p>Visibility: ${weather.visibility} miles</p>
          <p>Precipitation: ${weather.precipMM} mm</p>
        `;
        weatherContainer.appendChild(card);
      });
  
      // Set background based on current weather condition
      const currentWeather = todayWeather[0]; // Use first hourly forecast as representative
  
      // Background condition logic
      const weatherCondition = currentWeather.weatherDesc[0].value.toLowerCase();
      setWeatherBackground(weatherCondition);
  
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data. Please try again.");
    }
  }
  
  // Utility to find the closest hourly index based on the given time
  function findHourlyIndex(hourlyData, hour) {
    return hourlyData.findIndex((entry) => {
      const entryTime = parseInt(entry.time, 10) / 100; // Convert "600" to "6"
      return entryTime === hour;
    });
  }
  
  // Function to change the background based on weather condition
  function setWeatherBackground(condition) {
    const body = document.body;
  
    // Change background based on the weather condition
    if (condition.includes("sunny") || condition.includes("clear")) {
      body.style.backgroundImage = "url('https://imgs.search.brave.com/NrP7lssYlJugjCu1ACAPgVWw7s1EaOIIl75cmaDQjHE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvc3VubnktYmFj/a2dyb3VuZC04dnZr/Z3k4eDlsb213cG5j/LmpwZw')";
      body.style.backgroundSize = "cover";
    } else if (condition.includes("cloudy")) {
      body.style.backgroundImage = "url('https://imgs.search.brave.com/-ng6Q7s2OoaHw6sUBaGSGGxX3LfoEd1VCTGNlLpnDL0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9oZWF2eS1ncmV5/LWNsb3Vkcy1za3kt/YmVmb3JlLXJhaW4t/aW1hZ2VfNDk2ODMt/MzE3Ni5qcGc_c2Vt/dD1haXNfaHlicmlk')";
      body.style.backgroundSize = "cover";
    } else if (condition.includes("rain") || condition.includes("drizzle")) {
      body.style.backgroundImage = "url('https://imgs.search.brave.com/RvnBhkyfvkgnbRq4V2_KhF2dAKRVKdJbIYPiNbPw7zU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS84Ni85/Ny85YzBQeDQuanBn')";
      body.style.backgroundSize = "cover";
    } else if (condition.includes("snow")) {
      body.style.backgroundImage = "url('https://imgs.search.brave.com/DqYvbHAtpyJEr-ZvgEdq2EVF6u0lO3BM2XCa4QQZ0uw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJiYXQuY29t/L2ltZy81NDA0Njkt/c25vdy1mYWxsaW5n/LXVsdHJhLWhkLWRl/c2t0b3AtYmFja2dy/b3VuZC13YWxscGFw/ZXItZm9yLTRrLXVo/ZC10di10YWJsZXQt/c21hcnRwaG9uZS5q/cGc')";
      body.style.backgroundSize = "cover";
    } else {
      body.style.backgroundImage = "url('https://imgs.search.brave.com/E3k_teWzNU3GM5a11QZY2CoJGtU4YYZuOncNcZXx4Ow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzkwL2Jh/LzNmLzkwYmEzZjQ2/ZjZhNWE3YjI5ODI4/MmQxMzEwNWQ2YmM1/LmpwZw')";
      body.style.backgroundSize = "cover";
    }
  }
  
  // Event listeners for search bar
  document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");
  
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value.trim();
      if (city) fetchWeather(city);
    });
  
    cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
      }
    });
  
    // Load default weather
    fetchWeather();
  });
  