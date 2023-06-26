import axios from "axios";
import { useEffect, useState } from "react";
import DoctorCard from "../../components/doctor-components/DoctorCard";
import { Input } from "antd";
import DoctorCorousel from "../../components/doctor-components/DoctorCorousel";
const { Search } = Input;

const Doctor_home = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredItems(null);
      return;
    }

    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const getDoctorData = async () => {
    try {
      const res = await axios.get(
        "/api/doctor/getDoctorsForCards"
      );

      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDoctorData();
  }, []);


  return (
    <div className="home-text-section">
      <p className="primary-text">Choose Your Doctor</p>

      <DoctorCorousel />

      <div
        className="container-fluid p-5"
        style={{
          // backgroundImage:
          //   "url('https://c8.alamy.com/comp/2DFX5AR/hand-drawn-seamless-pattern-of-fitness-gym-equipments-doodle-sketch-style-sport-element-drawn-by-digital-brush-pen-illustration-for-icon-frame-background-2DFX5AR.jpg')",
          background: "linear-gradient(to bottom right, #ff7f50, #6495ed)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <center>
          <div
            style={{
              maxWidth: "500px",
              margin: "20px",
            }}
          >
            <Search
              size="large"
              placeholder="Search for Doctors"
              onInput={(e) => handleSearch(e.target.value)}
              
            />
          </div>
        </center>
      </div>

      <div style={{ marginBottom: "100px", marginTop: "50px"}}>
        <div className="row" /*style={{marginLeft: "70px"}}*/>
          {filteredItems
            ? filteredItems.map((doctor) => (
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <div key={doctor._id} className="col-sm-12 col-md-4 col-lg-4">
                    <DoctorCard doctor={doctor} />
                  </div>
                </div>
              ))
            : doctors.map((doctor) => (
                <div key={doctor._id} className="col-sm-12 col-md-4 col-lg-4">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
        </div>
      </div>

      <br />
    </div>
  );
};

export default Doctor_home;
