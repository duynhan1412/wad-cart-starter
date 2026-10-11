# Implementation Contract — `cartTotal`

## Objective and scope

Implement and test `cartTotal(items, options)` according to this contract.

Implementation changes are limited to:

- `src/cart.js`
- `test/cart.test.js`

`AI-LOG.md` may be updated separately as assignment evidence under the rules in
`AGENTS.md`. Do not modify other files for this implementation task.

Use plain JavaScript with no external dependencies.

## Public API

Keep the existing named export and function signature:

```js
export function cartTotal(items, options) {
  // implementation
}
```

Do not rename the function, change its parameters, or introduce a default
export.

## Inputs

`items` is an array of objects with:

- `name`: product name.
- `price`: price of one unit.
- `qty`: purchased quantity.

`options` contains:

- `vatRate`: VAT rate applied to the subtotal.
- `freeShipFrom`: subtotal required for free shipping.
- `shipFee`: shipping charge below the threshold.

## Required behaviour

Calculate the subtotal as:

```text
subtotal = sum of (price * qty)
```

Calculate VAT from the subtotal:

```text
VAT = subtotal * vatRate
```

Determine shipping from the subtotal before VAT:

```text
subtotal >= freeShipFrom -> shipping = 0
subtotal < freeShipFrom  -> shipping = shipFee
```

Return `subtotal + VAT + shipping`, rounded to the whole đồng, as a JavaScript
`number`. Do not return a formatted string or the result of `toFixed()`.

An empty `items` array returns `0` with no VAT or shipping charge.

## Error cases

Throw `RangeError` when:

- An item has a negative `price`.
- An item's `qty` is `0`.
- An item's `qty` is negative.
- An item's `qty` is not an integer, such as `1.5`.

The error message is not specified. Do not add validation rules that are not
required by this contract.

## Worked example

```js
const items = [
  { name: 'Áo thun', price: 180000, qty: 2 },
  { name: 'Sổ tay', price: 45000, qty: 1 },
]

const options = {
  vatRate: 0.08,
  freeShipFrom: 500000,
  shipFee: 30000,
}
```

```text
subtotal = 180000 * 2 + 45000 * 1 = 405000
VAT      = 405000 * 0.08          = 32400
shipping = 30000
total    = 405000 + 32400 + 30000 = 467400
```

`cartTotal(items, options)` must return the number `467400`.

## Acceptance tests

Use independent, specification-based tests to cover:

1. The worked example returns `467400` as a number.
2. An empty cart returns `0`.
3. Shipping is free when the subtotal equals `freeShipFrom`.
4. A fractional final total is rounded to the whole đồng.
5. A negative price throws `RangeError`.
6. A quantity of `0` throws `RangeError`.
7. A negative quantity throws `RangeError`.
8. A non-integer quantity such as `1.5` throws `RangeError`.

The implementation is complete when all acceptance tests and `npm test` pass.
