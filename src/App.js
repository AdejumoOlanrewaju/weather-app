import React from "react"

function App() {

   const [search, setSearch] = React.useState({
    value : "",
    
   })

   const [weather, setWeather] = React.useState({})
   const [clock, setClock] = React.useState({
     date : new Date()
   })

  function handleChange(event){
    setSearch({value : event.target.value})
  }

  let url_base = "https://api.openweathermap.org/data/2.5/"
  let api_key = process.env.REACT_APP_API_KEY
  let query = `${search.value}`
  let timer = `${clock}`
 let handleKeyDown = (event) => {
     if(event.key === 'Enter'){
       fetch(`${url_base}weather?q=${query}&units=metric&time=${timer}&appid=${api_key}`)
       .then(res => {
        return (res.json())
       })
       .then (weather => setWeather(weather))

     }

  }

  const time = () => {
    let d = new Date()
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let date = d.getDate()
    let month = months[d.getMonth()]
    let day = days[d.getDay()]
    let year = d.getFullYear()

    return (`${day} ${date} ${month} ${year}`)
  }
 
  
   function clocktime (){
     setInterval(() => {
        setClock({date : new Date()})
     }, 1000)
   }

  return (
    <main className = {typeof weather.main != "undefined" &&  weather.main.temp < 17 ? "cold" : ""}>
      <div className = "search">
        <input  type = "text" 
                className = "search-bar"
                placeholder = "Search..."
                value = {search.value}
                onChange = {handleChange}
                onKeyDown = {handleKeyDown}
               />
      </div>
   {typeof weather.main != "undefined" ?
        <div className = "weather-box">
        <div className = "setting">
          <h1 className = "place">{weather.name} , {weather.sys.country}</h1>
          <h3 className = "date">{time()}</h3>
          <h3 className = "time">{clock.date.toLocaleTimeString()}</h3>
          {clocktime()}
        </div>

        <div className = "temp-box">
          <div className = "temp-container">
           <div className = "temp">{Math.round(weather.main.temp)}°c</div>
          </div>
          <div className = "weather">{weather.weather[0].description}</div>
        </div>
      </div>
       : 
      <h1 style = {{color : "white"}}>Search for places and their weather</h1>}
    </main>
  );
}

export default App;
