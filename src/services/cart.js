import instance from './instance'

export const getCart = async (cartId) => {
  return instance.get(`/cart/${cartId}`)
}

export const addToCart = async (cartId, payload) => {
  return instance.post('/cart', payload)
}

export const updateCart = async (cartId, payload) => {
  return instance.put(`/cart/${cartId}`, payload)
}
