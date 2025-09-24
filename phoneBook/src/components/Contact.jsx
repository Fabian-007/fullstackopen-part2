const Persons = (props) => {
  console.log("props value", props);
  const { person, handleDelete } = props;
  return (
    <>
      <p>
        {person.name} - {person.number} <button onClick={handleDelete}>delete</button>
      </p>
      
    </>
  );
};

export default Persons;