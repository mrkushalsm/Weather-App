export default function ForecastCard({ forecastData }) {
    if (!forecastData) return null;

    const groupedData = forecastData.list.reduce((acc, item) => {
        const date = item.dt_txt.split(" ")[0];
        if (!acc[date]) {
            acc[date] = { temps: [], humidities: [], windSpeeds: [], weather: {} };
        }
        acc[date].temps.push(item.main.temp);
        acc[date].humidities.push(item.main.humidity);
        acc[date].windSpeeds.push(item.wind.speed);

        const weatherDesc = item.weather[0].description;
        const weatherIcon = item.weather[0].icon;
        acc[date].weather[weatherDesc] = (acc[date].weather[weatherDesc] || 0) + 1;
        acc[date].weather.icon = weatherIcon;

        return acc;
    }, {});

    const dailyForecast = Object.entries(groupedData).map(([date, data]) => {
        const avgTemp = (data.temps.reduce((sum, t) => sum + t, 0) / data.temps.length - 273.15).toFixed(1);
        const avgHumidity = (data.humidities.reduce((sum, h) => sum + h, 0) / data.humidities.length).toFixed(0);
        const avgWind = (data.windSpeeds.reduce((sum, w) => sum + w, 0) / data.windSpeeds.length).toFixed(1);

        const mostCommonWeather = Object.entries(data.weather).reduce((a, b) => (a[1] > b[1] ? a : b))[0];

        // Convert date to day of the week
        const dayName = new Date(date).toLocaleDateString("en-US", { weekday: "long" });

        return {
            dayName,
            avgTemp,
            avgHumidity,
            avgWind,
            weather: mostCommonWeather,
            icon: data.weather.icon,
        };
    });

    return (
        <div className="card w-full max-w-3xl bg-base-300 shadow-lg mt-6">
            <div className="card-body">
                <h2 className="card-title text-xl text-center">5-Day Forecast</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                        <tr className="bg-base-200">
                            <th>Day</th>
                            <th>Temp (°C)</th>
                            <th>Weather</th>
                            <th>Wind (m/s)</th>
                            <th>Humidity (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dailyForecast.map((day, index) => (
                            <tr key={index} className="hover">
                                <td>{day.dayName}</td>
                                <td>{day.avgTemp}</td>
                                <td className="flex items-center gap-2">
                                    <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt="Weather Icon" />
                                    {day.icon === "04d" || day.icon === "04n" ? "broken clouds" : day.weather}
                                </td>
                                <td>{day.avgWind}</td>
                                <td>{day.avgHumidity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
