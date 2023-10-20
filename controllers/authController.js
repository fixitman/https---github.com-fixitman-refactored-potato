const { User } = require('../models')
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {

    if (!req.body || !req.body.username || !req.body.password) {
        return res.sendStatus(400)
    }
    const { username, password } = req.body
    try {
        var user = await User.findOne({ where: { username: username } })
        if (!user) {
            return res.sendStatus(401)
        }

        let match = await bcrypt.compare(password, user.pwHash)

        if (!match) {
            return res.sendStatus(401)
        }

        let retObj = {
            user:{
                id: user.id,
                email: user.email,
                username: user.username
            },
            csrfToken: req.csrfToken
        }
        
        req.session.user = retObj.user        
        
        res.status(200).json(retObj)
    } catch (error) {
        next(error)
    }
}

const register = async (req, res, next) => {

    if (!req.body) {
        return res.status(400).end()
    }
    const { username, password, verify, email } = req.body

    if (!username || !password || !verify || !email) {
        return res.status(400).send('incomplete data');
    }


    if (password !== verify) {
        return res.status(400).send('Passwords do not match')
    }

    try {
        let existingUser = await User.findOne({ where: { username } })

        if (existingUser) {
            return res.status(409).send('user already exists')
        }

        let pwHash = await bcrypt.hash(password, 10)

        let user = await User.create({ username, pwHash, email })

        user.pwHash = undefined
        user.createdAt = undefined
        user.updatedAt = undefined

        req.session.user = user

        res.status(201).json(user)

    } catch (error) {
        next(error)
    }
}

const logout = (req, res, next) => {
    try {
        req.session.destroy(() => { })
        res.send('GOODBYE!')
    } catch (error) {
        next(error)
    }
}

const requireAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.sendStatus(401);
    }
    next()
}

const getUser = (req, res) => {
    console.log(req.session)
    let ret = req.session?.user ? 
        {   user: req.session.user,
            csrfToken : req.session.simpleCsrfToken
        } : null
    res.json(ret)
}



module.exports = { login, register, logout, requireAuth, getUser }