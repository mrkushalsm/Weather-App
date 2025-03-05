// export default function WeatherDetails({ weatherData, isCelsius, toggleUnit }) {
//     const convertTemperature = (kelvin) => {
//         return isCelsius
//             ? `${(kelvin - 273.15).toFixed(2)}°C`
//             : `${(((kelvin - 273.15) * 9) / 5 + 32).toFixed(2)}°F`;
//     };
//
//     const capitalizeFirstLetter = (text) => {
//         return text.charAt(0).toUpperCase() + text.slice(1);
//     };
//
//     return (
//         <div className="card w-full max-w-md bg-base-300 shadow-lg mt-6">
//             <div className="card-body items-center text-center">
//                 <h2 className="card-title text-xl">{weatherData.location}</h2>
//                 <p className="text-lg">🌡️ Temperature: {convertTemperature(weatherData.main.temp)}</p>
//                 <p className="text-lg">
//                     🌥️ Weather: {capitalizeFirstLetter(weatherData.weather[0].description)}
//                 </p>
//                 <p className="text-lg">💨 Wind Speed: {weatherData.wind.speed} m/s</p>
//                 <p className="text-lg">💧 Humidity: {weatherData.main.humidity}%</p>
//
//                 <div className="mt-4 flex items-center gap-2">
//                     <span>°C</span>
//                     <input
//                         type="checkbox"
//                         className="toggle"
//                         checked={!isCelsius}
//                         onChange={toggleUnit}
//                     />
//                     <span>°F</span>
//                 </div>
//             </div>
//         </div>
//     );
// }
export default function WeatherDetails({ weatherData, isCelsius, toggleUnit }) {
    const convertTemperature = (kelvin) => {
        return isCelsius
            ? `${(kelvin - 273.15).toFixed(2)}°C`
            : `${(((kelvin - 273.15) * 9) / 5 + 32).toFixed(2)}°F`;
    };

    const capitalizeFirstLetter = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

    return (
        <div className="card w-full max-w-md bg-base-300 shadow-lg mt-6">
            <div className="card-body items-center text-center">
                <h2 className="card-title text-xl">{weatherData.location}</h2>
                <p className="text-lg">🌡️ Temperature: {convertTemperature(weatherData.main.temp)}</p>
                <p className="text-lg flex items-center justify-center gap-2">
                    <img src={weatherIconUrl} alt="Weather Icon" className="w-10 h-10" />
                    Weather: {capitalizeFirstLetter(weatherData.weather[0].description)}
                </p>
                <p className="text-lg">💨 Wind Speed: {weatherData.wind.speed} m/s</p>
                <p className="text-lg">💧 Humidity: {weatherData.main.humidity}%</p>

                <div className="mt-4 flex items-center gap-2">
                    <span>°C</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={!isCelsius}
                        onChange={toggleUnit}
                    />
                    <span>°F</span>
                </div>
            </div>
        </div>
    );
}
