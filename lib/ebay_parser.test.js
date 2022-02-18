const fs = require('fs');
const { parse_items } = require('./ebay_parser');

test('parse_items returns items', () => {
  const content = fs.readFileSync('./lib/index.html').toString();
  const items = parse_items(content);
  expect(items.length).toBe(240);
});

test('parse_item returns an item with valid values', () => {
  const content = fs.readFileSync('./lib/index.html').toString();
  const first = parse_items(content)[0];
  expect(first.soldDate).toStrictEqual(new Date('2022-02-10T06:00:00.000Z'));
  expect(first.link).toBe('https://www.ebay.com/itm/185286705202?epid=15050205088&hash=item2b23f2c032:g:QSoAAOSwl1diAo~b');
  expect(first.title).toBe('ZOTAC GAMING GeForce RTX 3070 Ti AMP Extreme Holo 8GB GDDR6X Graphics Card');
  expect(first.condition).toBe('Pre-Owned');
  expect(first.price).toBe(1075);
  expect(first.shippingPrice).toBe(0);
  expect(first.externalId).toBe('185286705202');
});