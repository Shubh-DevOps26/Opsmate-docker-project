const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`
        <h1>OpsMate Application</h1>
        <p>Application is running successfully inside Docker.</p>
    `);
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "OpsMate"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`OpsMate running on port ${PORT}`);
});
