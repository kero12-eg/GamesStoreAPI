const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const compression = require("compression");
const httpstatustext = require("./src/utils/httpstatustext");
app.use(cors());
app.use(express.json());
app.use(compression());
const userroutes = require("./src/Routes/userroutes");
const productroutes = require("./src/Routes/productroute");
app.use("/api/users", userroutes);
app.use("/api/products", productroutes);
app.all("/{*splat}", (req, res) => {
   return res.status(404).json({
        status: httpstatustext.ERROR,
        message: "The Resource Is Not Available"
    })
})
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        status: err.statusText || httpstatustext.ERROR,
        message: err.message,
        data : null,
        code : err.statusCode
    })
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});