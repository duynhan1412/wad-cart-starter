import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

function createWorkedExampleItems() {
  return [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
}

function createOptions(overrides = {}) {
  return {
    vatRate: 0.08,
    freeShipFrom: 500000,
    shipFee: 30000,
    ...overrides,
  }
}

test('the worked example returns 467400', () => {
  const total = cartTotal(createWorkedExampleItems(), createOptions())

  assert.equal(total, 467400)
})

test('the returned total is a number', () => {
  const total = cartTotal(createWorkedExampleItems(), createOptions())

  assert.equal(typeof total, 'number')
})

test('an empty cart returns 0', () => {
  const total = cartTotal([], createOptions())

  assert.equal(total, 0)
})

test('shipping is free at the exact threshold', () => {
  const items = [{ name: 'Balo', price: 250000, qty: 2 }]
  const total = cartTotal(items, createOptions())

  assert.equal(total, 540000)
})

test('shipping threshold uses the subtotal before VAT', () => {
  const items = [{ name: 'Vali', price: 490000, qty: 1 }]
  const total = cartTotal(items, createOptions())

  assert.equal(total, 559200)
})

test('a fractional final total is rounded to the whole đồng', () => {
  const items = [{ name: 'Bút', price: 100, qty: 1 }]
  const options = createOptions({
    vatRate: 0.085,
    freeShipFrom: 1000,
    shipFee: 0,
  })

  assert.equal(cartTotal(items, options), 109)
})

test('a negative price throws RangeError', () => {
  const items = [{ name: 'Invalid price', price: -1, qty: 1 }]

  assert.throws(() => cartTotal(items, createOptions()), RangeError)
})

test('a quantity of 0 throws RangeError', () => {
  const items = [{ name: 'Zero quantity', price: 100, qty: 0 }]

  assert.throws(() => cartTotal(items, createOptions()), RangeError)
})

test('a negative quantity throws RangeError', () => {
  const items = [{ name: 'Negative quantity', price: 100, qty: -1 }]

  assert.throws(() => cartTotal(items, createOptions()), RangeError)
})

test('a non-integer quantity throws RangeError', () => {
  const items = [{ name: 'Fractional quantity', price: 100, qty: 1.5 }]

  assert.throws(() => cartTotal(items, createOptions()), RangeError)
})
