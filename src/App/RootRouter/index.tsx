import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/header';
import Main from '../../Pages/Main';
import Footer from '../../Components/footer';
import Cart from '../../Pages/Cart';

export default function RootRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}
