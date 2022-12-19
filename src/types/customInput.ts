import React from 'react';

export interface IValidationErrors {
  fullNameError: string;
  numberPhoneError: string;
  deliveryAddressError: string;
  emailError: string;
  cardNumberError: string;
}

export interface IValidations {
  fullNameError?: boolean;
  numberPhoneError?: boolean;
  deliveryAddressError?: boolean;
  emailError?: boolean;
  cardNumberError?: boolean;
}

export interface IInputData {
  fullNameError: boolean;
  numberPhoneError: boolean;
  deliveryAddressError: boolean;
  emailError: boolean;
  cardNumberError: boolean;
  inputValid: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
  validations: IValidations;
}
