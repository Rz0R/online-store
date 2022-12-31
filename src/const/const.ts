import { IValidationErrors } from '../types/customInput';

export enum NameSpace {
  cart = 'CART',
  items = 'ITEMS',
  modal = 'MODAL',
}

export enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum CardView {
  simple = 'SIMPLE',
  tile = 'TILE',
}

export enum SortOptionValues {
  sortTitle = 'sort-title',
  priceASC = 'price-asc',
  priceDESC = 'price-desc',
  raitingASC = 'raiting-asc',
  raitingDESC = 'raiting-desc',
}

export enum ValidationKeys {
  fullNameError = 'fullNameError',
  numberPhoneError = 'numberPhoneError',
  deliveryAddressError = 'deliveryAddressError',
  emailError = 'emailError',
  cardNumberError = 'cardNumberError',
  expiryDateError = 'expiryDateError',
  cvvError = 'cvvError',
}

export enum PaymentSystems {
  americanExpress = 'American Express',
  visa = 'Visa',
  mastercard = 'Mastercard',
  default = 'Default',
}

export const validationErrors: IValidationErrors = {
  fullNameError: 'The field contains at least two words, each at least 3 characters long.',
  numberPhoneError:
    'The field must start with +, contain only numbers, and be at least 9 characters long.',
  deliveryAddressError: 'The field contains at least three words, each at least 5 characters long.',
  emailError: 'The text entered is not an email.',
  cardNumberError: 'The number of digits entered must be exactly 16.',
  expiryDateError: 'The field length must be 4. Month 0-12.',
  cvvError: 'The field length must be 3.',
};

export const URL = 'https://dummyjson.com/products?limit=100';

export const keyLocalStorage = 'online-store-metalknock-rz0r';

export const QUERY_PARAM_DELIMITER = '↕';
