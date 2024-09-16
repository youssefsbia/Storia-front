import { Model } from '@vuex-orm/core'
import Product from './Product'
import Cart from './Cart'

export default class CartItem extends Model {
  static entity = 'cartItems'

  static fields() {
    return {
      id: this.attr(null),
      cartId: this.attr(null),
      productId: this.attr(null),
      quantity: this.number(1),
      product: this.belongsTo(Product, 'productId'),
      cart: this.belongsTo(Cart, 'cartId')
    }
  }
}
