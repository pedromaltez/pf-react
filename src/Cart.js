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
  const { cart, clearCart, subtotal, total } = useContext(CartContext);

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
      <div>Subtotal: £{subtotal}</div>
      <div>Total (after discounts): £{total}</div>
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

  function addToCart(newProduct) {
    const productInBasket = cart.find(({ id }) => id === newProduct.id);
    if (productInBasket) {
      const newCart = cart.map(product => {
        if (product.id === newProduct.id) {
          const newQuantity = product.quantity + 1;
          toast.success(`Updated quantity of ${product.title} to ${newQuantity}.`)
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      })
      setCart([...newCart]);
    } else {
      toast.success(`Added ${newProduct.title} to cart.`)
      setCart([...cart, { ...newProduct, quantity: 1 }]);
    }
  }

  function clearCart() {
    setCart([]);
  }

  const subtotal = cart.reduce((n, { price, quantity }) => n + price * quantity, 0).toFixed(2);
  const total = cart.reduce(
    (n, { price, quantity, discountPercentage }) =>
      (n + price * (100 - discountPercentage) / 100 * quantity)
    , 0).toFixed(2);

  return {
    cart,
    addToCart,
    clearCart,
    subtotal,
    total,
  };
}

export const CartContext = createContext();
export default Cart;
