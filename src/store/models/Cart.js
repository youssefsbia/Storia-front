import { Model } from '@vuex-orm/core'
import CartItem from './CartItem'

export default class Cart extends Model {
  static entity = 'carts'

  static fields() {
    return {
      id: this.attr(null),
      userId: this.attr(null),
      products: this.hasMany(CartItem, 'cartId')
    }
  }
}
