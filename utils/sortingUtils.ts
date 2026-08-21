// utils/sortingUtils.ts

export function isSortedAZ(strings: string[]): boolean {
  for (let i = 0; i < strings.length - 1; i++) {
    if (strings[i].localeCompare(strings[i + 1]) > 0) {
      return false;
    }
  }
  return true;
}

export function isSortedZA(strings: string[]): boolean {
  for (let i = 0; i < strings.length - 1; i++) {
    if (strings[i].localeCompare(strings[i + 1]) < 0) {
      return false;
    }
  }
  return true;
}

export function isSortedPriceLowToHigh(prices: string[]): boolean {
  if (prices.length <= 1) return true;

  let prevPrice = parseFloat(prices[0].replace(/[^0-9.-]+/g, ""));
  if (isNaN(prevPrice)) return false;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = parseFloat(prices[i].replace(/[^0-9.-]+/g, ""));
    if (isNaN(currentPrice)) return false;
    if (prevPrice > currentPrice) return false;
    prevPrice = currentPrice;
  }
  
  return true;
}

export function isSortedPriceHighToLow(prices: string[]): boolean {
  if (prices.length <= 1) return true;

  let prevPrice = parseFloat(prices[0].replace(/[^0-9.-]+/g, ""));
  if (isNaN(prevPrice)) return false;

  for (let i = 1; i < prices.length; i++) {
    const currentPrice = parseFloat(prices[i].replace(/[^0-9.-]+/g, ""));
    if (isNaN(currentPrice)) return false;
    if (prevPrice < currentPrice) return false;
    prevPrice = currentPrice;
  }
  
  return true;
}