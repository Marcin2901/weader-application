const _getDOMElem = id => document.getElementById(id)

export const mapListToDOMElmements = (listOfId) => {
      const _viewElem = {}

      for(let id of listOfId) {
            _viewElem[id] = _getDOMElem(id)
      }

      return _viewElem
}