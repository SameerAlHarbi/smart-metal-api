const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const metalRouter = require('./router/metal.router');

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
}}));

app.use(express.json());
app.use(metalRouter);


app.listen(port, () => {
    console.log(chalk.greenBright.inverse(`Server is up and runing on port: ${port}`));
});