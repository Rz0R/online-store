import React from 'react';

export interface IValidationErrors {
  fullNameError: string;
  numberPhoneError: string;
  deliveryAddressError: string;
  emailError: string;
  cardNumberError: string;
  expiryDateError: string;
  cvvError: string;
}

export interface IValidations {
  fullNameError?: boolean;
  numberPhoneError?: boolean;
  deliveryAddressError?: boolean;
  emailError?: boolean;
  cardNumberError?: boolean;
  expiryDateError?: boolean;
  cvvError?: boolean;
}

export interface IInputData {
  fullNameError: boolean;
  numberPhoneError: boolean;
  deliveryAddressError: boolean;
  emailError: boolean;
  cardNumberError: boolean;
  cvvError: boolean;
  inputValid: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
  paymentSystem: string;
  inputRef: React.RefObject<HTMLInputElement>;
  validations: IValidations;
}
