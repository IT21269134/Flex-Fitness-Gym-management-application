import React, { useState, useEffect } from "react";
import "./Category.css";
import Search from "./Search";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import AddNewDiary from "./AddNewBreakfast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table } from "react-bootstrap";
import { Modal, Form, Input } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Breakfast() {
  const [nutrition, setNutrition] = useState([]);
  const [status, setStatus] = useState(false);
  const [statusAdd, setStatusAdd] = useState(true);
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteFoodId, setDeleteFoodId] = useState(null);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const { foodname, calorie, carb, fat, protein } = values;
      const updateData = {
        id: id,
        food_name: foodname,
        calories: calorie,
        totalCarb: carb,
        totalFat: fat,
        totalProtein: protein,
      };

      axios
        .put(`http://localhost:4000/breakfast/counterupdate/${id}`, updateData)
        .then((res) => {
          console.log(res.data);
          // Refresh the nutrition data to reflect changes
          axios
            .get("http://localhost:4000/breakfast/counter")
            .then((res) => {
              setNutrition(res.data);
              toast.success('Food Item Updated Successfully');
            })
            .catch((err) => {
              alert(err.message);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset the form and hide the update form
      form.resetFields();
      setUpdateFormVisible(false);
    });
  };

  const setFormStatus = () => {
    setStatus(true);
    setStatusAdd(false);
  };

  const showDeleteConfirmation = (foodId) => {
    setDeleteFoodId(foodId);
    setDeleteConfirmationVisible(true);
  };

  const handleDeleteConfirmation = () => {
    deleteFood(deleteFoodId);
    setDeleteConfirmationVisible(false);
  };

  const deleteFood = async (foodId) => {
    try {
      await axios.delete(`http://localhost:4000/breakfast/delete/${foodId}`);
      const updatedNutrition = nutrition.filter((nutri) => nutri._id !== foodId);
      setNutrition(updatedNutrition);
      toast.success('Food Item Deleted Successfully');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const getNutrition = () => {
      axios
        .get("http://localhost:4000/breakfast/counter")
        .then((res) => {
          setNutrition(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getNutrition();
  }, []);

  return (
    <div className="category-body">
      <ToastContainer />

      <div className="heading-div">
        <h1 style={{ padding: "50px", textAlign: "center", fontSize: "30px" }}>
          Breakfast Diary
        </h1>
      </div>

      <div className="this-needs-to-devide-into-two">
        <div className="first-one-for-read-table">
          <Table>
            <thead class="bg-warning">
              <tr>
                <th>Food Item</th>
                <th>Calories</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th>Protein</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {nutrition.map((nutri) => (
                <tr key={nutri._id}>
                  <td style={{color:"black"}}>{nutri.food_name}</td>
                  <td style={{color:"black"}}>{nutri.calories}</td>
                  <td style={{color:"black"}}>{nutri.totalFat}</td>
                  <td style={{color:"black"}}>{nutri.totalCarb}</td>
                  <td style={{color:"black"}}>{nutri.totalProtein}</td>
                  <td style={{color:"black"}}>
                    <div className="btn-div">
                      <button
                        className="btn-edit"
                        onClick={() => {
                          setId(nutri._id);
                          form.setFieldsValue({
                            foodname: nutri.food_name,
                            calorie: nutri.calories,
                            carb: nutri.totalCarb,
                            fat: nutri.totalFat,
                            protein: nutri.totalProtein,
                          });
                          setUpdateFormVisible(true);
                        }}
                      >
                        <EditIcon />
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => {
                          showDeleteConfirmation(nutri._id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="second-one-for-calorie-search-bar">
          <div className="calorie-search-heading-div">
            <h4 style={{ fontSize: "25px", textAlign: "center" }}>
              Calorie Calculator
            </h4>
          </div>
          <div className="search-bar-div">
            <Search />
          </div>
        </div>
      </div>

      <div className="add-diary-btn-div">
        {statusAdd && (
          <button className="Add-diary" onClick={setFormStatus}>
            Add Diary
          </button>
        )}
      </div>

      <div className="Add-form-div">{status && <AddNewDiary />}</div>

      <div className="view-analysis-btn-div">
        <Button as={Link} to="/breakfast/viewanalysis">
          View Analysis
        </Button>
      </div>

      <Modal
        title="Update Nutrition Values"
        visible={updateFormVisible}
        onCancel={() => setUpdateFormVisible(false)}
        footer={[
          <Button key="update" type="primary" onClick={handleUpdate}>
            Update
          </Button>,
          <Button key="cancel" onClick={() => setUpdateFormVisible(false)}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} {...layout}>
          <Form.Item label="Food Name" name="foodname">
            <Input />
          </Form.Item>
          <Form.Item label="Calorie" name="calorie">
            <Input />
          </Form.Item>
          <Form.Item label="Carb" name="carb">
            <Input />
          </Form.Item>
          <Form.Item label="Fat" name="fat">
            <Input />
          </Form.Item>
          <Form.Item label="Protein" name="protein">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        visible={deleteConfirmationVisible}
        onCancel={() => setDeleteConfirmationVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setDeleteConfirmationVisible(false)}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteConfirmation}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete?</p>
      </Modal>
    </div>
  );
}

export default Breakfast;
