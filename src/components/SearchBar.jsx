// import { useState } from "react";
//
// export default function SearchBar({ setWeatherData, setError }) {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [loading, setLoading] = useState(false);
//
//     const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
//
//     const fetchSuggestions = async (query) => {
//         if (!query.trim()) return setSuggestions([]);
//
//         setLoading(true);
//         try {
//             const res = await fetch(
//                 `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
//             );
//             const data = await res.json();
//             setSuggestions(data);
//         } catch (error) {
//             setSuggestions([]);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const fetchWeather = async (location) => {
//         try {
//             const { lat, lon, name, country } = location;
//             const weatherResponse = await fetch(
//                 `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//             );
//             const weather = await weatherResponse.json();
//
//             setWeatherData({ ...weather, location: `${name}, ${country}` });
//             setError(null);
//         } catch (err) {
//             setWeatherData(null);
//             setError("Failed to fetch weather data. Please try again.");
//         }
//     };
//
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setSearchTerm(value);
//         fetchSuggestions(value);
//     };
//
//     const handleSelectLocation = (location) => {
//         setSearchTerm(`${location.name}, ${location.country}`);
//         setSuggestions([]);
//         fetchWeather(location);
//     };
//
//     return (
//         <div className="relative w-full max-w-md">
//             <div className="flex items-center border rounded-lg p-1 bg-base-200">
//                 <span className="px-2 text-gray-500">
//                     <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                         <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
//                             <circle cx="11" cy="11" r="8"></circle>
//                             <path d="m21 21-4.3-4.3"></path>
//                         </g>
//                     </svg>
//                 </span>
//                 <input
//                     type="search"
//                     required
//                     placeholder="Enter city, country, or ZIP"
//                     value={searchTerm}
//                     onChange={handleInputChange}
//                     className="flex-grow outline-none px-2 py-2 bg-transparent"
//                 />
//                 {loading && <span className="loading loading-spinner loading-xs"></span>}
//             </div>
//
//             {suggestions.length > 0 && (
//                 <ul className="menu bg-base-100 shadow-lg rounded-lg w-full mt-2 absolute z-10">
//                     {suggestions.map((location, index) => (
//                         <li key={index}>
//                             <button onClick={() => handleSelectLocation(location)}>
//                                 {location.name}, {location.country}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// }
import { useState } from "react";

export default function SearchBar({ setWeatherData, setForecastData, setError }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const fetchSuggestions = async (query) => {
        if (!query.trim()) return setSuggestions([]);

        setLoading(true);
        try {
            const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
            );
            const data = await res.json();
            setSuggestions(data);
        } catch (error) {
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchWeather = async (location) => {
        try {
            const { lat, lon, name, country } = location;

            // Fetch current weather
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );
            const weather = await weatherResponse.json();

            // Fetch 5-day/3-hour forecast
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );
            const forecast = await forecastResponse.json();

            setWeatherData({ ...weather, location: `${name}, ${country}` });
            setForecastData(forecast);
            setError(null);
        } catch (err) {
            setWeatherData(null);
            setForecastData(null);
            setError("Failed to fetch weather data. Please try again.");
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        fetchSuggestions(value);
    };

    const handleSelectLocation = (location) => {
        setSearchTerm(`${location.name}, ${location.country}`);
        setSuggestions([]);
        fetchWeather(location);
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="flex items-center border rounded-lg p-1 bg-base-200">
                <span className="px-2 text-gray-500">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                </span>
                <input
                    type="search"
                    required
                    placeholder="Enter city, country, or ZIP"
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="flex-grow outline-none px-2 py-2 bg-transparent"
                />
                {loading && <span className="loading loading-spinner loading-xs"></span>}
            </div>

            {suggestions.length > 0 && (
                <ul className="menu bg-base-100 shadow-lg rounded-lg w-full mt-2 absolute z-10">
                    {suggestions.map((location, index) => (
                        <li key={index}>
                            <button onClick={() => handleSelectLocation(location)}>
                                {location.name}, {location.country}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
