import instance from './api'

export const getCart = async (cartId) => {
  return instance.get(`/carts/${cartId}`)
}

export const addToCart = async (cartId, payload) => {
  return instance.post('/carts', payload)
}

export const updateCart = async (cartId, payload) => {
  return instance.patch(`/carts/${cartId}`, payload)
}
