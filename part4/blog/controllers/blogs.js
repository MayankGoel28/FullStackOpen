const blogRouter = require('express').Router()
const Blog = require('../models/mongo')
const { model } = require('../models/mongo')
const { request, response } = require('express')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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
    await blog.save()
    return (response.status(201).json(blog))
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()  
})

blogRouter.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id,request.body)
    return response.status(201).end()
})

blogRouter

module.exports = blogRouter