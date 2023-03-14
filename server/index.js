const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

app.post("/", (req, res) => {
  console.log(`/`, req.body);
  const result = {
    res: req.body,
  };
  return res.json(JSON.stringify(result));
});
