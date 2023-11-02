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

const App = () => {
  const course = {
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
        name: 'SQL databases',
        exercises: 17,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}


export default App