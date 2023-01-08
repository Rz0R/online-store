import { useState, useEffect } from 'react';
import { IValidations } from '../types/customInput';
import { ValidationKeys } from '../const/const';

const useValidation = (value: string, validations: IValidations) => {
  const [fullNameError, setFullNameError] = useState(false);
  const [numberPhoneError, setNumberPhoneError] = useState(false);
  const [deliveryAddressError, setDeliveryAddressError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expiryDateError, setExpiryDateError] = useState(false);
  const [cvvError, setCvvError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    Object.keys(validations).forEach((key) => {
      const thisDate = new Date();
      const thisMonth = thisDate.getMonth() + 1;
      const thisYear = Number(String(thisDate.getFullYear()).slice(-2));
      switch (key) {
        case ValidationKeys.fullNameError:
          if (/.{3,}\s+.{3,}/gm.test(value)) {
            setFullNameError(false);
          } else {
            setFullNameError(true);
          }
          break;
        case ValidationKeys.numberPhoneError:
          if (/^[+]\d{9,}$/gm.test(value)) {
            setNumberPhoneError(false);
          } else {
            setNumberPhoneError(true);
          }
          break;
        case ValidationKeys.deliveryAddressError:
          if (/.{5,}\s+.{5,}\s+.{5,}/gm.test(value)) {
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
          if (/[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}/gm.test(value)) {
            setCardNumberError(false);
          } else {
            setCardNumberError(true);
          }
          break;
        case ValidationKeys.expiryDateError:
          if (
            /[0-9]{2}\/[0-9]{2}/gm.test(value) &&
            Number(value.slice(0, 2)) <= 12 &&
            Number(value.slice(0, 2)) >= thisMonth &&
            Number(value.slice(-2)) >= thisYear
          ) {
            setExpiryDateError(false);
          } else {
            setExpiryDateError(true);
          }
          break;
        case ValidationKeys.cvvError:
          if (/[0-9]{3}/gm.test(value)) {
            setCvvError(false);
          } else {
            setCvvError(true);
          }
          break;
        default:
      }
    });
  }, [value]);

  useEffect(() => {
    if (
      fullNameError ||
      numberPhoneError ||
      deliveryAddressError ||
      emailError ||
      cardNumberError ||
      expiryDateError ||
      cvvError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    fullNameError,
    numberPhoneError,
    deliveryAddressError,
    emailError,
    cardNumberError,
    expiryDateError,
    cvvError,
  ]);

  return {
    fullNameError,
    numberPhoneError,
    deliveryAddressError,
    emailError,
    cardNumberError,
    expiryDateError,
    cvvError,
    inputValid,
  };
};

export default useValidation;
