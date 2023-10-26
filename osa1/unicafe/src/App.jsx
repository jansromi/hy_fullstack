import { useState } from 'react'

/**
 * H1 header component
 * @param {string} text to display
 * @returns header element
 */
const Header = ({ text }) => <h1>{text}</h1>

/**
 * @param {function} handleClick function to call when button is clicked
 * @param {string} text to display on button 
 * @returns button element
 */
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

/**
 * @param {string} text to display
 * @param {number} rating to display
 * @returns div element
 */
const Label = ({text, rating}) => {
  return (
    <div>
      {text} {rating}
    </div>
  )
}

const App = () => {
  // refactor button states to an object
  const [feedback, setFeedback] = useState({
    ratings: {
      good: 0,
      neutral: 0,
      bad: 0
    },
    // increment-method for feedbacks:
    // increment: function(type) == create a function that takes a type as a parameter,
    // representing 'good', 'neutral', 'bad' etc. feedback.
    increment: function(type) {
      setFeedback(prevState => ({
        // object spread syntax, copies all properties from prevState to a new object
        ...prevState,
        ratings: {
          ...prevState.ratings,
          [type]: prevState.ratings[type] + 1
        }
      }));
    },
    // iterate over ratings and return the sum of all values
    total: function() {
      return Object.values(this.ratings).reduce((acc, currentValue) => acc + currentValue, 0);
    },
    // calculate the average of all ratings,
    // good = 1, neutral = 0, bad = -1
    average: function() {
      const { good, neutral, bad } = this.ratings;
      if (good + neutral + bad === 0) {
        return 0;
      }
      return (good - bad) / (good + neutral + bad);
    },
    // calculate the percentage of good ratings
    goodPercentage: function() {
      const { good, neutral, bad } = this.ratings;
      if (good + neutral + bad === 0) {
        return (0) + "%";
      }
      return (good / (good + neutral + bad) * 100) + "%";
    }
  });

  return (
    <div>
      <Header text='Give feedback' />
      <Button handleClick={() => feedback.increment('good')} text='Good' />
      <Button handleClick={() => feedback.increment('neutral')} text='Neutral' />
      <Button handleClick={() => feedback.increment('bad')} text='Bad' />
      <Header text='Statistics' />
      <Label text='Good' rating={feedback.ratings.good} />
      <Label text='Neutral' rating={feedback.ratings.neutral} />
      <Label text='Bad' rating={feedback.ratings.bad} />
      <Label text='All' rating={feedback.total()} />
      <Label text='Average' rating={feedback.average()} />
      <Label text='Positive' rating={feedback.goodPercentage()} />
    </div>
  )
}

export default App