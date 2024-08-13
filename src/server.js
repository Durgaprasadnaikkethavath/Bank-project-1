const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Durga_Coding_Bank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  accountNumber: Number,
  branch: String,
  phoneNumber: Number,
});

const Customer = mongoose.model("Customer", userSchema);

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password, accountNumber, branch, phoneNumber } = req.body;
    const newCustomer = new Customer({
      username,
      password,
      accountNumber,
      branch,
      phoneNumber,
    });
    await newCustomer.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({ username });
    if (!customer) {
      res.status(401).json({ message: "Invalid username" });
    }
    if (customer.password !== password) {
      res.status(401).json({
        message: "Invalid password",
      });
      res.status(200).json({
        message: "Login successful",
        customer: {
          username: customer.username,
          accountNumber: customer.accountNumber,
          branch: customer.branch,
          phoneNumber: customer.phoneNumber,
          balance: customer.balance,
        },
      });
      console.log(customer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
