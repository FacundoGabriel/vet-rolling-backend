require("./db/config.db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.use("/api", require("./routes/index.routes"));

app.listen(process.env.PORT || 4000, () => {
  console.log("servidor prendido en el puerto: ", process.env.PORT || 4000);
});
