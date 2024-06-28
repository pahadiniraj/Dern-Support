const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const loadRoutes = require("./Routes/Route");

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(express.json(), express.urlencoded({ extended: true }));

loadRoutes(app);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
