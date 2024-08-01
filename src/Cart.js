import React from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

function Cart({ products = [], text='Browse the items in your cart and then click Checkout', mode='browse' }) {
    return (
        <div>
            <h1>Shopping Cart</h1>
            <p>{text}</p>
            <List>
                {
                    products
                        .map(product =>
                            <ListItem>
                                <ListItemText primary={product.title} secondary={'Quantity: ' + product.quantity}/>
                            </ListItem>
                        )
                }
            </List>
            <div>Total Price: {products.reduce((n, {price}) => n + price, 0)}</div>
            {mode === 'browse' ? (
                <Button style={{marginBottom: 10}} href={'/checkout'} variant={'contained'}>Checkout</Button>
            ) : (
                <Button style={{marginBottom: 10}} href={'/checkout'} variant={'contained'}>Confirm Order</Button>
            )}
        </div>
    )
}

export default Cart;