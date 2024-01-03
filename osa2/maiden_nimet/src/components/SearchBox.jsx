const Searchbox = ({ filter, setFilter }) => {
  return (
    <div>
      Search countries:
      <input value={filter} onChange={(e) => setFilter(e.target.value)}>
      </input>
    </div>
  )
}

export default Searchbox