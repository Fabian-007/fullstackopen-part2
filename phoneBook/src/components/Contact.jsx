const Persons = (props) => {
  console.log("props value", props);
  const { person } = props;
  return (
    <>
      <p>
        {person.name} - {person.number}
      </p>
    </>
  );
};

export default Persons;