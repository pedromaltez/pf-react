import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';
import Products from './Products';
import Product from './Product';
import Checkout from './Checkout';
import { CartContext, useCartState } from './Cart';
import { Toaster } from 'sonner';

function App() {
  const cart = useCartState()

  return (
    <CartContext.Provider value={cart}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </CartContext.Provider>
  );
}

export default App;
