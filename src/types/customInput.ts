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
  value: string;
  isDirty: boolean;
  paymentSystem: string;
  validations: IValidations;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  fullNameError: boolean;
  numberPhoneError: boolean;
  deliveryAddressError: boolean;
  emailError: boolean;
  cardNumberError: boolean;
  cvvError: boolean;
  inputValid: boolean;
}
