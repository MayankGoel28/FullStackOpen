const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/usermodel')
const Blog = require('../models/blogmodel')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const blog = await Blog.find({})
    console.log(blog)
    let blogsOfUser = []
    blogsOfUser = blog.filter(eachBlog => {
        if (eachBlog.user) eachBlog.user.id === body.id
    })
    const user = new User({
        username: body.username,
        name: body.name,
        blogs: blogsOfUser,
        passwordHash,
    })
    try {
        const savedUser = await user.save()
        response.json(savedUser)
    }
    catch (err) {
        next(err)
    }
})

module.exports = usersRouter