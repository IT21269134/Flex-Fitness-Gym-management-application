import { useState, useEffect } from "react";
import { useItemsContext } from ".././../hooks/inventory-hooks/useItemsContext";
import { Input, Button, Typography, Form, Alert } from "antd";

const { Title } = Typography;

const ItemForm = () => {
  const { dispatch } = useItemsContext();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let errorTimer, successTimer;
    if (error) {
      errorTimer = setTimeout(() => {
        setError(null);
      }, 2000);
    }
    if (success) {
      successTimer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
    return () => {
      clearTimeout(errorTimer);
      clearTimeout(successTimer);
    };
  }, [error, success]);

  const validatePositiveNumber = (rule, value, callback) => {
    if (value <= 0) {
      callback("Please enter a positive number");
    } else {
      callback();
    }
  };

  const onFinish = async (values) => {
    const item = { ...values };

    const response = await fetch("/api/items", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setSuccess(false);
    } else {
      form.resetFields();
      setError(null);
      setSuccess(true);
      console.log("new item added:", json);
      dispatch({ type: "CREATE_ITEMS", payload: json });
    }
  };

  const onFinishFailed = ({ errorFields }) => {
    console.log("Failed:", errorFields);
    const errorMsg = errorFields[0].errors[0];
    setError(` ⚠️ ${errorMsg}`);
    setSuccess(false);
  };

  return (
    <Form
      className="create"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title level={3}>Add a New item</Title>

      <Typography.Text strong>Item name:</Typography.Text>
      <Form.Item
        name="name"
        rules={[
          { required: true, message: "Please enter a text" },
          { max: 50, message: "Maximum 50 characters allowed" },
          {
            pattern: /^[a-zA-Z\s]*$/,
            message: "Please enter a valid text",
          },
        ]}
      >
        <Input
          placeholder="Enter a text"
          style={{ borderWidth: "2px", borderColor: "#333" }}
        />
      </Form.Item>

      <Typography.Text strong>price (in $):</Typography.Text>
      <Form.Item
        name="price"
        rules={[
          { required: true, message: "Please enter a number" },
          { validator: validatePositiveNumber },
        ]}
      >
        <Input
          type="number"
          placeholder="Enter a number"
          style={{ borderWidth: "2px", borderColor: "#333" }}
        />
      </Form.Item>

      <Typography.Text strong>Available stock:</Typography.Text>
      <Form.Item
        name="stock"
        rules={[
          { required: true, message: "Please enter a number" },
          { validator: validatePositiveNumber },
        ]}
      >
        <Input
          type="number"
          placeholder="Enter a number"
          style={{ borderWidth: "2px", borderColor: "#333" }}
        />
      </Form.Item>

      <Button
        type="primary"
        style={{ backgroundColor: "#ff7f50", marginTop: "10px" }}
        htmlType="submit"
      >
        Add item
      </Button>

      {error && (
        <Alert message={error} type="error" style={{ marginTop: "10px" }} />
      )}
      {success && (
        <Alert
          message=" ✅ Item added successfully"
          type="success"
          style={{ marginTop: "10px" }}
        />
      )}
    </Form>
  );
};

export default ItemForm;
