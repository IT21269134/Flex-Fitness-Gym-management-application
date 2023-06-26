import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Input,
  Row,
  Col,
  TimePicker,
  Select,
  Button,
  Typography,
  Upload,
} from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import "./TrainerReg.css";
//import TraineD from './TrainerReg.module.css'
import Footer from "../../components/Online-shopping-components/Footer";
//create Trainer

import { message } from "antd";
const Trainer_home = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setemail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState();

  console.log(name);

  const onChangeFile = (e) => {
    setPhoto(e.target.files[0]);
  };

  async function sendData(e) {
    const newCoach = new FormData();

    newCoach.append("name", name);
    newCoach.append("age", age);
    newCoach.append("email", email);
    newCoach.append("number", number);
    newCoach.append("description", description);
    newCoach.append("password", password);
    newCoach.append("photo", photo);

    console.log(photo);
    console.log(newCoach);

    try {
      await axios.post("http://localhost:4000/Trainer/TrainerReg", newCoach, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Coach registered successfully");
      setAge("");
      setName("");
      setNumber("");
      setDescription("");
      setPhoto("");
      setemail("");
      setPassword("");
    } catch (err) {
      message.error("Coach Already exits");
    }
  }

  return (
    <div className="bk">
      <div className="home-text-section">
        <p className="primary-text">Trainer management</p>

        <br />

        <center>
          <div className="containerr">
            <div className="title">Trainer Application</div>
            <br></br>
            <div className="content">
              <Form
                layout="vertical"
                className="m-3"
                onFinish={sendData}
                encType="multipart/form-data"
              >
                <h4 className="">
                  <b>Personal Details</b>{" "}
                </h4>

                <Row gutter={20}>
                  <Col xs={24} md={24} lg={12}>
                    <div style={{ color: "black" }}>
                      <Form.Item
                        label={
                          <span
                            style={{
                              color: "#000000",
                              fontSize: 20,
                              fontFamily: "Quicksand",
                            }}
                          >
                            <b>Name:</b>
                          </span>
                        }
                        name="name"
                        required
                        rules={[{ required: true }]}
                      >
                        <Input
                          type="text"
                          size="large"
                          placeholder="Trainer Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: 20,
                            fontFamily: "Quicksand",
                          }}
                        >
                          <b>Age:</b>
                        </span>
                      }
                      name="age"
                      type="num"
                      required
                      rules={[
                        { required: true, message: "Age is required" },
                        {
                          type: "number",
                          min: 16,
                          max: 100,
                          message: "Age must be between 16 and 65",
                          transform: (value) =>
                            value && Number(value) ? Number(value) : undefined,
                          validator: (_, value) => {
                            if (value && (value < 16 || value > 66)) {
                              return Promise.reject(
                                "Age must be between 16 and 65"
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        size="large"
                        placeholder="Trainer Age"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: 20,
                            fontFamily: "Quicksand",
                          }}
                        >
                          <b>Email:</b>
                        </span>
                      }
                      name="email"
                      type="email"
                      required
                      rules={[
                        { required: true, message: "Email is required" },
                        {
                          type: "email",
                          message: "Invalid Email format",
                        },
                      ]}
                    >
                      <Input
                        type="email"
                        size="large"
                        placeholder="Trainer Email"
                        onChange={(e) => setemail(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      type="number"
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: 20,
                            fontFamily: "Quicksand",
                          }}
                        >
                          <b>Phone No.:</b>
                        </span>
                      }
                      name="phone"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Phone Number  is required",
                        },
                        {
                          pattern: /^[0-9]{10}$/,
                          message: "Phone number must have exactly 10 digits",
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        size="large"
                        placeholder="Your contact number"
                        onChange={(e) => setNumber(e.target.value)}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      type="textarea"
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: 20,
                            fontFamily: "Quicksand",
                          }}
                        >
                          <b>Description</b>
                        </span>
                      }
                      name="description"
                      required
                      rules={[
                        { required: true, message: "Description is required" },
                      ]}
                    >
                      <Input.TextArea
                        rows={4}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      type="password"
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: 20,
                            fontFamily: "Quicksand",
                          }}
                        >
                          <b>Password</b>
                        </span>
                      }
                      name="password"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input
                        type="password"
                        size="large"
                        placeholder="Trainer password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12}>
                    <Form.Item
                      type="file"
                      label={
                        <span
                          style={{
                            color: "#000000",
                            fontSize: 20,
                            fontFamily: "Quicksand",
                          }}
                        >
                          <b>photo</b>
                        </span>
                      }
                      name="photo"
                      required
                      rules={[{ required: true }]}
                    >
                      <Input
                        type="file"
                        size="large"
                        placeholder="Trainer Photo"
                        onChange={onChangeFile}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <center>
                  <Form.Item>
                    <Button
                      style={{
                        width: "50%",
                        color: "#ffffff",
                        backgroundColor: "orange",
                        fontFamily: "Quicksand",
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                      className="mt-5"
                      size="large"
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </center>
              </Form>
            </div>
          </div>
        </center>

        {/* <Link to="/TrainerAd">
          <button className="secondary-button"> ADS</button>
          </Link> */}
      </div>
    </div>
  );
};

export default Trainer_home;
