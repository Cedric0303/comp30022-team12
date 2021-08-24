const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    
    res.json({
        message: 'Signup successful',
        user: req.user,
    })
}

const login = async (req, res, next) => {
    const body = {
        username: req.body.username,
        isAdmin: req.body.isAdmin
    }
    const token = jwt.sign({ user: body }, process.env.SECRET_KEY)
    res.json({ token })
}

module.exports = {
    signup,
    login
}