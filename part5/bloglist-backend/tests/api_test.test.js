const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogmodel')
const User = require('../models/usermodel')
const jestConfig = require('../jest.config')
const { request } = require('express')
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heWFuayIsImlkIjoiNWYxOGFlNWFkM2I5ZTVmNzUxYzVlMzg2IiwiaWF0IjoxNTk1NDYwMjQzfQ.1TTSh91tmWF-Tf_orHDrvv_bW3KKYfgboW8MrmTpMZM
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

const newUser = {
    username: "Mayank",
    name: "Mayank",
    password: "Goel"
}
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
let token = ''
beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const signup = await api.post('/api/users/').send(newUser)
    const creds = {
        username: newUser.username,
        password: newUser.password
    }
    const login = await api.post('/api/login/').send(creds)
    token = login.body.token

    console.log('the token is \n', token)

    await api.post('/api/blogs/')
        .set('Authorization', `bearer ${token}`)
        .send(initialBlogs[0])

    await api.post('/api/blogs/')
        .set('Authorization', `bearer ${token}`)
        .send(initialBlogs[1])
})

test('getting all blogs', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id parameter is called id and not _id', async () => {
    const res = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    console.log(res.body)
    expect(res.body[0].id).toBeDefined()
})

test('if things are posted well', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const titles = res.body.map(x => x.title)
    expect(res.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('Bond')
    expect(titles).toContain('React patterns')
})

test('if delete works', async () => {
    const res = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const deleterBlog = res.body.filter((obj) => obj.title === 'React patterns')
    const delID = deleterBlog[0].id
    console.log(`/api/blogs/${delID}`)
    await api
        .delete(`/api/blogs/${delID}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
    const newBlogs = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const titles = newBlogs.body.map(x => x.title)
    expect(titles).not.toContain('React patterns')
})

test('if put works', async () => {
    const res = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const putBlog = res.body.filter((obj) => obj.title === 'React patterns')
    const putID = putBlog[0].id
    console.log(`/api/blogs/${putID}`)
    await api
        .put(`/api/blogs/${putID}`)
        .set('Authorization', `bearer ${token}`)
        .send(putterBlog)
        .expect(201)
    const newBlogs = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    const titles = newBlogs.body.map(x => x.title)
    expect(titles).not.toContain('React patterns')
    expect(titles).toContain('Reacton patterns')
})

test('if likes don\'t exist', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(zeroLikesBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const res = await api.get('/api/blogs').set('Authorization', `bearer ${token}`)
    expect(res.body[2].likes).toBe(0)
})

test('if something is undefined', async () => {
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(undefinedBlog)
        .expect(400)
})

test('creation fails with proper status code and message if token is not provided', async () => {
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

jest.setTimeout(30000)
afterAll(() => {
    mongoose.connection.close()
})