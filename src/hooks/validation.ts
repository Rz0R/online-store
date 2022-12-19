import { useState, useEffect } from 'react';
import { IValidations } from '../types/customInput';
import { ValidationKeys } from '../const/const';

const useValidation = (value: string, validations: IValidations) => {
  const [fullNameError, setFullNameError] = useState(false);
  const [numberPhoneError, setNumberPhoneError] = useState(false);
  const [deliveryAddressError, setDeliveryAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    Object.keys(validations).forEach((key) => {
      switch (key) {
        case ValidationKeys.fullNameError:
          if (/\w{3,}\s+\w{3,}/gm.test(value)) {
            setFullNameError(false);
          } else {
            setFullNameError(true);
          }
          break;
        case ValidationKeys.numberPhoneError:
          if (/^[+]\d{8,}/gm.test(value)) {
            setNumberPhoneError(false);
          } else {
            setNumberPhoneError(true);
          }
          break;
        case ValidationKeys.deliveryAddressError:
          if (/\w{5,}\s+\w{5,}\s+\w{5,}/gm.test(value)) {
            setDeliveryAddressError(false);
          } else {
            setDeliveryAddressError(true);
          }
          break;
        case ValidationKeys.emailError:
          if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm.test(value)) {
            setEmailError(false);
          } else {
            setEmailError(true);
          }
          break;
        case ValidationKeys.cardNumberError:
          if (/[0-9]{16}/gm.test(value)) {
            setCardNumberError(false);
          } else {
            setCardNumberError(true);
          }
          break;
        default:
          break;
      }
    });
  }, [value]);

  useEffect(() => {
    if (
      fullNameError ||
      numberPhoneError ||
      deliveryAddressError ||
      emailError ||
      cardNumberError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [fullNameError, numberPhoneError, deliveryAddressError, emailError, cardNumberError]);

  return {
    fullNameError,
    numberPhoneError,
    deliveryAddressError,
    emailError,
    cardNumberError,
    inputValid,
  };
};

export default useValidation;
