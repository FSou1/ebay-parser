const dayjs = require('dayjs');
const { parse } = require('node-html-parser');
const { parse_money } = require('./currency');

function parse_items(html) {
  const item_selector = '.srp-results .s-item';

  const document = parse(html);

  const items = [...document.querySelectorAll(item_selector)];

  return items.map(parse_item);
}

function parse_item(item) {
  return {
    soldDate: getSoldDate(item),
    link: getLink(item),
    title: getTitle(item),
    condition: getCondition(item),
    price: getPrice(item),
    shippingPrice: getShippingPrice(item),
    externalId: getItemId(item)
  };
}

function getItemId(item) {
  const link = getLink(item);

  return link.match(/itm\/([0-9]*)/)[1];
}

function getShippingPrice(item) {
  const text = getShippingText(item);

  try {
    if (text === 'Free shipping' || text === 'Shipping not specified') {
      return 0;
    }

    const match = text?.match(/(\$[0-9].[0-9]*)/g)[0];
    if(!match) {
      return 0;
    }

    return parse_money(match);
  } catch(err) {
    throw new Error(`Parsing error: shipping value '${text}'`);
  }
}

function getShippingText(item) {
  return item.querySelector('.s-item__shipping')?.text;
}

function getPrice(item) {
  return parse_money(item.querySelector('.s-item__price .POSITIVE').text);
}

function getCondition(item) {
  return item.querySelector('.s-item__subtitle .SECONDARY_INFO').text;
}

function getTitle(item) {
  return getTitleText(item).getAttribute('alt');
}

function getTitleText(item) {
  return item.querySelector('.s-item__image-img');
}

function getSoldDate(item) {
  const text = getSoldText(item).replace('Sold ', '');

  return dayjs(text).format('YYYY-MM-DD');
}

function getSoldText(item) {
  return item.querySelector('.s-item__title--tag span.POSITIVE').text;
}

function getLink(item) {
  return item.querySelector('.s-item__link').attributes['href'];
}

module.exports = {
  parse_items
};