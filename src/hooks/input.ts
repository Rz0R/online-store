import React, { useState } from 'react';
import { IValidations } from '../types/customInput';
import useValidation from './validation';
import { PaymentSystems, ValidationKeys } from '../const/const';

const useInput = (InitialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(InitialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [paymentSystem, setPaymentSystem] = useState('');
  const valid = useValidation(value, validations);

  const definitionPaymentSystem = (cardNumber: string) => {
    switch (cardNumber.slice(0, 1)) {
      case '3':
        setPaymentSystem(PaymentSystems.americanExpress);
        break;
      case '4':
        setPaymentSystem(PaymentSystems.visa);
        break;
      case '5':
        setPaymentSystem(PaymentSystems.mastercard);
        break;
      default:
        setPaymentSystem(PaymentSystems.default);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Object.keys(validations).forEach((key) => {
      if (key === ValidationKeys.cardNumberError) {
        definitionPaymentSystem(e.target.value);
      }
      setValue(e.target.value);
    });
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    isDirty,
    paymentSystem,
    validations,
    onChange,
    onBlur,
    ...valid,
  };
};
export default useInput;
