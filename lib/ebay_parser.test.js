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
  expect(first.soldDate).toStrictEqual('2022-02-18');
  expect(first.link).toBe('https://www.ebay.com/itm/224844936430?epid=27044245761&hash=item3459cd74ee:g:ky0AAOSw-q5h-X-g');
  expect(first.title).toBe('ZOTAC NVIDIA GeForce RTX 3070 Amp Holo 8GB - NON LHR');
  expect(first.condition).toBe('Pre-Owned');
  expect(first.price).toBe(1050);
  expect(first.shippingPrice).toBe(0);
  expect(first.externalId).toBe('224844936430');
});