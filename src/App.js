import AssignmentTracker from "./components/AssignmentTracker.js";
import NewCollegeModuleForm from "./components/NewCollegeModuleForm";
import { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Link,
  useParams
} from "react-router-dom";
import About from "./components/About";
import SingleCollegeModule from "./components/SingleCollegeModule";
import EditCollegeModule from "./components/EditCollegeModule";

// Sample data for testing purposes
const sampleData = [
  {
    id: 1,
    name: "Web Development Frameworks",
    assignmentName: "",
    assignmentDateTimeGivenOut: "",
    assignmentDateTimeGivenDue: "",
    assignmentGrade: "",
    createListOfAssignmentNotes: [{ noteName: "" }]
  },
  {
    id: 2,
    name: "Server Side Programming",
    assignmentName: "",
    assignmentDateTimeGivenOut: "",
    assignmentDateTimeGivenDue: "",
    assignmentGrade: "",
    createListOfAssignmentNotes: [{ noteName: "" }]
  }
];
console.log(sampleData);
function App() {
  // Make the sampleData a state variable so that when it changes the
  // relevant components are also updated.
  const [collegeModules, setCollegeModules] = useState(sampleData);

  const addCollegeModule = (newCollegeModule) => {
    // Generate a random number between 1 and 10000 to use an
    // id (not perfect but will do for now)
    const randomID = Math.floor(Math.random() * 10000) + 1;

    // Add an id property to the newCollegeModule JS object
    newCollegeModule.id = randomID;

    // Add the newCollegeModule JS object to the sampleData array
    // Notice we are using the spread operator
    setCollegeModules([...collegeModules, newCollegeModule]);

    console.log("Sample data is now: ", collegeModules);
  };

  const deleteCollegeModule = (collegeModuleID) => {
    // Create a new array with the relevant college module filtered out
    let updatedCollegeModules = collegeModules.filter(
      (module) => module.id !== collegeModuleID
    );

    // Update the state variable to be this new array
    setCollegeModules(updatedCollegeModules);
  };

  const editCollegeModule = (theEditCollegeModule) => {
    let newCollegeModules = [...collegeModules];

    for (let i = 0; i < newCollegeModules.length; i++) {
      if (newCollegeModules[i].id == theEditCollegeModule.id) {
        newCollegeModules[i] = theEditCollegeModule;
      }
    }

    setCollegeModules(newCollegeModules);
  };

  return (
    <Router>
      <div className="container-sm p-2">
        <header className="p-3 text-center bg-dark text-light rounded-3">
          <Link to="/">
            <h2>Student Assignment Tracker📗</h2>
          </Link>
          <Link to="/about">About</Link>
        </header>
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="row justify-content-center">
                    <div className="col-4">
                      <AssignmentTracker modules={collegeModules} />
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-4">
                      <NewCollegeModuleForm
                        onSubmitHandler={addCollegeModule}
                      />
                    </div>
                  </div>
                </>
              }
            />

            <Route path="/about" element={<About />} />

            <Route
              path="/module/:moduleID"
              element={
                <SingleCollegeModule
                  modules={collegeModules}
                  onDelete={deleteCollegeModule}
                />
              }
            />

            <Route
              path="/edit/:moduleID"
              element={
                <EditCollegeModule
                  modules={collegeModules}
                  onEdit={editCollegeModule}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
