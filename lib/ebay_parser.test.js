const fs = require('fs');
const { parse_items } = require('./ebay_parser');

test('parse_items returns items from the sold page', () => {
  const content = fs.readFileSync('./lib/sold.html').toString();
  const items = parse_items(content);
  expect(items.length).toBe(240);
});

test('parse_item returns a sold item with valid values', () => {
  const content = fs.readFileSync('./lib/sold.html').toString();
  const first = parse_items(content)[0];
  expect(first.soldDate).toStrictEqual('2022-02-18');
  expect(first.link).toBe('https://www.ebay.com/itm/224844936430?epid=27044245761&hash=item3459cd74ee:g:ky0AAOSw-q5h-X-g');
  expect(first.title).toBe('ZOTAC NVIDIA GeForce RTX 3070 Amp Holo 8GB - NON LHR');
  expect(first.condition).toBe('Pre-Owned');
  expect(first.price).toBe(1050);
  expect(first.shippingPrice).toBe(0);
  expect(first.externalId).toBe('224844936430');
});

test('parse_item returns items from the auction page', () => {
  const content = fs.readFileSync('./lib/auction.html').toString();
  const items = parse_items(content);
  expect(items.length).toBe(60);
});

test('parse_item returns an auctioned item with valid values', () => {
  const content = fs.readFileSync('./lib/auction.html').toString();
  const first = parse_items(content)[0];
  expect(first.link).toBe('https://www.ebay.com/itm/354077721939?epid=2314776097&hash=item5270ad4553%3Ag%3A340AAOSwVLdihVzo&LH_Auction=1&LH_ItemCondition=1000');
  expect(first.title).toBe('MSI Radeon RX 6800 XT GAMING X TRIO 16G GDDR6 Graphics Card');
  expect(first.condition).toBe('Brand New');
  expect(first.price).toBe(720);
  expect(first.shippingPrice).toBe(35);
  expect(first.externalId).toBe('354077721939');
  expect(first.timeLeft).toBe('24m left');
  expect(first.bids).toBe('1 bid');
});