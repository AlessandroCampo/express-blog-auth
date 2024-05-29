const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
const postRouter = require('./routers/postRouter.js');
const utils = require('./utils.js');



app.get('/', (req, res) => {
    const htmlContent = utils.readFile('index', 'html');
    res.send(htmlContent);
});

app.use('/posts', postRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`An error has occurred: ${err.message}`);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

module.exports = {
    port
};