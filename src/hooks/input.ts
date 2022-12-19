import React, { useState } from 'react';
import { IValidations } from '../types/customInput';
import useValidation from './validation';

const useInput = (InitialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(InitialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    validations,
    ...valid,
  };
};
export default useInput;
