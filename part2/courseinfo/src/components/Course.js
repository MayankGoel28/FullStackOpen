import React from 'react'

const Course = ({ courses }) => {
    const EachCourse = ({ course }) => {
      const Header = () => {
        return (
          <h2>{course.name}</h2>
        )
      }
      const Content = ({ part }) => {
        return (
          <p>{part.name} {part.exercises}</p>
        )
      }
      const total = course.parts.reduce((sum, exer) => sum + exer.exercises, 0)
      return (
        <div>
          <Header />
          {course.parts.map(part =>
            <Content key={part.id} part={part} />)
          }
          <b>the total is {total} exercises</b>
        </div>
      )
    }
    return (
      <div>
        {courses.map(course =>
          <EachCourse key={course.id} course={course} />
        )}
      </div>
    )
  }

  export default Course