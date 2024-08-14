export function totalAmountWithGST(price: number) {
  const gstAmount = (price * 18) / 100;
  const total = gstAmount + price;
  return total.toFixed(2);
}
