import instance from './instance'

export const getLimitProducts = async (limit) => {
  return instance.get(`/products?limit=${limit}`)
}

export const getProducts = async () => {
  return instance.get('/products')
}

export const getProduct = async (id) => {
  return instance.get(`/products/${id}`)
}
