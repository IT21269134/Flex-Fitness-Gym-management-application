import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewLunch() {
  const [food_name, setFdName] = useState("");
  const [calories, setCalories] = useState("");
  const [totalFat, setTotalFat] = useState("");
  const [totalCarb, setTotalCarb] = useState("");
  const [totalProtein, setTotalProtein] = useState("");

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!food_name.trim()) {
      errors.food_name = "Food name is required";
      isValid = false;
    }

    if (!calories.trim()) {
      errors.calories = "Calories are required";
      isValid = false;
    } else if (!/^\d+(\.\d+)?$/.test(calories)) {
      errors.calories = "Calories must be a numeric value";
      isValid = false;
    }

    if (!totalFat.trim()) {
      errors.totalFat = "Total fat is required";
      isValid = false;
    } else if (!/^\d+(\.\d+)?$/.test(totalFat)) {
      errors.totalFat = "Total fat must be a numeric value";
      isValid = false;
    }

    if (!totalCarb.trim()) {
      errors.totalCarb = "Total carbs are required";
      isValid = false;
    } else if (!/^\d+(\.\d+)?$/.test(totalCarb)) {
      errors.totalCarb = "Total carbs must be a numeric value";
      isValid = false;
    }

    if (!totalProtein.trim()) {
      errors.totalProtein = "Total protein is required";
      isValid = false;
    } else if (!/^\d+(\.\d+)?$/.test(totalProtein)) {
      errors.totalProtein = "Total protein must be a numeric value";
      isValid = false;
    }

    setFormErrors(errors);

    return isValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newNutritionD = {
        food_name,
        calories: Number(calories),
        totalFat: Number(totalFat),
        totalCarb: Number(totalCarb),
        totalProtein: Number(totalProtein),
      };

      axios
        .post("http://localhost:4000/lunch/createfooddiary", newNutritionD)
        .then(() => {
          toast.success("Food Item Added Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 4000); // Delay
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <div>
      <ToastContainer />
      <h3 style={{ fontSize: "25px", textAlign: "center" }}>Create Diary</h3>
      <form
        onSubmit={onSubmit}
        style={{
          paddingLeft: "250px",
          paddingRight: "250px",
        }}
      >
        <div>
          <label
            style={{ fontSize: "20px", paddingTop: "20px", color: "black" }}
          >
            Food Name
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px",
              fontSize: "16px",
              backgroundColor: "#f5f5f5",
            }}
            type="text"
            name="foodname"
            value={food_name}
            onChange={(e) => setFdName(e.target.value)}
          />
          {formErrors.food_name && (
            <span style={{ color: "red" }}>{formErrors.food_name}</span>
          )}
        </div>
        <div>
          <label
            style={{ fontSize: "20px", paddingTop: "20px", color: "black" }}
          >
            Total Calories
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px",
              fontSize: "16px",
              backgroundColor: "#f5f5f5",
            }}
            type="text"
            name="calorie"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
          {formErrors.calories && (
            <span style={{ color: "red" }}>{formErrors.calories}</span>
          )}
        </div>
        <div>
          <label
            style={{ fontSize: "20px", paddingTop: "20px", color: "black" }}
          >
            Carbs
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px",
              fontSize: "16px",
              backgroundColor: "#f5f5f5",
            }}
            type="text"
            name="carbs"
            value={totalCarb}
            onChange={(e) => setTotalCarb(e.target.value)}
          />
          {formErrors.totalCarb && (
            <span style={{ color: "red" }}>{formErrors.totalCarb}</span>
          )}
        </div>
        <div>
          <label
            style={{ fontSize: "20px", paddingTop: "20px", color: "black" }}
          >
            Fat
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px",
              fontSize: "16px",
              backgroundColor: "#f5f5f5",
            }}
            type="text"
            name="fat"
            value={totalFat}
            onChange={(e) => setTotalFat(e.target.value)}
          />
          {formErrors.totalFat && (
            <span style={{ color: "red" }}>{formErrors.totalFat}</span>
          )}
        </div>
        <div>
          <label
            style={{ fontSize: "20px", paddingTop: "20px", color: "black" }}
          >
            Protein
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: "5px",
              padding: "10px",
              margin: "5px",
              fontSize: "16px",
              backgroundColor: "#f5f5f5",
            }}
            type="text"
            className="protein"
            value={totalProtein}
            onChange={(e) => setTotalProtein(e.target.value)}
          />
          {formErrors.totalProtein && (
            <span style={{ color: "red" }}>{formErrors.totalProtein}</span>
          )}
        </div>
        <div>
          <div>
            <div style={{ padding: "20px" }}>
              <button
                id="btn-post"
                type="submit"
                style={{
                  marginLeft: "100px",
                  borderRadius: "10px",
                  position: "relative",
                  backgroundColor: "#cc5801",
                  border: "none",
                  fontSize: "18px",
                  color: "#ffffff",
                  padding: "10px",
                  width: "120px",
                  textAlign: "center",
                  transitionDuration: "0.4s",
                  textDecoration: "none",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                Post
              </button>
              <button
                id="btn-cancel"
                type="button"
                onClick={() => {
                  window.location.reload();
                }}
                style={{
                  marginLeft: "350px",
                  backgroundColor: "#a52005",
                  borderRadius: "12px",
                  color: "white",
                  cursor: "pointer",
                  padding: "10px",
                  textAlign: "center",
                  transition: "200ms",
                  width: "120px",
                  boxSizing: "border-box",
                  border: "0",
                  fontSize: "18px",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  touchAction: "manipulation",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddNewLunch;
