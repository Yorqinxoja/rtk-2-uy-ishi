import React, { useState } from "react";
import { useGetProductsQuery } from "../../redux/api/productsApi";
import { Link } from "react-router-dom";
import { Input, List, Card, Button, message } from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const Products = () => {
  const { data } = useGetProductsQuery();
  const [cart, setCart] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    message.success(`${product.product_name} added to cart`);
  };

  const toggleLike = (productId) => {
    if (likedProducts.includes(productId)) {
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    } else {
      setLikedProducts([...likedProducts, productId]);
    }
  };

  const filteredProducts =
    data?.payload?.filter((product) =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    if (value) {
      const newSuggestions = data?.payload
        ?.filter((product) =>
          product.product_name.toLowerCase().startsWith(value.toLowerCase())
        )
        .map((product) => product.product_name);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="products-container">
      <div className="search-container">
        <Search
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="search-input"
          enterButton
        />
        {searchTerm && (
          <List
            bordered
            dataSource={suggestions}
            renderItem={(suggestion) => (
              <List.Item onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </List.Item>
            )}
            className="suggestions-list"
          />
        )}
      </div>

      <div className="products-list">
        {filteredProducts.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={filteredProducts}
            renderItem={(product) => (
              <List.Item>
                <Card
                  hoverable
                  cover={
                    <Link to={`/product/${product._id}`}>
                      <img
                        className="w-[180]"
                        src={product.product_images[0]}
                        alt={product.product_name}
                      />
                    </Link>
                  }
                  actions={[
                    likedProducts.includes(product._id) ? (
                      <HeartFilled
                        onClick={() => toggleLike(product._id)}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <HeartOutlined onClick={() => toggleLike(product._id)} />
                    ),
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={product.product_name}
                    description={`Price: $${product.sale_price} | Category: ${product.category}`}
                  />
                  <p className="product-rating">Rating: {product.rating}</p>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
