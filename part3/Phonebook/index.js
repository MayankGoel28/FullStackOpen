require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
//  const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const Person = require('./models/mongo.js')
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('person', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':person :method :url :response-time'))

app.get('/api/persons', (req, res) => {
    console.log('bruh')
    Person.find({}).then(persons => {
        res.json(persons)
    })
})
app.get('/info', (req, res) => {
    const date = new Date()
    Person.countDocuments({}, (err, count) => {
        res.send(`
        <p>There are ${count} entries.</p>
        <p>Today is ${date}.</p>
    `)
    })
})
app.use(morgan('tiny'))

app.get('/api/persons/:id', (req, res, next) => {
    console.log('finding', req.params.id)
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person)
        }
        else {
            res.status(404).end()
        }
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(404).json({
            error: 'content missing'
        })
    }
    const person = new Person({
        name: body.name,
        number: body.number,
        _id: Math.floor(Math.random() * (1000 - 10)) + 10
    })

    person.save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number,
    }
    console.log('yeah we\'re puttinhg')
    //{ runValidators: true, context: 'query' }
    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
