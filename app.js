const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
const port = process.env.PORT || 3000;
const postRouter = require('./routers/postRouter.js');
const utils = require('./utils.js');
const checkCredentials = require('./middlewares/checkCredentials.js');
const { generateToken } = require('./middlewares/auth.js');



app.get('/', (req, res) => {
    const htmlContent = utils.readFile('index', 'html');
    res.send(htmlContent);
});

app.get('/login', express.urlencoded({ extended: true }), checkCredentials, (req, res) => {
    const token = generateToken(req.user);
    res.send(token);
});

app.use('/posts', postRouter)

app.use((err, req, res, next) => {
    res.status(err.status).json({
        error: err.message,
        status: err.status
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

module.exports = {
    port
};