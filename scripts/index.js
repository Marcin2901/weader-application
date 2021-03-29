import {getWeatherByCity} from "./api.js"
import {mapListToDOMElmements} from "./DOMActions.js"
class WeatherApp {
      constructor() {
            this.viewElems = {}
            this.connectDOMElements()
            this.setupListeners()
      }

      connectDOMElements = () => {
            const listOfId = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id)
            this.viewElems = mapListToDOMElmements(listOfId)
      }

      setupListeners = () => {
            this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit)
            this.viewElems.searchButton.addEventListener('click', this.handleSubmit)
            this.viewElems.returnToSearchBtn.addEventListener('click', this.handleSubmit)
      }

      handleSubmit = (event) => {
            if(event.type === "click" || event.key === "Enter") {
                  let query = this.viewElems.searchInput.value
                  this.fadeInOut()
                  getWeatherByCity(query).then(data => {
                      this.displayWeatherData(data)
                  }).catch(() => {
                        this.displayError()
                  })
            }
      }

      fadeInOut = () => {
            if(this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
                  this.viewElems.mainContainer.style.opacity = '0'
            } else {
                  this.viewElems.mainContainer.style.opacity = '1'
            }
      }

      switchView = () => {
            if(this.viewElems.weaderSearchView.style.display !== "none") {
                  this.viewElems.weaderSearchView.style.display = "none"
                  this.viewElems.weaderForecastView.style.display = "block"
            } else {
                  this.viewElems.weaderSearchView.style.display = "flex"
                  this.viewElems.weaderForecastView.style.display = "none"
            }
      }

      returnToSearch = () => {
            this.fadeInOut()
            setTimeout(() => {
                  this.fadeInOut()
                  this.switchView()
                  this.viewElems.searchInput.value = ''
            }, 500)
      }

      displayWeatherData = (data) => {
            this.switchView()
            this.fadeInOut()
      
            const weather = data.consolidated_weather[0]
      
            this.viewElems.weaderCity.textContent = data.title
            this.viewElems.weaderIcon.src = `https://www.metaweather.com/static/img/weather/png/${weather.weather_state_abbr}.png`
            this.viewElems.weaderIcon.alt = weather.weather_state_name
      
            const currentTemp = weather.the_temp.toFixed(2)
            const maxTemp = weather.max_temp.toFixed(2)
            const minTemp = weather.min_temp.toFixed(2)
      
            this.viewElems.weaderCurrentTemp.textContent = `Current temperature:  `
            const spanTemp = document.createElement('span')
            spanTemp.classList.add('current-temp-span')
            spanTemp.textContent = `${currentTemp}°C`
            this.viewElems.weaderCurrentTemp.appendChild(spanTemp)
            this.viewElems.weaderMaxTemp.innerText = `Max temperature: ${maxTemp}°C`
            this.viewElems.weaderMinTemp.innerText = `Min temperature: ${minTemp}°C`
      }

      displayError = () => {
            this.fadeInOut()
            viewElems.searchInput.style.color = 'red'
            viewElems.searchInput.value = "no data available"
            setTimeout(() => {
                  viewElems.searchInput.style.color = 'black'
                  viewElems.searchInput.value = ""
            }, 2000)
      }
}
 
document.addEventListener("DOMContentLoaded", new WeatherApp)

// const viewElems = {}

// const getDOMElem = id => document.getElementById(id)

// const connectHTMLElems = () => {
//       viewElems.mainContainer = getDOMElem("mainContainer")
//       viewElems.weaderSearchView = getDOMElem("weaderSearchView")
//       viewElems.weaderForecastView = getDOMElem("weaderForecastView")

//       viewElems.searchInput = getDOMElem("searchInput")
//       viewElems.searchButton = getDOMElem("searchButton")

//       viewElems.weaderCity = getDOMElem("weaderCity")
//       viewElems.weaderIcon = getDOMElem("weaderIcon")

//       viewElems.weaderCurrentTemp = getDOMElem("weaderCurrentTemp")
//       viewElems.weaderMaxTemp = getDOMElem("weaderMaxTemp")
//       viewElems.weaderMinTemp = getDOMElem("weaderMinTemp")

//       viewElems.returnToSearchBtn = getDOMElem("returnToSearchBtn")
// }

// const setupListeners = () => {
//       viewElems.searchInput.addEventListener("keydown", onEnterSubmit)    
//       viewElems.searchButton.addEventListener("click", onClickSubmit)  
//       viewElems.returnToSearchBtn.addEventListener("click", returnToSearch)
// }

// const onEnterSubmit = (event) => {
//       let query = viewElems.searchInput.value
//       if(event.key === 'Enter' ) {   
//             fadeInOut()
//             getWeatherByCity(query).then(data => {
//                 displayWeatherData(data)
//             }).catch(() => {
//                   displayError()
//             })
//       }
// }
// const onClickSubmit = () => {
//       fadeInOut()
//       let query = viewElems.searchInput.value
//       getWeatherByCity(query).then(data => {
//             displayWeatherData(data)
//       }).catch(() => {
//             displayError()
//       }) 
// }

// const fadeInOut = () => {
//       if(viewElems.mainContainer.style.opacity === '1' || viewElems.mainContainer.style.opacity === '') {
//             viewElems.mainContainer.style.opacity = '0'
//       } else {
//             viewElems.mainContainer.style.opacity = '1'
//       }
// }

// const switchView = () => {
//       if(viewElems.weaderSearchView.style.display !== "none") {
//             viewElems.weaderSearchView.style.display = "none"
//             viewElems.weaderForecastView.style.display = "block"
//       } else {
//             viewElems.weaderSearchView.style.display = "flex"
//             viewElems.weaderForecastView.style.display = "none"
//       }
// }

// const returnToSearch = () => {
//       fadeInOut()
//       setTimeout(() => {
//             fadeInOut()
//             switchView()
//             viewElems.searchInput.value = ''
//       }, 500)
// }

// const displayWeatherData = (data) => {
//       switchView()
//       fadeInOut()

//       const weather = data.consolidated_weather[0]

//       viewElems.weaderCity.textContent = data.title
//       viewElems.weaderIcon.src = `https://www.metaweather.com/static/img/weather/png/${weather.weather_state_abbr}.png`
//       viewElems.weaderIcon.alt = weather.weather_state_name

//       const currentTemp = weather.the_temp.toFixed(2)
//       const maxTemp = weather.max_temp.toFixed(2)
//       const minTemp = weather.min_temp.toFixed(2)

//       viewElems.weaderCurrentTemp.textContent = `Current temperature:  `
//       const spanTemp = document.createElement('span')
//       spanTemp.classList.add('current-temp-span')
//       spanTemp.textContent = `${currentTemp}°C`
//       viewElems.weaderCurrentTemp.appendChild(spanTemp)
//       viewElems.weaderMaxTemp.innerText = `Max temperature: ${maxTemp}°C`
//       viewElems.weaderMinTemp.innerText = `Min temperature: ${minTemp}°C`
// }

// const displayError = () => {
//       fadeInOut()
//       viewElems.searchInput.style.color = 'red'
//       viewElems.searchInput.value = "no data available"
//       setTimeout(() => {
//             viewElems.searchInput.style.color = 'black'
//             viewElems.searchInput.value = ""
//       }, 2000)
// }

//  const initializeApp = () => {
//       connectHTMLElems()
//       setupListeners()

// }

// document.addEventListener("DOMContentLoaded", initializeApp)