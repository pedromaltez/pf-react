import React, { createContext, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { toast } from 'sonner';

function Cart({ text = 'Browse the items in your cart and then click Checkout', mode = 'browse' }) {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    toast.success('Your order has been placed.');
    clearCart();
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>{text}</p>
      <List>
        {
          cart
            .map(product =>
              <ListItem key={product.id}>
                <ListItemText primary={product.title} secondary={'Quantity: ' + product.quantity} />
              </ListItem>
            )
        }
      </List>
      <div>Total Price: {cart.reduce((n, { price }) => n + price, 0)}</div>
      {mode === 'browse' ? (
        <Button style={{ marginBottom: 10 }} component={Link} to={'/checkout'} variant={'contained'}>Checkout</Button>
      ) : (
        <Button disabled={!cart.length} style={{ marginBottom: 10 }} onClick={handleCheckout} variant={'contained'}>Confirm Order</Button>
      )}
    </div>
  )
}

export function useCartState() {
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const newProduct = { ...product, quantity: 1 };
    setCart([...cart, newProduct]);
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addToCart,
    clearCart,
  };
}

export const CartContext = createContext();
export default Cart;
