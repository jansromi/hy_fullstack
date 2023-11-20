/**
 * kenttä kontaktifiltterille 
 */
const Filter = ({ filter, setFilter }) => {

    return (
      <div>
        <h2>Filter</h2>
        filter contacts:  
        <input value={filter} onChange={(e) => setFilter(e.target.value)}>
        </input>
      </div>
    )
  }

export default Filter;