// import { useState } from "react";
// import SearchBar from "./components/SearchBar";
// import WeatherDetails from "./components/WeatherDetails";
//
// export default function App() {
//     const [weatherData, setWeatherData] = useState(null);
//     const [error, setError] = useState(null);
//     const [isCelsius, setIsCelsius] = useState(true);
//
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100 text-white">
//             <h1 className="text-3xl font-bold mb-6">Weather App 🌦️</h1>
//             <SearchBar setWeatherData={setWeatherData} setError={setError} />
//
//             {error && <p className="mt-4 text-red-400">{error}</p>}
//
//             {weatherData && (
//                 <WeatherDetails
//                     weatherData={weatherData}
//                     isCelsius={isCelsius}
//                     toggleUnit={() => setIsCelsius(!isCelsius)}
//                 />
//             )}
//         </div>
//     );
// }
// import { useState, useEffect } from "react";
// import SearchBar from "./components/SearchBar";
// import WeatherDetails from "./components/WeatherDetails";
//
// export default function App() {
//     const [weatherData, setWeatherData] = useState(null);
//     const [error, setError] = useState(null);
//     const [isCelsius, setIsCelsius] = useState(true);
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//     const [backgroundImage, setBackgroundImage] = useState("");
//
//     const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
//
//     useEffect(() => {
//         document.documentElement.dataset.theme = theme;
//         localStorage.setItem("theme", theme);
//     }, [theme]);
//
//     const toggleTheme = () => {
//         setTheme(theme === "light" ? "dark" : "light");
//     };
//
//     // Fetch a background image from Pexels based on weather description
//     const fetchBackgroundImage = async (query) => {
//         try {
//             const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
//                 headers: { Authorization: PEXELS_API_KEY },
//             });
//             const data = await res.json();
//             if (data.photos.length > 0) {
//                 // Pick a random image from results
//                 const randomImage = data.photos[Math.floor(Math.random() * data.photos.length)].src.large;
//                 setBackgroundImage(randomImage);
//             }
//         } catch (error) {
//             console.error("Failed to fetch background image:", error);
//         }
//     };
//
//     useEffect(() => {
//         if (weatherData) {
//             const weatherCondition = weatherData.weather[0].description;
//             const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(0);
//             const tempQuery = temperatureCelsius <= 0 ? "Freezing, Snow, Ice Cold" : temperatureCelsius <= 10 ?
//                 "Very Cold, Chilly" : temperatureCelsius <= 20 ? "Cool, Mild" : temperatureCelsius <= 30 ?
//                     "Warm, Pleasant" : temperatureCelsius <= 40 ? "Hot, Sunny" : temperatureCelsius > 40 ?
//                         "Very Hot, Scorching" : "";
//             const query = weatherCondition + " " + tempQuery + " weather sky"
//             fetchBackgroundImage(query);
//         }
//     }, [weatherData]);
//
//     return (
//         <div
//             className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100 text-base-content"
//             style={{
//                 backgroundImage: backgroundImage === "" ?
//                     "url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg" :`url(${backgroundImage})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 transition: "background-image 0.5s ease-in-out",
//             }}
//         >
//             <h1 className="text-3xl font-bold mb-6">Weather App 🌦️</h1>
//
//             <label className="swap swap-rotate absolute top-5 right-5">
//                 <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
//                 <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                     <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
//                 </svg>
//                 <svg className="swap-on h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
//                     <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
//                 </svg>
//             </label>
//
//             <SearchBar setWeatherData={setWeatherData} setError={setError} />
//             {weatherData && (
//                 <WeatherDetails
//                     weatherData={weatherData}
//                     isCelsius={isCelsius}
//                     toggleUnit={() => setIsCelsius(!isCelsius)}
//                 />
//             )}
//             {error && <p className="mt-4 text-red-400">{error}</p>}
//         </div>
//     );
// }
// import { useState, useEffect } from "react";
// import SearchBar from "./components/SearchBar";
// import WeatherDetails from "./components/WeatherDetails";
// import ForecastCard from "./components/ForecastCard";
//
// export default function App() {
//     const [weatherData, setWeatherData] = useState(null);
//     const [forecastData, setForecastData] = useState(null);
//     const [error, setError] = useState(null);
//     const [isCelsius, setIsCelsius] = useState(true);
//     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//     const [backgroundImage, setBackgroundImage] = useState("");
//
//     const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
//
//     useEffect(() => {
//         document.documentElement.dataset.theme = theme;
//         localStorage.setItem("theme", theme);
//     }, [theme]);
//
//     const toggleTheme = () => {
//         setTheme(theme === "light" ? "dark" : "light");
//     };
//
//     const fetchBackgroundImage = async (query) => {
//         try {
//             const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
//                 headers: { Authorization: PEXELS_API_KEY },
//             });
//             const data = await res.json();
//             if (data.photos.length > 0) {
//                 const randomImage = data.photos[Math.floor(Math.random() * data.photos.length)].src.large;
//                 setBackgroundImage(randomImage);
//             }
//         } catch (error) {
//             console.error("Failed to fetch background image:", error);
//         }
//     };
//
//     useEffect(() => {
//         if (weatherData) {
//             const weatherCondition = weatherData.weather[0].description;
//             const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(0);
//             const tempQuery = temperatureCelsius <= 0 ? "Freezing, Snow, Ice Cold" : temperatureCelsius <= 10 ?
//                 "Very Cold, Chilly" : temperatureCelsius <= 20 ? "Cool, Mild" : temperatureCelsius <= 30 ?
//                     "Warm, Pleasant" : temperatureCelsius <= 40 ? "Hot, Sunny" : temperatureCelsius > 40 ?
//                         "Very Hot, Scorching" : "";
//             const query = `${weatherCondition} ${tempQuery} weather sky`;
//             fetchBackgroundImage(query);
//         }
//     }, [weatherData]);
//
//     return (
//         <div
//             className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100 text-base-content"
//             style={{
//                 backgroundImage: backgroundImage === "" ?
//                     "url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg)" : `url(${backgroundImage})`,
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//                 transition: "background-image 0.5s ease-in-out",
//             }}
//         >
//             <h1 className="text-3xl font-bold mb-6">Weather App 🌦️</h1>
//
//             <label className="swap swap-rotate absolute top-5 right-5">
//                 <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme}/>
//
//                 <svg className="swap-off w-10 h-10 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg"
//                      viewBox="0 0 24 24">
//                     <path
//                         d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12ZM12,5a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM6.36,7.05a1,1,0,0,0,1.41-1.41l-.71-.71a1,1,0,1,0-1.41,1.41Zm12.02,9.9-.71-.71A1,1,0,0,0,16.64,17l.71.71a1,1,0,0,0,1.41-1.41ZM19,12a1,1,0,0,0,1-1h1a1,1,0,0,0,0,2H20A1,1,0,0,0,19,12ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19Zm6.36-11.95a1,1,0,0,0,0-1.41l-.71-.71a1,1,0,0,0-1.41,1.41l.71.71A1,1,0,0,0,18.36,7.05ZM12,7A5,5,0,1,0,17,12,5,5,0,0,0,12,7Z"/>
//                 </svg>
//
//                 <svg className="swap-on w-10 h-10 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg"
//                      viewBox="0 0 24 24">
//                     <path
//                         d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,7.64,2.36,10,10,0,1,0,22,14.36,1,1,0,0,0,21.64,13Z"/>
//                 </svg>
//             </label>
//
//
//             <SearchBar setWeatherData={setWeatherData} setForecastData={setForecastData} setError={setError}/>
//
//             {weatherData && <WeatherDetails weatherData={weatherData} isCelsius={isCelsius}
//                                             toggleUnit={() => setIsCelsius(!isCelsius)}/>}
//             {forecastData && <ForecastCard forecastData={forecastData}/>}
//
//             {error && <p className="mt-4 text-red-400">{error}</p>}
//         </div>
//     );
// }
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import ForecastCard from "./components/ForecastCard";

export default function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [isCelsius, setIsCelsius] = useState(true);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [backgroundImage, setBackgroundImage] = useState("");
    const [showForecast, setShowForecast] = useState(false);

    const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const fetchBackgroundImage = async (query) => {
        try {
            const res = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
                headers: { Authorization: PEXELS_API_KEY },
            });
            const data = await res.json();
            if (data.photos.length > 0) {
                const randomImage = data.photos[Math.floor(Math.random() * data.photos.length)].src.large;
                setBackgroundImage(randomImage);
            }
        } catch (error) {
            console.error("Failed to fetch background image:", error);
        }
    };

    useEffect(() => {
        if (weatherData) {
            const weatherCondition = weatherData.weather[0].description;
            const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(0);
            const tempQuery = temperatureCelsius <= 0 ? "Freezing, Snow, Ice Cold" :
                temperatureCelsius <= 10 ? "Very Cold, Chilly" :
                    temperatureCelsius <= 20 ? "Cool, Mild" :
                        temperatureCelsius <= 30 ? "Warm, Pleasant" :
                            temperatureCelsius <= 40 ? "Hot, Sunny" : "Very Hot, Scorching";
            const query = `${weatherCondition} ${tempQuery} weather sky only`;
            fetchBackgroundImage(query);
        }
    }, [weatherData]);

    const handleKeyDown = (event) => {
        if (event.key === "ArrowRight" && weatherData && forecastData && !showForecast) {
            setShowForecast(true);
        } else if (event.key === "ArrowLeft" && showForecast) {
            setShowForecast(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showForecast, weatherData, forecastData]);

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-100 text-base-content relative"
            style={{
                backgroundImage: backgroundImage
                    ? `url(${backgroundImage})`
                    : "url(https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "background-image 0.5s ease-in-out",
            }}
        >
            <h1 className="text-3xl font-bold mb-6">Weather App 🌦️</h1>

            <label className="swap swap-rotate absolute top-5 right-5">
                <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme}/>

                <svg
                    className="swap-off h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                </svg>

                <svg
                    className="swap-on h-10 w-10 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                </svg>
            </label>

            <SearchBar setWeatherData={setWeatherData} setForecastData={setForecastData} setError={setError}/>

            {weatherData && !showForecast && (
                <WeatherDetails weatherData={weatherData} isCelsius={isCelsius}
                                toggleUnit={() => setIsCelsius(!isCelsius)}/>
            )}

            {forecastData && showForecast && <ForecastCard forecastData={forecastData}/>}

            {error && <p className="mt-4 text-red-400">{error}</p>}

            {weatherData && forecastData && (
                <>
                    {!showForecast && (
                        <button
                            onClick={() => setShowForecast(true)}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    )}
                    {showForecast && (
                        <button
                            onClick={() => setShowForecast(false)}
                            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
