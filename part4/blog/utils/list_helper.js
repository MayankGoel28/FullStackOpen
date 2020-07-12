const lod = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((a, b) => a += b.likes, 0)
    return total
}

const maxLikes = (blogs) => {
    return blogs.reduce((maxlikes, elem) => maxlikes > elem.likes ? maxlikes : elem.likes, 0)
}

const maxBlogs = (blogs) => {
    const authorCount = lod.reduce(blogs, (total, next) => {
        total[next.author] = (total[next.author] || 0) + 1
        return total
    }, {})
    return Object.keys(authorCount).reduce((a, b) => authorCount[a] > authorCount[b] ? a : b);
}

const maxLikesBlog = (blogs) => {
    const LikesCount = lod.reduce(blogs, (total, next) => {
        total[next.author] = (total[next.author] || 0) + next.likes
        return total
    }, {})
    console.log(LikesCount)
    return Object.keys(LikesCount).reduce((a, b) => LikesCount[a] > LikesCount[b] ? a : b);
}

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
    maxBlogs,
    maxLikesBlog
}