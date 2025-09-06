const Course = ({course}) => {
  console.log("course props?", {course});

  return <h1>{course.name}</h1>;
};


export default Course