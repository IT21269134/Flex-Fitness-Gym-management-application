import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Review from "./Review";

// import AddressContainer from './AddressContainer';
import styled from "styled-components";
import "./container/Addresspro.css";
import "./container/carddis.css";
import "./container/addcard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
//...................................................................................................
const steps = ["Shipping address", "Payment details", "Review your order"];

function GetStepContent(step) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      setProducts(result.data);
    };
    fetchData();
  }, []);
  switch (step) {
    case 0:
      return;
    case 1:
      return;
    case 2:
      return <Review />;

    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function ProcessPayment() {
  //...................................................................................................
  //get all Addresses
  const [addresses, setAddresses] = useState(null);
  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await fetch("http://localhost:4000/api/getalladdresses");

      const json = await res.json();

      if (res.ok) {
        setAddresses(json);
      }
    };
    fetchAddresses();
  }, []);

  //get all cards........................................................................................
  const [cards, setCards] = useState(null);
  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch("http://localhost:4000/api/getallcard");

      const json = await res.json();

      if (res.ok) {
        setCards(json);
      }
    };
    fetchCards();
  }, []);
  //.....................................................................................................
  //add address
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [country, setcountry] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [error, seterror] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    backtoHome();

    const add = {
      name,
      phoneNumber,
      country,
      address,
      city,
      state,
      postalCode,
    };

    const res = await fetch("http://localhost:4000/api/addadress", {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "content-type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      seterror = json.error;
    }
    if (res.ok) {
      name("");
      setphoneNumber("");
      setcountry("");
      setaddress("");
      setcity("");
      setstate("");
      setpostalCode("");
      seterror(null);
    }

    Window.location.reload();
  };

  //add new card .........................................................................................
  const addNewCard = async (e) => {
    e.preventDefault();
    backtoHome();
    const card = { holderName, cardNumber, expDate, cvvNumber };

    const res = await fetch("http://localhost:4000/api/addcard", {
      method: "POST",
      body: JSON.stringify(card),
      headers: {
        "content-type": "application/json",
      },
    });

    const json = await res.json();

    if (!res.ok) {
      seterror = json.error;
    }

    if (res.ok) {
      holderName("");
      cardNumber("");
      expDate("");
      cvvNumber("");
    }
  };

  //............................................
  //delete address
  // const [deleteID, setdeleteID] = (null)
  const deleteAddress = async (_id) => {
    const res = await fetch(`http://localhost:4000/api/deleteaddress/${_id}`, {
      method: "DELETE",
    });
    const json = await res.json();

    const newstate = [...addresses].filter((address) => {
      return address._id !== _id;
    });

    setAddresses(newstate);
  };

  //delete card...........................................................................................
  const deleteCard = async (_id) => {
    const res = await fetch(`http://localhost:4000/api/deletecard/${_id}`, {
      method: "DELETE",
    });
    const json = await res.json();

    const newCstate = [...cards].filter((card) => {
      return card._id !== _id;
    });

    setCards(newCstate);
  };

  //........................................................................................................
  const [holderName, setholderName] = useState("");
  const [cardNumber, setcardNumber] = useState("");
  const [cvvNumber, setcvvNumber] = useState("");
  const [expDate, setexpDate] = useState("");

  const addCard = async () => {
    const res = await fetch("http://localhost:4000/api/addcard", {
      method: "POST",
      body: JSON.stringify(addCard),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  //update address
  //......................................................................................................
  const [editForm, seteditForm] = useState({
    _id: "",
    name: "",
    phoneNumber: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const updateCreateFormField = (e) => {
    const { name, value } = e.target;

    seteditForm({
      ...editForm,
      [name]: value,
    });
  };

  const toggleUpadate = (address) => {
    openEditform();

    seteditForm({
      ...editForm,
      _id: address._id,
      name: address.name,
      phoneNumber: address.phoneNumber,
      country: address.country,
      address: address.address,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
  };

  const updateAddress = async (e) => {
    e.preventDefault();

    const { name, phoneNumber, country, address, city, state, postalCode } =
      editForm;

    // const res = await fetch(`http://localhost:4000/api/updateaddress/${address._id}`,{
    //   method: "PATCH",
    //   name, phoneNumber, country, address, city, state, postalCode
    // });

    const res = await fetch(
      `http://localhost:4000/api/updateaddress/${editForm._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      }
    );

    closeEditform();
  };

  //.......................................................................................................
  //Fragment variables
  const [activeStep, setActiveStep] = React.useState(0);
  const [formactivate, setformactivate] = React.useState(0);
  const [editactivate, seteditactivate] = React.useState(0);
  const navigate = useNavigate();
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const gggg = () => {
    navigate("/shophome");
  };
  const handleNextt = () => {
    navigate("/reviewss");
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleform = () => {
    setformactivate(formactivate + 1);
  };
  const backtoHome = () => {
    setformactivate(formactivate - 1);
  };

  const openEditform = () => {
    setformactivate(formactivate + 2);
  };
  const closeEditform = () => {
    setformactivate(formactivate - 2);
  };
  //..............................................................................

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Pay Now
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {activeStep == 0 && (
                <React.Fragment>
                  {formactivate == 0 && (
                    <Main>
                      <h1>Your Addresses</h1>
                      {addresses &&
                        addresses.map((address) => {
                          return (
                            <div>
                              <div
                                className="card"
                                style={{
                                  borderRadius: 20,
                                  backgroundColor: "#fa933f",
                                  padding: 25,
                                  textSizeAdjust: 50,
                                }}
                                key={address._id}
                              >
                                <address>
                                  {address.name}
                                  <br />
                                  {address.phoneNumber}, {address.address},{" "}
                                  {address.city},<br />
                                  {address.state}, {address.country}.
                                </address>

                                <div className="d-flex pt-2">
                                  <tr>
                                    <td>
                                      <button
                                        className="buttonE button--full"
                                        onClick={() => toggleUpadate(address)}
                                      >
                                        Edit
                                      </button>
                                    </td>
                                    <td>
                                      <button
                                        className="buttonD button--full"
                                        onClick={() =>
                                          deleteAddress(address._id)
                                        }
                                      >
                                        Delete
                                      </button>
                                    </td>
                                  </tr>
                                  <button
                                    className="buttonN button--full"
                                    onClick={handleNext}
                                  >
                                    Continue with this address
                                  </button>
                                </div>
                              </div>
                              <br />
                            </div>
                          );
                        })}
                      <button
                        className="buttonA button--full"
                        onClick={handleform}
                      >
                        Add New Address
                      </button>
                    </Main>
                  )}
                  {formactivate == 1 && (
                    <InputContainer>
                      <form onSubmit={handleSubmit}>
                        <p>Name</p>
                        <input
                          type="text"
                          placeholder="John"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          required
                        />

                        <p>Phone Number</p>
                        <input
                          type="text"
                          placeholder="+94 000 000 000"
                          onChange={(e) => setphoneNumber(e.target.value)}
                          value={phoneNumber}
                          required
                        />

                        <p>Country</p>
                        <input
                          type="text"
                          placeholder="Sri Lanka"
                          onChange={(e) => setcountry(e.target.value)}
                          value={country}
                          required
                        />

                        <p>Address</p>
                        <input
                          type="text"
                          placeholder="A/460"
                          onChange={(e) => setaddress(e.target.value)}
                          value={address}
                          required
                        />

                        <p>City</p>
                        <input
                          type="text"
                          placeholder="Colombo"
                          onChange={(e) => setcity(e.target.value)}
                          value={city}
                          required
                        />

                        <p>State/Province</p>
                        <input
                          type="text"
                          placeholder="Western"
                          onChange={(e) => setstate(e.target.value)}
                          value={state}
                          required
                        />

                        <p>Postal Code</p>
                        <input
                          type="text"
                          placeholder="1004"
                          onChange={(e) => setpostalCode(e.target.value)}
                          value={postalCode}
                          required
                        />

                        <br />
                        <button
                          className="buttonA button--full"
                          style={{ marginTop: 10 }}
                        >
                          Add New Address
                        </button>
                        {/* <button>Add address</button> */}
                      </form>
                      <Button onClick={backtoHome} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    </InputContainer>
                  )}
                  {formactivate == 2 && (
                    <InputContainer>
                      <form onSubmit={updateAddress}>
                        <p>Name</p>
                        <input
                          type="text"
                          onChange={updateCreateFormField}
                          value={editForm.name}
                          name="name"
                          required
                        />

                        <p>Phone Number</p>
                        <input
                          type="text"
                          onChange={updateCreateFormField}
                          value={editForm.phoneNumber}
                          name="phoneNumber"
                          required
                        />

                        <p>Country</p>
                        <input
                          type="text"
                          onChange={updateCreateFormField}
                          value={editForm.country}
                          name="country"
                          required
                        />

                        <p>Address</p>
                        <input
                          type="text"
                          placeholder="A/460"
                          onChange={updateCreateFormField}
                          value={editForm.address}
                          name="address"
                          required
                        />

                        <p>City</p>
                        <input
                          type="text"
                          placeholder="Colombo"
                          onChange={updateCreateFormField}
                          value={editForm.city}
                          name="city"
                          required
                        />

                        <p>State/Province</p>
                        <input
                          type="text"
                          placeholder="Western"
                          onChange={updateCreateFormField}
                          value={editForm.state}
                          name="state"
                          required
                        />

                        <p>Postal Code</p>
                        <input
                          type="text"
                          placeholder="1004"
                          onChange={updateCreateFormField}
                          value={editForm.postalCode}
                          name="postalCode"
                          required
                        />

                        <br />
                        <button>Save Chenges</button>
                      </form>
                      <Button onClick={closeEditform} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    </InputContainer>
                  )}
                </React.Fragment>
              )}
              {activeStep == 1 && (
                <React.Fragment>
                  {formactivate === 0 && (
                    <div>
                      <h1>Your Cards</h1>
                      {cards &&
                        cards.map((card) => {
                          return (
                            <div>
                              <div className="Ccontainer" key={card._id}>
                                <div className="Ccard">
                                  <button
                                    className="proceed"
                                    onClick={handleNext}
                                  >
                                    <svg
                                      svg
                                      className="sendicon"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                                    </svg>
                                  </button>
                                  <img
                                    src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png"
                                    className="logo-card"
                                  />
                                  <h6 style={{ color: "white" }}>
                                    {" "}
                                    Card Number :{" "}
                                  </h6>
                                  <input
                                    type="text"
                                    id="gg"
                                    className="input cardnumber"
                                    value={card.cardNumber}
                                  ></input>
                                  <h6 style={{ color: "white" }}> Name : </h6>
                                  <input
                                    className="input nam"
                                    id="gg"
                                    value={card.holderName}
                                  ></input>
                                  <h6 style={{ color: "white" }}> ccv : </h6>
                                  <input id="gg" value={card.cvvNumber}></input>
                                  <br />
                                  <button className="edit">Edit</button>

                                  <button
                                    className="delet"
                                    onClick={() => deleteCard(card._id)}
                                  >
                                    delete
                                  </button>
                                </div>
                              </div>
                              <br />
                            </div>
                          );
                        })}
                      <button
                        className="buttonA button--full"
                        onClick={handleform}
                      >
                        Add New Card
                      </button>
                    </div>
                  )}
                  {formactivate === 1 && (
                    <div className="Ap">
                      <form onSubmit={addNewCard}>
                        <input
                          className="Ainput"
                          type="text"
                          onChange={(e) => setholderName(e.target.value)}
                          value={holderName}
                          placeholder="Name"
                          required
                        />
                        <input
                          className="Ainput"
                          type="text"
                          onChange={(e) => setcardNumber(e.target.value)}
                          value={cardNumber}
                          placeholder="**** **** **** ****"
                          required
                        />
                        <input
                          className="Ainput"
                          type="text"
                          onChange={(e) => setexpDate(e.target.value)}
                          value={expDate}
                          placeholder="M/Y"
                          required
                        />
                        <input
                          className="Ainput"
                          type="tel"
                          onChange={(e) => setcvvNumber(e.target.value)}
                          value={cvvNumber}
                          placeholder="CVC"
                          required
                        />

                        <button>Add Card</button>
                      </form>
                    </div>
                  )}
                </React.Fragment>
              )}
              {GetStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={gggg}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}{" "}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const Main = styled.div`
    font-family: var(--font-family-base);
    line-height: 1.5;
    margin: 0;
    min-block-size: 100vh;
    padding: 5vmin;
    place-items: center;
  }
`;
