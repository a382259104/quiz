import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { courses } from "../Database";
import { HiMiniBars3 } from "react-icons/hi2"
import "./index.css"
import { Link } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";

function Courses() {

    const { courseId } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === courseId);
    const subTab = pathname.split("/").pop();

    return (
        <>
            <div className="title">

                <Link className="red-button" to={`/Kanbas/Courses/${courseId}/Home`}>
                    <HiMiniBars3 /></Link>
                <p className="text">{course?.number}.{course?.name} {' > '}
                    {subTab && <span>{subTab}</span>} </p>
                {/* add the name here*/}
            </div>
            <hr className="line" />
            <div className="main-content">
                <div className="align-left"><CourseNavigation/></div>
                <div className="align-right">
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home/>} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Piazza" element={<h1>Piazza</h1>} />
                            <Route path="Assignments" element={<h1>Assignments</h1>} />
                            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                            <Route path="Grades" element={<h1>Grades</h1>} />
                        </Routes>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Courses;

