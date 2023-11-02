const Header = (props) => {
  return ( 
    <h1>{props.coursename}</h1>
  )
}

const Content = (props) => {
  return (
    
    <div>
    <Part part={props.osat[0].name} exercises={props.osat[0].exercises} />
    <Part part={props.osat[1].name} exercises={props.osat[1].exercises} />
    <Part part={props.osat[2].name} exercises={props.osat[2].exercises} />
    </div>
    
    /*
    <div>
      {props.osat.map(osa => (
        <Part key={osa.name} part={osa.name} exercises={osa.exercises} />
      ))}
    </div> */
    
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header coursename={course.name}/>
      <Content osat={course.parts}/>
      <Total osat={course.parts}/>
    </div>
  )
}

export default App