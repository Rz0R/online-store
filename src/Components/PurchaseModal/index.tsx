import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import styles from './PurchaseModal.module.scss';
import { closeModal } from '../../store/reducers/modalState';
import useInput from '../../hooks/input';
import CustomInput from '../CustomInput';
import Loader from '../SVG/loader';
import { clearCart } from '../../store/reducers/cartState';

export default function PurchaseModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fullName = useInput('', { fullNameError: false });
  const phoneNumber = useInput('', {
    numberPhoneError: false,
  });
  const address = useInput('', { deliveryAddressError: false });
  const email = useInput('', {
    emailError: false,
  });
  const cardNumber = useInput('', {
    cardNumberError: false,
  });
  const expiryDate = useInput('', {
    expiryDateError: false,
  });
  const cvv = useInput('', {
    cvvError: false,
  });

  const [validForm, setValidFrom] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      fullName.inputValid &&
      phoneNumber.inputValid &&
      address.inputValid &&
      email.inputValid &&
      cardNumber.inputValid &&
      expiryDate.inputValid &&
      cvv.inputValid
    ) {
      setValidFrom(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (validForm === true) {
        dispatch(closeModal());
        dispatch(clearCart());
        navigate('/');
      }
    }, 4000);
  }, [validForm]);

  return (
    <div className={styles.modal}>
      <button
        type="button"
        className={styles.modal__background}
        onClick={() => !validForm && dispatch(closeModal())}
      >
        {}
      </button>
      <form onSubmit={handleSubmit} className={`${styles.modal__form} ${styles.form}`}>
        {validForm && (
          <div className={styles.modalPlaced}>
            <h2 className={styles.modalPlaced__title}>Thanks so much for your order!</h2>
            <Loader className={styles.modalPlaced__loader} />
          </div>
        )}
        <div className={`${styles.form__personalDetails} ${styles.personalDetails}`}>
          <h2 className={styles.personalDetails__title}>Personal details</h2>
          <CustomInput
            name="fullName"
            placeholder="Full Name"
            inputData={fullName}
            className={styles.personalDetails__fullName}
          />
          <CustomInput
            name="phoneNumber"
            placeholder="Phone Number"
            inputData={phoneNumber}
            className={styles.personalDetails__phoneNumber}
          />
          <CustomInput
            name="deliveryAddress"
            placeholder="Delivery Address"
            inputData={address}
            className={styles.personalDetails__address}
          />
          <CustomInput
            name="email"
            placeholder="E-mail"
            inputData={email}
            className={styles.personalDetails__email}
          />
        </div>
        <div className={`${styles.form__cardDetails} ${styles.cardDetails}`}>
          <h2 className={styles.cardDetails__title}>Credit card details</h2>
          <div className={styles.cardDetails__inner}>
            <CustomInput
              name="creditCardNumber"
              placeholder="Credit Card Number"
              inputData={cardNumber}
              className={styles.cardDetails__cardNumber}
            />
            <CustomInput
              name="expiryDate"
              placeholder="Expiry Date(MM/YY)"
              inputData={expiryDate}
              className={styles.cardDetails__expiryDate}
            />
            <CustomInput
              name="cvv"
              placeholder="CVV"
              inputData={cvv}
              className={styles.cardDetails__cvv}
            />
          </div>
        </div>
        <button
          className={styles.form__submit}
          type="submit"
          onClick={() => {
            fullName.onBlur();
            fullName.onBlur();
            phoneNumber.onBlur();
            address.onBlur();
            email.onBlur();
            cardNumber.onBlur();
            expiryDate.onBlur();
            cvv.onBlur();
          }}
        >
          Confirm the order
        </button>
      </form>
    </div>
  );
}
