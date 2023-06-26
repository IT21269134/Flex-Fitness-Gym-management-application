import React from "react";
import { Form, Input, Row, Col, TimePicker, Select, Button, InputNumber } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
import "./DoctorForm.css";


function DoctorRegisterForm({ handleRegister, initialValues, onChangeFile }) {

  const validatePhoneNumber = (_, value) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject(new Error("Phone number must contain only numeric values"));
    }
    return Promise.resolve();
  };

  return (
    <div className="m-5 p-3 border shadow rounded">
      <Form
        layout="vertical"
        className="m-3"
        onFinish={handleRegister}
        encType="multipart/form-data"
        initialValues={{
          ...initialValues,
          ...(initialValues && {
            timings: [
              dayjs(initialValues?.timings[0], "HH:mm"),
              dayjs(initialValues?.timings[1], "HH:mm"),
            ],
            photo: initialValues?.file,
          }),
        }}
      >
        <h4 style={{fontSize: 24, marginBottom: 20}}><b>Personal Details</b> : </h4>
        <Row gutter={20} >
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Name:</b></span>} 
              name="name"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" size="large" placeholder="your name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Email:</b></span>} 
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" size="large" placeholder="your email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Password:</b></span>} 
              name="password"
              type="password"
              required
              rules={[{ required: true }]}
            >
              {/* <Input type="text" size="large" placeholder="your password" /> */}
              <Input.Password
                size="large"
                placeholder="input password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Phone No.:</b></span>} 
              name="phone"
              required
              rules={[{ required: true }, { validator: validatePhoneNumber }]}
            >
              <Input type="text" size="large" placeholder="your contact no" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <Form.Item
              type="file"
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Profile Photo</b></span>} 
              name="photo"
              required
              rules={[{ required: true }]}
            >
              <Input type="file" size="large" onChange={ onChangeFile} value={initialValues?.file}/>
            </Form.Item>
          </Col>

        </Row>
        <h4 style={{fontSize: 24, marginBottom: 20}}><b>Professional Details :</b></h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Specialization:</b></span>} 
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              {/* <Input type="text" size="large" placeholder="your specialization" /> */}
              <Select
                size="large"
                defaultValue="Select Specialization"
                options={[
                  { value: "Sports Medicine", label: "Sports Medicine" },
                  { value: "Psychiatry", label: "Psychiatry" },
                  { value: "Orthopedic", label: "Orthopedic" },
                  { value: "Chiropractic Care", label: "Chiropractic Care" },
                  { value: "Bariatric", label: "Bariatric" },
                  {
                    value: "Osteopathic Medicine",
                    label: "Osteopathic Medicine",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Designation:</b></span>} 
              name="designation"
              required
              rules={[{ required: true }]}
            >
              <Select
                size="large"
                defaultValue="Select Designation"
                options={[
                  {
                    value: "Sports Medicine Specialist",
                    label: "Sports Medicine Specialist",
                  },
                  { value: "Psychiatrist", label: "Psychiatrist" },
                  { value: "Orthopedic Surgeon", label: "Orthopedic Surgeon" },
                  { value: "Chiropractor", label: "Chiropractor" },
                  {
                    value: "Bariatric Physicians",
                    label: "Bariatric Physicians",
                  },
                  {
                    value: "Osteopathic physicians",
                    label: "Osteopathic physicians",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={12}>
            <Form.Item
              label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Experience (Years):
              </b></span>} 
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="Number" min={1} max={50} size="large" placeholder="your experience" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={12}>
            <Form.Item 
            label={<span style={{ color: '#000000', fontSize:20, fontFamily:'Quicksand'}}><b>Timings:</b></span>}  
            name="timings" required rules={[{ required: true }]}>
              <TimePicker.RangePicker size="large" format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <center>
          <Button
            style={{ width: "50%", color: "#ffffff", backgroundColor: "orange", fontFamily:'Quicksand', fontSize:20, fontWeight:"bold" }}
            className="mt-5"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </center>
      </Form>
    </div>
  );
}

export default DoctorRegisterForm;
