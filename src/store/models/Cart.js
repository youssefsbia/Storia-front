import { Model } from '@vuex-orm/core'
import CartItem from './CartItem'
import Product from './Product'
export default class Cart extends Model {
  static entity = 'carts'

  static fields() {
    return {
      id: this.attr(null),
      userId: this.attr(null),
      products: this.belongsToMany(Product, CartItem, 'cartId', 'productId')
    }
  }
}
