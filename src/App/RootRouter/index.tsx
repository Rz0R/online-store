import { Route, Routes } from 'react-router-dom';
import Header from '../../Components/Header';
import Main from '../../Pages/Main';
import NotFound from '../../Pages/NotFound';
import Footer from '../../Components/Footer';
import Cart from '../../Pages/Cart';
import ProductDetails from '../../Pages/ProductDetails';

export default function RootRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
