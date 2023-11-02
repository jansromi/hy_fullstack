import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Anecdote = ({ anecdote }) => (
  <div>
    {anecdote}
  </div>
)

const Votes = ({ votes }) => (
  <div>
    has {votes} votes
  </div>
)

const Header = ({ text }) => (
  <h1>{text}</h1>
)

const MostVotes = ({ anecdotes }) => {
  // return index of anecdote with most votes
  const index = anecdotes.reduce((maxIndex, current, currentIndex, arr) => {
    return current.votes > arr[maxIndex].votes ? currentIndex : maxIndex;
  }, 0);

  return (
    <div>
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[index].text}/>
      <Votes votes={anecdotes[index].votes}/>
    </div>
  
  )
}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      text: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      votes: 0
    },
    {
      text: 'The only way to go fast, is to go well.',
      votes: 0
    }
  ]);

  const [selected, setSelected] = useState(0)

  // when vote is clicked, increment and update votes
  const vote = () => {
    const updatedAnecdotes = [...anecdotes]; 
    updatedAnecdotes[selected] = {
      ...updatedAnecdotes[selected],
      votes: updatedAnecdotes[selected].votes + 1,
    };
    setAnecdotes(updatedAnecdotes); 
  };
   
  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected].text}/>
      <Votes votes={anecdotes[selected].votes}/>
      <Button onClick={() => vote()} text="vote" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote" />
      <MostVotes anecdotes={anecdotes} />
    </div>
  )
}

export default App