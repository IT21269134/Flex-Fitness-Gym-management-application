import { useState } from "react";
import { useItemsContext } from "../../hooks/inventory-hooks/useItemsContext";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  notification,
} from "antd";

const ItemDetails = ({ item }) => {
  const { dispatch } = useItemsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(item);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    const response = await fetch("/api/Items/" + item._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ITEM", payload: json });
      setIsDeleteModalOpen(false); // hide the confirmation dialog after deleting the item
      notification.success({
        message: "Item Deleted",
        description: "The item has been successfully deleted.",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Error",
        description: "There was an error deleting the item.",
        placement: "topRight",
      });
    }
  };

  const handleUpdate = async () => {
    const response = await fetch("/api/items/" + item._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_ITEM", payload: updatedItem });
      setIsModalOpen(false); // hide the modal after updating the item
      notification.success({
        message: "Item Updated",
        description: "The item has been successfully updated.",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Error",
        description: "There was an error updating the item.",
        placement: "topRight",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({
      ...updatedItem,
      [name]: value,
    });
  };

  const handlePriceChange = (value) => {
    setUpdatedItem({
      ...updatedItem,
      price: value,
    });
  };

  const handleStockChange = (value) => {
    setUpdatedItem({
      ...updatedItem,
      stock: value,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="item-details">
      <h4 style={{ color: "#ff7f50" }}>{item.name}</h4>
      <p>
        <strong>Price ($): </strong>
        {item.price}
      </p>
      <p>
        <strong>Available Stock: </strong>
        {item.stock}
      </p>
      <p>
        <strong>Date: </strong>
        {new Date(item.createdAt).toLocaleDateString()}
      </p>

      {/* use Ant Design Button components for the update and delete buttons */}
      <Button
        type="primary"
        style={{ backgroundColor: "blue" }}
        onClick={showModal}
      >
        Update
      </Button>

      <Button type="primary" danger onClick={showDeleteModal}>
        Delete
      </Button>

      {/* create a modal component for the update form */}
      <Modal
        title="Update Item"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button
            key="update"
            type="primary"
            style={{ backgroundColor: "blue" }}
            onClick={handleUpdate}
          >
            Update
          </Button>,
        ]}
      >
        <Form>
          <Form.Item labelCol={{ span: 4, style: { fontWeight: "bold" } }}>
            <Typography.Text strong>Item name:</Typography.Text>
            <Input
              name="name"
              value={updatedItem.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item>
            <Typography.Text strong>price (in $):</Typography.Text>
            <InputNumber
              name="price"
              value={updatedItem.price}
              onChange={handlePriceChange}
            />
          </Form.Item>
          <Form.Item>
            <Typography.Text strong>Available stock:</Typography.Text>
            <InputNumber
              name="stock"
              value={updatedItem.stock}
              onChange={handleStockChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* create a modal component for the delete confirmation dialog */}
      <Modal
        title="Delete Item"
        visible={isDeleteModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button key="delete" type="primary" danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>
    </div>
  );
};

export default ItemDetails;
