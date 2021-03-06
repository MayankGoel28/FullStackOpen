const blogRouter = require('express').Router()
const Blog = require('../models/blogmodel')
const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blogs = await Blog.find({}).populate("user");
    return response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const token = request.token
    if (!token){
        return (response.status(401).end())
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    let userOfBlog = await User.findById(decodedToken.id)
    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined || blog.url === undefined) {
        return (response.status(400).json({ error: 'missing title' }))
    }
    const users = await User.find({})
    if (blog.user === undefined) {
        blog.user = users[0].id
    }
    console.log('the id is', blog._id)
    userOfBlog.blogs = userOfBlog.blogs.concat(blog._id)
    console.log('concating stuff to \n', userOfBlog)
    await userOfBlog.save()
    await blog.save()
    return (response.status(201).json(blog))
})

blogRouter.delete('/:id', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog){
        response.status(404).end()
    }
    try{
        const blogOfUser = blog.user.toString()===decodedToken.id
        if (blogOfUser){
            await blog.remove()
            return response.status(204).end()
        }
    } catch (e) {
        next(e)
    }
})

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    return response.status(201).end()
})

blogRouter

module.exports = blogRouter