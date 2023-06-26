import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { message } from "antd";
import Logo from "../../assets/images/Logo_big.png";

const WorkoutDetails = ({ workout }) => {
  const componentPDF = useRef();

  const [show, setShow] = useState(false);
  const [forPdf, setForPdf] = useState(false);

  const handlePdfTrue = async () => setForPdf(true);
  const handlePdfFalse = async () => setForPdf(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [updatedPost, setUpdatedPost] = useState({
    id: "",
    username: "",
    coachername: "",
    sheduleno: "",
    date: "",
    set1: "",
    set2: "",
    set3: "",
    set4: "",
    set5: "",
    set6: "",
    set7: "",
    set8: "",
    set9: "",
    set10: "",
  });


  const onDelete = (id) => {
    axios
      .delete(`http://localhost:4000/Workouts/delete/${id}`)
      .then((res) => {
        // Display success message
        message.success("Workout deleted");
      })
      .then(() => {
        // Reload the page after a delay
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Adjust the delay time (in milliseconds) as needed
      })
      .catch((err) => {
        // Handle error if necessary
        console.error(err);
      });
  };

  const updatefun = (workout) => {
    setUpdatedPost(workout);
    handleShow();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const saveUpdatedPost = () => {
    console.log(updatedPost);

    axios
      .put(
        `http://localhost:4000/Workouts/update/${updatedPost._id}`,
        updatedPost
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    handleClose();
    window.location.reload();
  };

  // const generatePdfDoc = () => {
  //   setForPdf(true)
  //   useReactToPrint({
  //     content: () => componentPDF.current,
  //     documentTitle: "User Workout Schedule",
  //     onAfterPrint: () => message.success("PDF Generated")
  //   });
  //   setForPdf(false)
  // };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "User Workout Schedule",
    onAfterPrint: () => message.success("PDF Generated"),
  });

  return (
    <div className="workout-details">
      <Modal show={show} onHide={handleClose} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>Change Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <b>
              {" "}
              <p>Trainee</p>
            </b>
            <Form.Control
              placeholder="Username"
              name="Username"
              value={updatedPost.username ? updatedPost.username : ""}
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              disabled
            />
            <b>
              {" "}
              <p>Trainer</p>
            </b>
            <Form.Control
              placeholder="coachername"
              name="coachername"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.coachername ? updatedPost.coachername : ""}
              disabled
            />
            <b>
              {" "}
              <p>Shedule No</p>
            </b>
            <Form.Control
              placeholder="sheduleno"
              name="sheduleno"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.sheduleno ? updatedPost.sheduleno : ""}
            />
            <b>
              {" "}
              <p>Set 1</p>
            </b>
            <Form.Control
              placeholder="Set1"
              name="set1"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set1 ? updatedPost.set1 : ""}
            />

            <b>
              {" "}
              <p>Set 2</p>
            </b>
            <Form.Control
              placeholder="Set2"
              name="set2"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set2 ? updatedPost.set2 : ""}
            />
            <b>
              {" "}
              <p>Set 3</p>
            </b>
            <Form.Control
              placeholder="Set3"
              name="set3"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set1 ? updatedPost.set3 : ""}
            />
            <b>
              {" "}
              <p>Set 4</p>
            </b>
            <Form.Control
              placeholder="Set4"
              name="set4"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set4 ? updatedPost.set4 : ""}
            />
            <b>
              {" "}
              <p>Set 5</p>
            </b>
            <Form.Control
              placeholder="Set5"
              name="set5"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set5 ? updatedPost.set5 : ""}
            />
            <b>
              {" "}
              <p>Set 6</p>
            </b>
            <Form.Control
              placeholder="Set6"
              name="set6"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set6 ? updatedPost.set6 : ""}
            />
            <b>
              {" "}
              <p>Set 7</p>
            </b>
            <Form.Control
              placeholder="Set7"
              name="set7"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set7 ? updatedPost.set7 : ""}
            />

            <b>
              <p>Set 8</p>
            </b>
            <Form.Control
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              placeholder="Set8"
              name="set8"
              onChange={handleChange}
              value={updatedPost.set8 ? updatedPost.set8 : ""}
            />
            <b>
              {" "}
              <p>Set 9</p>
            </b>
            <Form.Control
              placeholder="Set9"
              name="set9"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set9 ? updatedPost.set9 : ""}
            />

            <b>
              {" "}
              <p>Set 10</p>
            </b>
            <Form.Control
              placeholder="Set10"
              name="set10"
              style={{ marginBottom: "1rem", fontSize: "19px" }}
              onChange={handleChange}
              value={updatedPost.set10 ? updatedPost.set10 : ""}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div
        ref={componentPDF}
      
      >
        {forPdf && (
          <center>
            <div>
              <img
                src={Logo}
                width="1500px"
                height="80px"
                paddingLeft="60px"
                id="nav_img"
              />
              <div>
                <div>Personal Workout Plan</div>
              </div>
              <div className="trainer-para">
                You are a gym warrior, relentless and determined. Embrace the
                discomfort, push harder, and never settle for less. Each rep and
                drop of sweat reveals your unwavering commitment. Rise above,
                redefine limits, and conquer. You are unstoppable. Let the world
                witness the greatness within you.
              </div>
            </div>
          </center>
        )}
        <div className={forPdf ? "trainer-data" : ""}>
          <center>
            {forPdf && (
              <div className="trainer-head">
                Traniee Name : {workout.username}
              </div>
            )}
            {!forPdf && <h4> {workout.username}</h4>}

            {forPdf && (
              <div className="trainer-table">
                <table>
                  <tr>
                    <td>Exercise 1</td>
                    <td>{workout.set1}</td>
                  </tr>
                  <tr>
                    <td>Exercise 2</td>
                    <td>{workout.set2}</td>
                  </tr>
                  <tr>
                    <td>Exercise 3</td>
                    <td>{workout.set3}</td>
                  </tr>
                  <tr>
                    <td>Exercise 4</td>
                    <td>{workout.set4}</td>
                  </tr>
                  <tr>
                    <td>Exercise 5</td>
                    <td>{workout.set5}</td>
                  </tr>
                  <tr>
                    <td>Exercise 6</td>
                    <td>{workout.set6}</td>
                  </tr>
                  <tr>
                    <td>Exercise 7</td>
                    <td>{workout.set7}</td>
                  </tr>
                  <tr>
                    <td>Exercise 8</td>
                    <td>{workout.set8}</td>
                  </tr>
                  <tr>
                    <td>Exercise 9</td>
                    <td>{workout.set9}</td>
                  </tr>
                  <tr>
                    <td>Exercise 10</td>
                    <td>{workout.set10}</td>
                  </tr>
                </table>
              </div>
            )}

            {!forPdf && (
              <div>
                <p>
                  <strong>Exercise 1 : </strong>
                  {workout.set1}
                </p>
                <p>
                  <strong>Exercise 2 : </strong>
                  {workout.set2}
                </p>
                <p>
                  <strong>Exercise 3 : </strong>
                  {workout.set3}
                </p>
                <p>
                  <strong>Exercise 4 : </strong>
                  {workout.set4}
                </p>
                <p>
                  <strong>Exercise 5 : </strong>
                  {workout.set5}
                </p>
                <p>
                  <strong>Exercise 6: </strong>
                  {workout.set6}
                </p>
                <p>
                  <strong>Exercise 7: </strong>
                  {workout.set7}
                </p>
                <p>
                  <strong>Exercise 8: </strong>
                  {workout.set8}
                </p>
                <p>
                  <strong>Exercise 9: </strong>
                  {workout.set9}
                </p>
                <p>
                  <strong>Exercise 10: </strong>
                  {workout.set10}
                </p>
                <p>{workout.date}</p>
              </div>
            )}
          </center>
        </div>

        {forPdf && (
          <center>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="trainer-footer">
              <hr />
              <div>-------Flex Fitness 2023------</div>
            </div>
          </center>
        )}
      </div>
      <div
        style={{
          display: "inline-block",
          paddingLeft: "60px",
          paddingBottom: "16px",
        }}
      >
        <a
          className="btn btn-outline-danger"
          style={{ marginRight: "1rem" }}
          href="#"
          onClick={() => onDelete(workout._id)}
        >
          Delete
        </a>

        <a
          className="btn btn-outline-success"
          href="#"
          onClick={() => updatefun(workout)}
        >
          Update
        </a>
        <div
          style={{
            display: "inline-block",
            paddingLeft: "15px",
            paddingBottom: "16px",
          }}
        >
          <a
            className="btn btn-outline-dark"
            href="#"
            onClick={async () => {
              await handlePdfTrue();
              generatePDF();
              await handlePdfFalse();
            }}
          >
            PDF
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
