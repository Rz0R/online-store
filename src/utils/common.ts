export const getPriceWithoutDiscount = (price: number, discount: number): number =>
  Math.ceil((price * 100) / (100 - discount));

export const debounce = (fn: (value: string) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (value: string) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(value), delay);
  };
};

export const getSearchParams = () =>
  Object.fromEntries(new URLSearchParams(window.location.search));
