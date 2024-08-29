const express = require("express");

const app = express();

const port = 8888;

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
});
