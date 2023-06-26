import axios from "axios";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;
  const [id, setid] = useState();
  const [name, setname] = useState();
  const [category, setcategory] = useState();
  const [imageLink, setImagelink] = useState();
  const [price, setprice] = useState();
  const [countInStock, setcountInStock] = useState();
  const [rating, setrating] = useState();
  const [brand, setbrand] = useState();

  const [description, setdescription] = useState();

  //validation
  const [isRatingValid, setIsRatingValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isbrandValid, setIsbrandValid] = useState(false);
  const [isCategoryValid, setIsCatValid] = useState(false);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [isImageLinkValid, setIsImageLinkValid] = useState(false);
  const handleNameChange = (event) => {
    const enteredName = event.target.value;

    const isValid =
      enteredName.trim().length > 0 && enteredName.trim().length <= 30;

    setname(enteredName);
    setIsNameValid(isValid);
  };
  const handleImageLinkChange = (event) => {
    const enteredImageLink = event.target.value;

    const isValid =
      enteredImageLink.trim().length > 0 && isValidURL(enteredImageLink);

    setImagelink(enteredImageLink);
    setIsImageLinkValid(isValid);
  };
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleRatingChange = (event) => {
    const enteredRating = parseFloat(event.target.value);

    const isValid =
      !isNaN(enteredRating) &&
      enteredRating >= 1 &&
      enteredRating <= 5 &&
      enteredRating % 0.5 === 0;

    setrating(enteredRating);
    setIsRatingValid(isValid);
  };
  const handleCatChange = (event) => {
    const enteredcat = event.target.value;

    const isValid =
      enteredcat.trim().length > 0 && enteredcat.trim().length <= 30;

    setcategory(enteredcat);
    setIsCatValid(isValid);
  };
  const handlebrandChange = (event) => {
    const enteredbrand = event.target.value;

    const isValid =
      enteredbrand.trim().length > 0 && enteredbrand.trim().length <= 30;

    setbrand(enteredbrand);
    setIsbrandValid(isValid);
  };
  const handlePriceChange = (event) => {
    const enteredPrice = event.target.value;

    const isValid = /^\d+(\.\d{1,2})?$/.test(enteredPrice);

    setprice(enteredPrice);
    setIsValidPrice(isValid);
  };
  const updateData = () => {
    axios.put(`/api/products/update/${productId}`, {
      _id: productId,
      name: name,
      id: id,
      category: category,
      image: imageLink,
      price: price,
      countInStock: countInStock,
      brand: brand,
      rating: rating,
      description: description,
    });

    navigate("/productList");
    message.success("product updated successfully");
  };
  return (
    <div>
      <Helmet>
        <title>Update Product</title>
      </Helmet>
      <strong className="mb-3">Update Product</strong>
      <div>
        <Form id="eee">
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <p id="form-labell">Name</p>
                <Form.Control
                  type="text"
                  onChange={handleNameChange}
                  required
                  isValid={isNameValid}
                />
                {!isNameValid && (
                  <Form.Text className="text-danger">
                    Please enter a valid name (1-30 characters).
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <p id="form-labell">Id</p>
                <Form.Control
                  type="text"
                  onChange={(event) => {
                    setid(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <p id="form-labell">Category</p>
                <Form.Control
                  type="text"
                  onChange={handleCatChange}
                  isValid={isCategoryValid}
                  required
                />
                {!isCategoryValid && (
                  <Form.Text className="text-danger">
                    Please enter a valid category(1-30 characters).
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <p id="form-labell">ImageLink</p>
                <Form.Control
                  type="text"
                  onChange={handleImageLinkChange}
                  isValid={isImageLinkValid}
                  required
                />
                {!isImageLinkValid && (
                  <Form.Text className="text-danger">
                    Please enter a valid image link.
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <p id="form-labell">Price</p>

                <Form.Control
                  type="number"
                  onChange={handlePriceChange}
                  required
                  isValid={isValidPrice}
                />
                {!isValidPrice && (
                  <Form.Text className="text-danger">
                    Please enter a valid price (e.g., 10 or 10.99).
                  </Form.Text>
                )}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <p id="form-labell">countInStock</p>

                <Form.Control
                  type="number"
                  onChange={(event) => {
                    setcountInStock(event.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <p id="form-labell">Rating</p>

                <Form.Control
                  type="number"
                  step="0.5"
                  onChange={handleRatingChange}
                  required
                  isValid={isRatingValid}
                />
                {!isRatingValid && (
                  <Form.Text className="text-danger">
                    Please enter a valid rating between 1 and 5 (inclusive) in
                    0.5 increments.
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <p id="form-labell">brand</p>

                <Form.Control
                  type="text"
                  onChange={handlebrandChange}
                  isValid={isbrandValid}
                  required
                />
                {!isbrandValid && (
                  <Form.Text className="text-danger">
                    Please enter a valid brand(1-30 characters).
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <p id="form-labell">description</p>

                <Form.Control
                  type="text"
                  as="textarea"
                  rows={4}
                  onChange={(event) => {
                    setdescription(event.target.value);
                  }}
                  required
                />
              </Form.Group>
            </div>
            <div className="mb-3">
              <Button type="submit" onClick={updateData}>
                update Product
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UpdateProduct;
