const blogRouter = require('express').Router()
const Blog = require('../models/blogmodel')
const User = require('../models/usermodel')
//const { request, response } = require('express')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user");
    return response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) {
        blog.likes = 0
    }
    if (blog.title === undefined || blog.url === undefined) {
        return (response.status(400).json({ error: 'missing title' }))
    }
    const users = await User.find({})
    if(blog.user === undefined){
        blog.user = users[0].id
    }
    let userOfBlog = await User.findById(blog.user)
    console.log('the id is', blog._id)
    userOfBlog.blogs = userOfBlog.blogs.concat(blog._id)
    console.log('concating stuff to \n',userOfBlog)
    await userOfBlog.save()
    await blog.save()
    return (response.status(201).json(blog))
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    return response.status(201).end()
})

blogRouter

module.exports = blogRouter