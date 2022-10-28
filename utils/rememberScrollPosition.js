const getPageYOffset = () => {
  const { pageYOffset: position } = window;
  return position
}

export const setPageYOffset = () => {
  sessionStorage.setItem('position', getPageYOffset())
}

export const getPositionFromStorage = () => {
  return sessionStorage.getItem('position')
}

export const resetPosition = () => {
  sessionStorage.removeItem('position')
}