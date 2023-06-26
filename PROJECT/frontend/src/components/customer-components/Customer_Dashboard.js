import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styles from "./Customer_dash.module.css";
import { Button, Modal, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver"; // Import file-saver library for saving files

const CustomerDash = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username || row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Created date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className={styles.btn_update} onClick={() => handleEdit(row)}>
            Update
          </button>
          <button
            className={styles.btn_delete}
            onClick={() => handleDelete(row._id)}
          >
            Remove
          </button>
        </>
      ),
    },
  ];

  const handleCustomersFilter = () => {
    setFilteredCustomers(customers.filter((customer) => customer.isCustomer));
    setActiveFilter("customers");
  };

  const handleCoachesFilter = () => {
    setFilteredCustomers(customers.filter((customer) => customer.isCoach));
    setActiveFilter("coaches");
  };

  const handleDoctorsFilter = () => {
    setFilteredCustomers(customers.filter((customer) => customer.isDoctor));
    setActiveFilter("doctors");
  };

  const handleEdit = (row) => {
    setIsModalVisible(true);
    form.setFieldsValue({
      username: row.username || row.name,
      email: row.email,
      id: row._id,
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setIsLoading(true);
        const updatedCustomer = {
          username: values.username,
          email: values.email,
        };
        axios
          .patch(
            `http://localhost:4000/api/updateUser/${values.id}`,
            updatedCustomer
          )
          .then((res) => {
            message.success("Update Successfully");
            setIsLoading(false);
            setIsModalVisible(false);
            const updatedCustomers = [...customers];
            const index = updatedCustomers.findIndex(
              (c) => c._id === values.id
            );
            updatedCustomers[index] = {
              ...updatedCustomers[index],
              ...updatedCustomer,
            };
            setCustomers(updatedCustomers);
            setFilteredCustomers(updatedCustomers);
          })
          .catch((err) => {
            message.error("Failed to update customer");
            setIsLoading(false);
            console.error(err);
          });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Do you want to delete this Account?",
      onOk: () => {
        axios
          .delete(`http://localhost:4000/api/delete/${id}`)
          .then((res) => {
            message.success("Delete Successfully", 5000);
            window.location.reload();
          })
          .catch((err) => {
            message.error("Failed to delete customer");
            console.error(err);
          });
      },
      okButtonProps: {
        style: { backgroundColor: "red", borderColor: "red" },
      },
    });
  };
  useEffect(() => {
    axios
      .get("/api/Customer_Dashboard")
      .then((res) => {
        setCustomers(res.data);
        setFilteredCustomers(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(
        (customer) =>
          (customer.username && customer.username.includes(searchQuery)) ||
          (customer.name && customer.name.includes(searchQuery))
      )
    );
  }, [searchQuery, customers]);

  const handleDownload = () => {
    const itemsToExport = filteredCustomers || customers;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const csvData = [
      ["FlexFitness - Customer management Report"],
      ["                                                  "],
      ["Username", "Email", "Created date"],
      ...itemsToExport.map((item) => [
        item.username || item.name,
        item.email,
        new Date(item.createdAt).toLocaleDateString(),
      ]),
      [
        "                                                                                           ",
      ],
      [`Report Generated at ${timestamp}`],
      ["All Rights Reserved - FlexFitness"],
    ];

    const csv = csvData.map((row) => row.join(",")).join("\n");

    const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(file, "customers.csv");
  };

  return (
    <div className={styles.contentbody}>
      <div className={styles.filters}>
        <Button
          onClick={handleCustomersFilter}
          className={activeFilter === "customers" ? styles.active_filter : ""}
        >
          Customers
        </Button>
        <Button
          onClick={handleCoachesFilter}
          className={activeFilter === "coaches" ? styles.active_filter : ""}
        >
          Coaches
        </Button>
        <Button
          onClick={handleDoctorsFilter}
          className={activeFilter === "doctors" ? styles.active_filter : ""}
        >
          Doctors
        </Button>
      </div>
      <div>
        <section className={styles.content_section}>
          <div className={styles.search_bar}>
            <Input
              placeholder="Search by username"
              onChange={handleSearch}
              value={searchQuery}
            />
          </div>
          <div className={styles.content_table}>
            <DataTable
              columns={columns}
              data={filteredCustomers}
              pagination
              responsive
            />
          </div>
          <Button
            onClick={handleDownload}
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              marginLeft: "1100px",
              marginTop: "10px",
            }}
          >
            Download as CSV
          </Button>
        </section>
        <Modal
          title="Edit Customer"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={isLoading}
              onClick={handleOk}
              style={{ backgroundColor: "blue", borderColor: "blue" }}
            >
              Update
            </Button>,
          ]}
        >
          <Form form={form}>
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerDash;
