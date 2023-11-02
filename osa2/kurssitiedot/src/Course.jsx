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

export default Course