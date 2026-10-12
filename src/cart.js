export function cartTotal(items, options) {
  if (items.length === 0) {
    return 0
  }

  let subtotal = 0

  for (const item of items) {
    if (item.price < 0) {
      throw new RangeError('price must not be negative')
    }

    if (!Number.isInteger(item.qty) || item.qty <= 0) {
      throw new RangeError('quantity must be a positive integer')
    }

    subtotal += item.price * item.qty
  }

  const vat = subtotal * options.vatRate
  const shipping = subtotal >= options.freeShipFrom ? 0 : options.shipFee

  return Math.round(subtotal + vat + shipping)
}
