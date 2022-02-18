# ebay-parser

This library provides an easy way to parse an ebay HTML page with items.

## Quick start

Add it to your project:

```bash
npm install --save ebay-parser
```

Import as a CommonJS module:

```js
const parser = require('ebay-parser')
```

Use:

```js
const items = parser.parse_items(html); // Array<Item>
```

Data format:

```typescript
type Item {
  soldDate: string;
  link: string;
  title: string;
  condition: string;
  price: number;
  shippingPrice: number;
  externalId: string;
}
```