const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 3000;
const postRouter = require('./routers/postRouter.js');
const utils = require('./utils.js');
const checkCredentials = require('./middlewares/checkCredentials.js');
const { generateToken } = require('./middlewares/auth.js');



app.get('/', (req, res) => {
    const htmlContent = utils.readFile('index', 'html');
    res.send(htmlContent);
});

app.post('/login', express.urlencoded({ extended: true }), checkCredentials, (req, res) => {
    const token = generateToken(req.user);
    res.cookie('token', token).json({
        message: 'login succesful'
    });
});

app.use('/posts', postRouter)

app.use((err, req, res, next) => {
    const status = err.status || 500
    res.status(status).json({
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