import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import { Card, Typography, Button, Image } from "antd";
import "./ProductDetails.css";

const { Title, Text } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useGetProductsQuery();

  const product = data?.payload?.find((item) => item._id === id);

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="product-details-container">
      <Card
        hoverable
        style={{ width: 600, margin: "0 auto", padding: "20px" }}
        cover={
          <Image
            alt={product.product_name}
            src={product.product_images[0]}
            width="100%"
            className="product-image-large"
          />
        }
      >
        <Title level={2}>{product.product_name}</Title>
        <Text strong className="product-price-large">
          ${product.sale_price}
        </Text>
        <p>{product.description}</p>
        <Text type="secondary">Category: {product.category}</Text>
        <p>Rating: {product.rating}</p>

        <Button type="primary" size="large" className="buy-now-btn">
          Buy Now
        </Button>
      </Card>
    </div>
  );
};

export default ProductDetails;
