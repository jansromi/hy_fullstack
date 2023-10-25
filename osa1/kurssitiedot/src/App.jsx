const Header = (props) => {
  return ( 
    <h1>{props.coursename}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.osat.map(osa => (
        <p key={osa.part}>{osa.part} {osa.exercises}</p>
      ))}
    </div>
  )
}

const Total = (props) => {
  let summa = props.osat.reduce((sum, osa) => sum + osa.exercises, 0);

  return (
    <p>Number of exercises {summa}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    { part: 'Fundamentals of React', exercises: 10 },
    { part: 'Using props to pass data', exercises: 7 },
    { part: 'State of a component', exercises: 14 }
  ];

  return (
    <div>
      <Header coursename={course}/>
      <Content osat={parts}/>
      <Total osat={parts}/>
    </div>
  )
}

export default App