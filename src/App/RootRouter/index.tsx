import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import Main from '../../Pages/Main';
import Footer from '../../Components/footer';
import Cart from '../../Pages/Cart';
import PurchaseModal from '../../Components/PurchaseModal';
import { useAppSelector } from '../../hooks/redux';

export default function RootRouter() {
  const { isOpen } = useAppSelector((state) => state.MODAL);

  return (
    <>
      {isOpen && <PurchaseModal />}
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}
