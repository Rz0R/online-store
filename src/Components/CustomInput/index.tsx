import { validationErrors } from '../../const/const';
import { IValidationErrors, IInputData } from '../../types/customInput';
import styles from './CustomInput.module.scss';

interface CustomInputProps {
  name: string;
  placeholder: string;
  inputData: IInputData;
}

export default function CustomInput({ name, placeholder, inputData }: CustomInputProps) {
  return (
    <>
      {Object.keys(inputData.validations).map(
        (key) =>
          inputData.isDirty &&
          inputData[key as keyof IInputData] && (
            <div key={key}>{validationErrors[key as keyof IValidationErrors]}</div>
          ),
      )}
      <input
        className={styles.personalDetails__fullName}
        type="text"
        name={name}
        placeholder={placeholder}
        value={inputData.value}
        onBlur={inputData.onBlur}
        onChange={inputData.onChange}
      />
    </>
  );
}
