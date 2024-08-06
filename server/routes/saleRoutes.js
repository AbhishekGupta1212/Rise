const express = require("express");
const { getAllSales, addSales, getSale, deleteSale, updateSale, searchSale, addItem, getAllItems, getItem, deleteItem } = require("../controller/saleController");

saleRouter = express.Router();


saleRouter.get("/", getAllSales)
saleRouter.post("/", addSales)
saleRouter.get("/:id", getSale)
saleRouter.patch("/:id", updateSale)
saleRouter.delete("/:id", deleteSale)
saleRouter.get("/search", searchSale)
saleRouter.post("/item", addItem)
saleRouter.get("/item", getAllItems)
saleRouter.get("/item/:id", getItem)
saleRouter.delete("/item", deleteItem)

module.exports = { saleRouter }