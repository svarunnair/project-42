const { Router } = require("express");
const serviceController = Router();

serviceController.get("/", (req, res) => {
  try {
    res.send("service");
  } catch (err) {
    res.send(err);
  }
});


serviceController.post('/',(req,res)=>{
  
})

module.exports = { serviceController };
