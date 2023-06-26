import { Link } from "react-router-dom";
import "../../components/customer-components/Customer.css";
import styles from "../../components/customer-components/Customer_Login.module.css";

const Customer_home = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className={styles.glass}>
        <div className="title flex flex-col items-center">
          <h4 className="text-5xl font-bold py-4">Customer Management</h4>
          <span className="py-2 text-xl w-2/3 text-center text-gray-5"></span>
          <form className="py-1">
            <Link to="/Customer_login">
              <button className={styles.btnHome}> Login</button>
            </Link>
            <br />
            <br />
            <Link to="/Customer_Register">
              <button className={styles.btnHome}> Register</button>
            </Link>
            <br />
            <br />
            <Link to="/">
              <button className={styles.btnHome}> Home</button>
            </Link>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customer_home;
