const { Router } = require("express");
const depController = Router();

depController.get("/", (req, res) => {
  try {
    res.send("dep");
  } catch (err) {
    res.send(err);
  }
});

module.exports = { depController };
