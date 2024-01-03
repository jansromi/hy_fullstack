
/**
 * Lomake uusille kontakteille
 */
const PhonebookForm = ({ formData, handleInputChange, addContact }) => {

    return (
      <form onSubmit={addContact}>
        <div>
          name:
          <input
            name="newName"
            value={formData.newName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          number:
          <input
            name="newNumber"
            value={formData.newNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default PhonebookForm;