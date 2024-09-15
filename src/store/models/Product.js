import { Model } from '@vuex-orm/core'

export default class Product extends Model {
  static entity = 'products'

  static fields() {
    return {
      id: this.attr(null),
      title: this.string(''),
      price: this.number(0),
      description: this.string(''),
      category: this.string(''),
      image: this.string('')
    }
  }
}
