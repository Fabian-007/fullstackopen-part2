const Course = ( {course}) => {
  console.log("course props?",  {course});
  
  return (
    <Header courseName = {course}/>
  )
};

const Header = (props) => {
  console.log("Header component received props:", props);
  return <h1>{props.courseName}</h1>;
};

const Content = (props) => {
  const { parts } = props;
  console.log("content props?", props);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Part = (props) => {
  console.log("part props?", props);
  return (
    <>
    <p>
      {props.name} {""} {props.exercise}
    </p>
    <></>
    </>

  );
};

const Total = ({ parts }) => {
  console.log("total props?", { parts });
  const total = parts.reduce((acc, part) => {
    console.log("what is happening here", acc, part);
    return acc + part.exercises;
  }, 0);

  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  console.log("app is working...?");
  const course = [
    {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },

      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },

      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ]
  },

   {
    name: "Node.js",
    id: 2,
    parts: [
      { name: "Routing",
         exercises: 3,
          id: 1 },

      { name: "Middlewares", 
        exercises: 7,
        id: 2 },
    ],
  }
  ]

  return (
    <div>
     {course.map(c => (
      <>
      <Course course ={c.name}/>
      <Content parts = {c.parts}/>
      <Total parts = {c.parts}/>
      </>
     ))}
    </div>
  );
};

export default App;
