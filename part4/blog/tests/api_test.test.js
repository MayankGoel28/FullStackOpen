const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/mongo')
const jestConfig = require('../jest.config')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 17,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 20,
    },
]

const newBlog = {
    title: 'Bond',
    author: 'Michael Chan',
    url: 'https://reactpatternses.com/',
    likes: 27,
}
const putterBlog = {
    title: 'Reacton patterns',
    author: 'Mic Chan',
    url: 'https://bruhreactpatterns.com/',
    likes: 69,
}
const zeroLikesBlog = {
    title: 'Big F',
    author: 'Michael Chan',
    url: 'https://majorf.com/'
}

const undefinedBlog = {
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 17,
}

beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('getting all blogs', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id parameter is called id and not _id', async () => {
    const res = await api.get('/api/blogs')
    console.log(res.body)
    expect(res.body[0].id).toBeDefined()
})

test('if things are posted well', async () => {
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs')
    const titles = res.body.map(x => x.title)
    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Bond')
    expect(titles).toContain('React patterns')
})

test('if delete works', async () => {
    const res = await api.get('/api/blogs')
    const deleterBlog = res.body.filter((obj) => obj.title === 'React patterns')
    const delID = deleterBlog[0].id
    console.log(`/api/blogs/${delID}`)
    await api
        .delete(`/api/blogs/${delID}`)
        .expect(204)
    const newBlogs = await api.get('/api/blogs')
    const titles = newBlogs.body.map(x => x.title)
    expect(titles).not.toContain('React patterns')
})

test('if put works', async () => {
    const res = await api.get('/api/blogs')
    const putBlog = res.body.filter((obj) => obj.title === 'React patterns')
    const putID = putBlog[0].id
    console.log(`/api/blogs/${putID}`)
    await api
        .put(`/api/blogs/${putID}`)
        .send(putterBlog)
        .expect(201)
    const newBlogs = await api.get('/api/blogs')
    const titles = newBlogs.body.map(x => x.title)
    expect(titles).not.toContain('React patterns')
    expect(titles).toContain('Reacton patterns')
})

test('if likes don\'t exist', async () => {
    await api
        .post('/api/blogs')
        .send(zeroLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs')
    expect(res.body[2].likes).toBe(0)
})

test('if something is undefined', async () => {
    await api
        .post('/api/blogs')
        .send(undefinedBlog)
        .expect(400)
})

jest.setTimeout(30000)
afterAll(() => {
    mongoose.connection.close()
})