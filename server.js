const express = require("express");
const app = express();

require('./startup/config')();
require('./startup/middlewares')(app);
require('./startup/routes')(app);
require('./startup/db')();

app.use((req, res) => {
    res.send("No found url");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
