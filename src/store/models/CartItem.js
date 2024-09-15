import { Model } from '@vuex-orm/core'

export default class CartItem extends Model {
  static entity = 'cartItems'

  static fields() {
    return {
      id: this.attr(null),
      cartId: this.attr(null),
      productId: this.attr(null),
      quantity: this.number(0)
    }
  }
}
