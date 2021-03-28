import {getWeatherByCity} from "./api.js"

const viewElems = {}

const getDOMElem = id => document.getElementById(id)

const connectHTMLElems = () => {
      viewElems.mainContainer = getDOMElem("mainContainer")
      viewElems.weaderSearchView = getDOMElem("weaderSearchView")
      viewElems.weaderForecastView = getDOMElem("weaderForecastView")

      viewElems.searchInput = getDOMElem("searchInput")
      viewElems.searchButton = getDOMElem("searchButton")

      viewElems.weaderCity = getDOMElem("weaderCity")
      viewElems.weaderIcon = getDOMElem("weaderIcon")

      viewElems.weaderCurrentTemp = getDOMElem("weaderCurrentTemp")
      viewElems.weaderMaxTemp = getDOMElem("weaderMaxTemp")
      viewElems.weaderMinTemp = getDOMElem("weaderMaxTemp")

      viewElems.returnToSearchBtn = getDOMElem("returnToSearchBtn")
}

const setupListeners = () => {
      viewElems.searchInput.addEventListener("keydown", onEnterSubmit)    
      viewElems.searchButton.addEventListener("click", onClickSubmit)  
}

const onEnterSubmit = (event) => {
      let query = viewElems.searchInput.value
      if(event.key === 'Enter' && query) {
            getWeatherByCity(query).then()
      }
}
const onClickSubmit = () => {}

 const initializeApp = () => {
      connectHTMLElems()
      setupListeners()
}

document.addEventListener("DOMContentLoaded", initializeApp)