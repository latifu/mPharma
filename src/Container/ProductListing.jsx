import React, { useEffect } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import { setProducts, loadingProducts } from "../redux/action/productAction";
import ProductComponent from "./ProductComponent";
import { normalizeDrugList } from "../utils/drugNormalizer.js"

const ProductListing = () => {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingProducts())
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://www.mocky.io/v2/5c3e15e63500006e003e9795"
        );
        const normalizedDrug = normalizeDrugList(data.products);
        console.log('normalizedDrug:::', normalizedDrug)
        dispatch(setProducts(normalizedDrug));
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, [dispatch]);
  if (products.allProducts.loading) {
    return <CircularProgress color="secondary" />
  }
  return (
    <div>
      <ProductComponent />
    </div>
  );
};

export default ProductListing;
