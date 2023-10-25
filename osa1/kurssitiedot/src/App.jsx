const Header = (props) => {
  return ( 
    <h1>{props.coursename}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
    <Part part={props.osat[0].part} exercises={props.osat[0].exercises} />
    <Part part={props.osat[1].part} exercises={props.osat[1].exercises} />
    <Part part={props.osat[2].part} exercises={props.osat[2].exercises} />
    </div>

    /*
    <div>
      {props.osat.map(osa => (
        <Part key={osa.part} part={osa.part} exercises={osa.exercises} />
      ))}
    </div>
    */
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