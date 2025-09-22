export const scrollToTopInstant = () => {
  window.scrollTo(0, 0)
}

export const scrollToTopSmooth = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export const navigateWithScroll = (navigate, path) => {
  navigate(path)
  scrollToTopInstant()
}

export const goBack = (navigate) => {
  navigate(-1)
  scrollToTopInstant()
}