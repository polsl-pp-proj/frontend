const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "dist", "frontend")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "frontend", "index.html"));
});

app.listen(3000, () => {
    console.log("started listening...");
});
