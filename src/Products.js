import React from 'react';
import axios from 'axios';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Cart from "./Cart";


class ProductList extends React.Component {
    state = {
        products: [],
        productsInCart: [],
    }

    componentDidMount() {
        axios.get(`https://dummyjson.com/products?limit=20&skip=20`)
            .then(res => {
                const products = res.data.products;
                this.setState({ products });
            })
    }

    addToCart (product) {
        const newProduct = { ...product, quantity: 1};
        this.setState({
            productsInCart: [...this.state.productsInCart, newProduct]
        });
    }

    render() {
        return (
            <div>
                <Cart products={this.state.productsInCart} />
                <Divider />
                <h1>Products</h1>
                <Grid container
                      spacing={2}
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center">
                    {
                        this.state.products
                            .map(product =>
                                <Grid item key={product.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="120"
                                            image={product.thumbnail}
                                            alt={product.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {product.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => this.addToCart(product)}>Add to Cart</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                    }
                </Grid>
            </div>
        )
    }
}

export default ProductList;