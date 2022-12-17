export const getPriceWithoutDiscount = (price: number, discount: number): number =>
  Math.ceil((price * 100) / (100 - discount));

// Нужно будет потом удалить, сейчас дообвлено что бы Eslint не ругался
export default getPriceWithoutDiscount;
