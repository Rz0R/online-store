import React, { useState, useEffect } from 'react';
import { IValidations } from '../types/customInput';
import useValidation from './validation';
import { PaymentSystems, ValidationKeys } from '../const/const';

const useInput = (InitialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(InitialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [paymentSystem, setPaymentSystem] = useState('');
  const valid = useValidation(value, validations);
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  // const [cursor, setCursor] = useState({ start: 0, end: 0 });
  // let start: number | null;
  // let end: number | null;

  const removeNonNumberic = (val: string) => val.replace(/[^0-9]/g, '');

  const addSpaces = (valueNonNumberic: string, e: React.ChangeEvent<HTMLInputElement>) => {
    // e.persist();
    // console.log(e);
    // if (inputRef.current) {
    //   // console.log(1);
    //   console.log(inputRef.current.selectionStart);
    //   inputRef.current.selectionEnd = e.target.selectionStart;
    //   // inputRef.current.selectionStart = 1;
    //   // inputRef.current.selectionEnd = 1;
    //   inputRef.current.setSelectionRange(1, 1, 'forward');
    // }

    if (valueNonNumberic.length <= 4) {
      setValue(valueNonNumberic);
    } else if (valueNonNumberic.length <= 8) {
      setValue(`${valueNonNumberic.slice(0, 4)} ${valueNonNumberic.slice(4, 8)}`);
      console.log(e.target.value.length);
      // setCursor({ start: valueNonNumberic.length + 1, end: valueNonNumberic.length + 1 });
    } else if (valueNonNumberic.length <= 12) {
      setValue(
        `${valueNonNumberic.slice(0, 4)} ${valueNonNumberic.slice(4, 8)} ${valueNonNumberic.slice(
          8,
        )}`,
      );
      // setCursor({ start: valueNonNumberic.length + 2, end: valueNonNumberic.length + 2 });
    } else if (valueNonNumberic.length <= 16) {
      setValue(
        `${valueNonNumberic.slice(0, 4)} ${valueNonNumberic.slice(4, 8)} ${valueNonNumberic.slice(
          8,
          12,
        )} ${valueNonNumberic.slice(12)}`,
      );
      // setCursor({ start: valueNonNumberic.length + 3, end: valueNonNumberic.length + 3 });
    } else {
      setValue(value);
    }
    // if (inputRef.current) {
    //   console.log(start, end);
    //   console.log(inputRef.current.selectionEnd);
    //   inputRef.current.setSelectionRange(2, 2, 'forward');
    // }
    // if (inputRef.current) {
    //   const cardValue = inputRef.current.value.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    //   if (cardValue) {
    //     inputRef.current.value = !cardValue[2]
    //       ? cardValue[1]
    //       : `${cardValue[1]}-${cardValue[2]}${`${cardValue[3] ? `-${cardValue[3]}` : ''}`}${`${
    //           cardValue[4] ? `-${cardValue[4]}` : ''
    //         }`}`;
    //     const numbers = inputRef.current.value.replace(/(\D)/g, '');
    //     setValue(numbers);
    //   }
    // }
  };

  const definitionPaymentSystem = (valueNonNumberic: string) => {
    switch (valueNonNumberic.slice(0, 1)) {
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
    const valueNonNumberic = removeNonNumberic(e.target.value);
    // if (e.target.selectionEnd && e.target.selectionStart) {
    //   setCursor({ start: e.target.selectionStart, end: e.target.selectionEnd });
    // }
    e.preventDefault();
    Object.keys(validations).forEach((key) => {
      switch (key) {
        case ValidationKeys.cardNumberError:
          addSpaces(valueNonNumberic, e);
          definitionPaymentSystem(valueNonNumberic);
          break;
        case ValidationKeys.expiryDateError:
          if (valueNonNumberic.length <= 4) {
            // let month = valueNonNumberic.slice(0, 2);
            // if (Number(valueNonNumberic.slice(0, 2)) >= 12) month = '12';
            setValue(
              `${valueNonNumberic.slice(0, 2)}${
                valueNonNumberic.length > 2 ? '/' : ''
              }${valueNonNumberic.slice(2)}`,
            );
          }
          break;
        case ValidationKeys.cvvError:
          if (valueNonNumberic.length <= 3) setValue(valueNonNumberic);
          break;
        default:
          setValue(e.target.value);
      }
    });
  };

  useEffect(() => {
    // if (inputRef.current) {
    //   console.log(cursor.start, cursor.end);
    //   inputRef.current.setSelectionRange(cursor.start, cursor.end, 'forward');
    // }
  }, [value]);

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    paymentSystem,
    inputRef,
    validations,
    ...valid,
  };
};
export default useInput;
