const Header = (props) => {
  return ( 
    <h1>{props.coursename}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.osat.map(osa => (
        <Part key={osa.name} part={osa.name} exercises={osa.exercises} />
      ))}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  let summa = props.osat.reduce((sum, osa) => sum + osa.exercises, 0);

  return (
    <b>Number of exercises {summa}</b>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header coursename={props.course.name} />
      <Content osat={props.course.parts} />
      <Total osat={props.course.parts} />
    </div>
  )
}

const Courses = (props) => {
  return (
    <div>
      {props.courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses courses={courses} />
    </div>
  )
}

export default App