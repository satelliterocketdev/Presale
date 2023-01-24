export const getNormalizedPriceString = (value: number) => {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};

export const getDiscountedPrice = (marketPrice: number, discountRatio: number) => {
  return `$` + (marketPrice * (100 - discountRatio) / 100).toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}