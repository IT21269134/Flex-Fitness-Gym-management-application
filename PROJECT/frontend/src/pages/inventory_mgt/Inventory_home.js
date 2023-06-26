import { useState, useEffect } from "react";
import { useItemsContext } from "../../hooks/inventory-hooks/useItemsContext";
import { Link } from "react-router-dom";
import ItemDetails from "../../components/inventory-components/ItemDetails";
import ItemForm from "../../components/inventory-components/ItemForm";
import { Input, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { PDFDocument, rgb } from "pdf-lib";
import logo from "./logo.png";
import "./Inventory_home.css";

const { Search } = Input;

const Inventory_home = () => {
  const { items, dispatch } = useItemsContext();
  const [filteredItems, setFilteredItems] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/items");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ITEMS", payload: json });
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredItems(null);
      return;
    }

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleDownloadCSV = () => {
    const itemsToExport = filteredItems || items;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const totalExpense = itemsToExport.reduce(
      (total, item) => total + item.price * item.stock,
      0
    );
    const averageExpense = Math.floor(totalExpense / itemsToExport.length);
    const csvData = [
      ["FlexFitness - Inventory management Report"],
      ["                                                  "],
      ["Name", "Price", "Stock", "Expense"],
      ...itemsToExport.map((item) => [
        item.name,
        item.price,
        item.stock,
        item.price * item.stock,
      ]),
      [
        "                                                                                           ",
      ],
      [`Total Expenditure: Rs. ${totalExpense}`],
      [`Average Expense per Product: Rs. ${averageExpense}`],
      [
        "                                                                                           ",
      ],
      [`Generated at ${timestamp}`],
      ["All Rights Reserved - FlexFitness"],
    ];
    const csv = csvData.map((row) => row.join(",")).join("\n");

    const element = document.createElement("a");
    const file = new Blob([csv], { type: "text/csv" });
    element.href = URL.createObjectURL(file);
    element.download = "inventory.csv";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleDownloadPDF = async () => {
    const itemsToExport = filteredItems || items;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const totalExpense = itemsToExport.reduce(
      (total, item) => total + item.price * item.stock,
      0
    );
    const averageExpense = Math.floor(totalExpense / itemsToExport.length);

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 12;
    const lineHeight = fontSize * 1.5;
    const space = 50;
    const margin = 50;
    const x = margin;
    let y = height - margin;

    // Embed the image into the PDF document as a PNG
    const pngImageBytes = await fetch(logo).then((res) => res.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(pngImageBytes);

    // Draw the image onto the first page of the document
    page.drawImage(pngImage, {
      x: 0,
      y: height - margin - 50,
      width: 100,
      height: 100,
    });

    page.drawText("FlexFitness (pvt) Ltd", {
      x: 230,
      y,
      size: 18,
      color: rgb(1, 0, 0),
    });
    y -= lineHeight;

    page.drawText("Inventory management Report", {
      x: 180,
      y,
      size: 18,
      color: rgb(1, 0, 0),
    });
    y -= space;

    const yLine = y + 10;
    page.drawLine({
      start: { x: x, y: yLine },
      end: { x: width - margin, y: yLine },
      thickness: 1,
      color: rgb(0, 0, 0),
    });
    y -= space;
    page.drawText("Name", { x, y, size: fontSize });
    page.drawText("Price (Rs.)", { x: x + 150, y, size: fontSize });
    page.drawText("Stock(No.)", { x: x + 250, y, size: fontSize });
    page.drawText("Expense(Rs.)", { x: x + 350, y, size: fontSize });
    y -= lineHeight;

    for (const item of itemsToExport) {
      page.drawText(item.name, { x, y, size: fontSize });
      page.drawText(item.price.toString(), { x: x + 150, y, size: fontSize });
      page.drawText(item.stock.toString(), { x: x + 250, y, size: fontSize });
      page.drawText((item.price * item.stock).toString(), {
        x: x + 350,
        y,
        size: fontSize,
      });
      y -= lineHeight;
    }
    y -= space;
    page.drawText(`Total Expenditure: Rs. ${totalExpense}`, {
      x,
      y,
      size: fontSize,
    });
    y -= lineHeight;

    page.drawText(`Average Expense per Product: Rs. ${averageExpense}`, {
      x,
      y,
      size: fontSize,
    });
    y -= space;

    page.drawText("All Rights Reserved - FlexFitness", {
      x,
      y,
      size: fontSize,
    });
    y -= lineHeight;
    page.drawText(`Generated at ${timestamp}`, {
      x,
      y,
      size: fontSize,
    });
    y -= lineHeight;

    const pdfBytes = await pdfDoc.save();

    const element = document.createElement("a");
    const file = new Blob([pdfBytes], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = "inventory.pdf";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  return (
    <div className="centerBox">
      <div className="home-text-section">
        <p className="primary-text">Inventory management </p>

        <br />
      </div>

      <div className="home">
        <div className="items">
          <Search
            placeholder="Search items"
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              width: 300,
              marginLeft: 700,
              border: "1px solid black",
              borderRadius: "5px",
            }}
          />
          {(filteredItems || items) &&
            (filteredItems || items).map((item) => (
              <ItemDetails item={item} key={item._id} />
            ))}
          <Button
            onClick={handleDownloadCSV}
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            style={{
              marginTop: 16,
              marginLeft: 820,
              backgroundColor: "#ff7f50",
            }}
          >
            Download as CSV
          </Button>
          <Button
            onClick={handleDownloadPDF}
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            style={{
              marginTop: 16,
              marginLeft: 820,
              backgroundColor: "#ff7f50",
            }}
          >
            Download as PDF
          </Button>
        </div>
        <ItemForm />
      </div>
    </div>
  );
};

export default Inventory_home;
