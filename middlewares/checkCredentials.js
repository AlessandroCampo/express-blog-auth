

module.exports = (req, res, next) => {
    const { username, password } = req.body;
    console.log(req.body)
    const users = require('../db/users.json');
    const user = users.find(u => u.password === password && u.username === username);
    if (!user) {
        return res.status(404).json('Username or password are not correct');
    }
    req.user = user;
    next();
}