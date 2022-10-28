const getPageYOffset = () => {
  const { pageYOffset: position } = window;
  return position
}

export const setPageYOffset = () => {
  sessionStorage.setItem('position', getPageYOffset())
}

export const getPositionFromStorage = () => {
  return Number(sessionStorage.getItem('position'))
}

export const resetPosition = () => {
  sessionStorage.setItem('position', 0)
}