import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Cart, { CartContext } from './Cart';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=20&skip=20`)
    .then(res => {
      setProducts(res.data.products);
    })
  }, [])

  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <Cart />
      <Divider />
      <h1>Products</h1>
      <Grid container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
        {
          products
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
                    <Button size="small" onClick={() => addToCart(product)}>Add to Cart</Button>
                    <Button size="small" component={Link} to={`/product/${product.id}`}>View Detail</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
        }
      </Grid>
    </div>
  )
}

export default ProductList;
