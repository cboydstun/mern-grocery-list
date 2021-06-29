//import dependencies
const express = require("express");
const router = express.Router();

//import Item Model
const Item = require("../models/Item");

//import security middleware
const requireAuth = require("../middleware/auth");

// @GET - api/items - get all items - Public
router.get("/", async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  return res.status(200).json(items);
});

// @GET - api/items - get all items - Private
router.get("/private", requireAuth, async (req, res) => {
  const items = await Item.find().sort({ date: -1 });
  return res.status(200).json(items);
});

// @POST - api/items - create an item - Private
router.post("/", requireAuth, async (req, res) => {
    try {
      const newItem = { name: req.body.name };
      const item = await Item.create(newItem);
      return res.status(201).json(item);
    } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

// @DELETE - api/items/:id - delete an item - Private
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "No item found.",
      });
    }

    await item.remove();

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
});

module.exports = router;