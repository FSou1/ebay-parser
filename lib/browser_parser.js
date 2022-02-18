function parse_items(document) {
  const item_selector = '.srp-results .s-item';

  const items = [...document.querySelectorAll(item_selector)];

  return items.map(parse_item);
}

function parse_item(item) {
  return [
    getSoldDate(item),
    getLink(item),
    getTitle(item),
    getCondition(item),
    getPrice(item),
    getShipping(item),
    getItemId(item)
  ];
}

function getItemId(item) {
  const link = getLink(item);

  return link.match(/itm\/([0-9]*)/)[1];
}

function getShipping(item) {
  const text = getShippingText(item);

  if (text === 'Free shipping') {
    return '$0.00';
  }

  return text.match(/(\$[0-9]*\.[0-9]*)/g)[0];
}

function getShippingText(item) {
  return item.querySelector('.s-item__shipping').innerText;
}

function getPrice(item) {
  return item.querySelector('.s-item__price .POSITIVE').innerText;
}

function getCondition(item) {
  return item.querySelector('.s-item__subtitle .SECONDARY_INFO').innerText;
}

function getTitle(item) {
  const text = getTitleText(item);

  return text
    .replace(/New Listing/gi, '')
    .replace(/"/g, '\'');
}

function getTitleText(item) {
  return item.querySelector('.s-item__title').innerText;
}

function getSoldDate(item) {
  const text = getSoldText(item).replace('Sold ', '');

  return new Date(text);
}

function getSoldText(item) {
  return item.querySelector('.s-item__title--tag span.POSITIVE').innerText;
}

function getLink(item) {
  return item.querySelector('.s-item__link').href;
}

module.exports = {
  parse_items
};