const currencyFormat = (
  number?: number | string,
  locale = 'AU-en',
  currency = 'AUD',
): string => {
  if (!number) {
    return '';
  }

  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
  }).format(parseFloat(number.toString()));
  return `$${result.replace(/[a-z]{3}/i, '').trim()}`;
};
export default currencyFormat;
