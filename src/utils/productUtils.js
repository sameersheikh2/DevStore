export const getShortName = (name, maxLength = 50) => {
  if (name.length <= maxLength) return name
  return name.substring(0, maxLength) + '...'
}

export const getStarRating = (rating) => {
  return [...Array(5)].map((_, i) => ({
    filled: i < Math.floor(rating),
    index: i
  }))
}

export const getBadgeInfo = (product) => {
  const badges = []

  if (product.price < 20) {
    badges.push({ text: 'Best Deal', color: 'bg-green-500' })
  }

  if (product.rating >= 4.5) {
    badges.push({ text: 'Top Rated', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' })
  }

  return badges
}

export const getShippingInfo = (price) => {
  return price > 50 ? 'Free shipping' : 'Shipping calculated at checkout'
}