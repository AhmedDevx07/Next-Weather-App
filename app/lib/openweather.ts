const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeatherData(city: string = "Karachi") {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`,
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Weather Fetch Error:", error);
    return null;
  }
}

export async function getForecastData(city: string = "Karachi") {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`,
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function getAirQualityData(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    return null;
  }
}
