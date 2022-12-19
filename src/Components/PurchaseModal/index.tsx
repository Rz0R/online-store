import { useAppDispatch } from '../../hooks/redux';
import styles from './PurchaseModal.module.scss';
import { closeModal } from '../../store/reducers/modalState';
import useInput from '../../hooks/input';
import CustomInput from '../CustomInput';

export default function PurchaseModal() {
  const dispatch = useAppDispatch();

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

  return (
    <div className={styles.modal}>
      <button
        type="button"
        className={styles.modal__background}
        onClick={() => dispatch(closeModal())}
      >
        {}
      </button>

      <form className={`${styles.modal__form} ${styles.form}`}>
        <div className={`${styles.form__personalDetails} ${styles.personalDetails}`}>
          <h2 className={styles.personalDetails__title}>Personal details</h2>
          <CustomInput name="fullName" placeholder="Full Name" inputData={fullName} />
          <CustomInput name="phoneNumber" placeholder="Phone Number" inputData={phoneNumber} />
          <CustomInput name="deliveryAddress" placeholder="Delivery Address" inputData={address} />
          <CustomInput name="email" placeholder="E-mail" inputData={email} />
        </div>
        <div className={`${styles.form__cardDetails} ${styles.cardDetails}`}>
          <h2 className={styles.cardDetails__title}>Credit card details</h2>
          <CustomInput
            name="creditCardNumber"
            placeholder="Credit Card Number"
            inputData={cardNumber}
          />

          <input className={styles.cardDetails__name} type="text" placeholder="Cardholder Name" />
          <input
            className={styles.cardDetails__date}
            type="text"
            placeholder="Expiry Date(MM/YY)"
          />
          <input className={styles.cardDetails__cvv} type="text" placeholder="CVV" />
        </div>
        <button className={styles.form__submit} type="submit">
          Confirm the order
        </button>
        {!(
          fullName.inputValid &&
          phoneNumber.inputValid &&
          address.inputValid &&
          email.inputValid &&
          cardNumber.inputValid
        ) && <div> no valid</div>}
        <button type="button" onClick={() => dispatch(closeModal())}>
          X
        </button>
      </form>
    </div>
  );
}
