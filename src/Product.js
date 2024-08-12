import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Button, Grid, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Cart, { CartContext } from './Cart';
import { useParams } from 'react-router-dom';

function Product() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
  }, [id])

  const { addToCart } = useContext(CartContext);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const isDiscounted = !!product.discountPercentage;
  const isInStock = !!product.stock;

  return (
    <div>
      <Cart />
      <Divider />
      <Grid container spacing={2} direction="column">
        <Grid container item spacing={2} direction="row">
          <Grid item xs={12} md={6}>
            <Img src={product.thumbnail} alt={product.title} />
          </Grid>
          <Grid container item xs={12} md={6} spacing={2} direction="column">
            <Grid item>
              <Typography variant="h4">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                SKU: {product.sku}
              </Typography>
            </Grid>
            <Grid container item spacing={2} direction="row">
              {isDiscounted
                ? <>
                  <Grid item>
                    <Typography variant="h6">
                      <s>£{product.price}</s>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">
                      £{(product.price * (100 - product.discountPercentage) / 100).toFixed(2)}
                    </Typography>
                  </Grid>
                </>
                : <Typography variant="h5">£{product.price}</Typography>
              }
            </Grid>
            <Grid container item spacing={2}>
              <Grid item>
                <Chip color={isInStock ? "success" : "error"} label={product.availabilityStatus} />
              </Grid>
              {isDiscounted && <Grid item>
                <Chip color="info" variant="outlined" label={`%${product.discountPercentage} off`} />
              </Grid>
              }
            </Grid>
            <Grid item>
              <Button variant="contained" disabled={!isInStock} onClick={() => addToCart(product)}>Add to Cart</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="body1">
            {product.description}
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Product;
