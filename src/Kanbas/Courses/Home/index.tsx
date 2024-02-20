import ModuleList from "../Modules/List";
import CourseStatus from "./CourseStatus";
import "./index.css"; // Adjust the path based on your project structure

function Home() {
  return (

    <div className="d-flex">

      <div className="left d-none d-md-block">
        <ModuleList />
      </div>

      <div className="flex-grow-0 me-2 d-none d-lg-block">
        <CourseStatus />
      </div>

    </div>
  );
}

export default Home;
