const sortLToH = (array) => {
    const sorted = [...array].sort((a, b) => (
      a.attributes.Price - b.attributes.Price
    ))
    
    return sorted
  }

const sortHToL = (array) => {
    const sorted = [...array].sort((a, b) => (
      b.attributes.Price - a.attributes.Price
    ))

    return sorted
  }

const sortZToA = (array) => {
    const sorted = [...array].sort((a, b) => {
      if (a.attributes.Name < b.attributes.Name) return 1
      if (a.attributes.Name > b.attributes.Name) return -1
      return 0
    })

    return sorted
  }

const sortAToZ = (array) => {
    const sorted = [...array].sort((a, b) => {
      if (a.attributes.Name < b.attributes.Name) return -1
      if (a.attributes.Name > b.attributes.Name) return 1
      return 0
    })

    return sorted
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { sortLToH, sortHToL, sortZToA, sortAToZ }