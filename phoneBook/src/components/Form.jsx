const PersonsForm = ({children, onSubmit}) => {
  // console.log("form props", props);
  return (
    <form onSubmit={onSubmit}>
     {children}
    </form>
  );
};


export default PersonsForm;