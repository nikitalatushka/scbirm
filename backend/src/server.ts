console.log("'Hello world' from ./src/server");

import express from "express";

const app = express ();
const port = 9090;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`App is listening on port ${port} from ./src/server`)
});