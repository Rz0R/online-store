import { PaymentSystems, validationErrors } from '../../const/const';
import { IValidationErrors, IInputData } from '../../types/customInput';
import styles from './CustomInput.module.scss';
import { AmericanExpress, Default, MasterCard, Visa } from '../SVG/paymentSystems';
import Warning from '../SVG/warning';

interface CustomInputProps {
  name: string;
  placeholder: string;
  inputData: IInputData;
  className: string;
}

const renderPaymentSystem = (paymentSystem: string) => {
  switch (paymentSystem) {
    case PaymentSystems.visa:
      return <Visa className={styles.customInput__cardLogo} />;
    case PaymentSystems.mastercard:
      return <MasterCard className={styles.customInput__cardLogo} />;
    case PaymentSystems.americanExpress:
      return <AmericanExpress className={styles.customInput__cardLogo} />;
    case PaymentSystems.default:
      return <Default className={styles.customInput__cardLogo} />;
    default:
  }
  return '';
};

export default function CustomInput({ name, placeholder, inputData, className }: CustomInputProps) {
  return (
    <>
      <div className={`${styles.customInput__wrapper} ${className}`}>
        <input
          ref={inputData.inputRef}
          className={`${styles.customInput__input} `}
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          value={inputData.value}
          onBlur={inputData.onBlur}
          onChange={inputData.onChange}
        />
        <label className={`${styles.customInput__label} ${styles.label}`} htmlFor={name}>
          {inputData.isDirty && !inputData.inputValid && (
            <Warning className={styles.label__warning} />
          )}
          <ul className={styles.label__errorList}>
            {Object.keys(inputData.validations).map(
              (key) =>
                inputData.isDirty &&
                inputData[key as keyof IInputData] && (
                  <div key={key} className={styles.label__error}>
                    {validationErrors[key as keyof IValidationErrors]}
                  </div>
                ),
            )}
          </ul>
        </label>
      </div>
      {inputData.paymentSystem && (
        <div className={styles.customInput__paymentSystem}>
          {renderPaymentSystem(inputData.paymentSystem)}
        </div>
      )}
    </>
  );
}
