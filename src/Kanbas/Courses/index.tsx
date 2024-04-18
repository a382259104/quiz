import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { HiMiniBars3 } from "react-icons/hi2"
import "./index.css"
import { Link } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";

import { useState, useEffect } from "react";
import axios from "axios";
import Quizzes from "./Quiz";
import QuizDetails from "./Quiz/QuizDetails";
import QuizEdit from "./Quiz/QuizEdit";
import QuizPreview from "./Quizzes/preview";

const API_BASE = process.env.REACT_APP_API_BASE;

function Courses() {

    const COURSES_API = `${API_BASE}/api/courses`;
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
        const response = await axios.get(
            `${COURSES_API}/${courseId}`
        );
        setCourse(response.data);
    };


    const { courseId } = useParams();
    const { pathname } = useLocation();
    const subTab = pathname.split("/").pop();

    useEffect(() => {
        findCourseById(courseId);
    }, [courseId]);

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
                <div className="align-left"><CourseNavigation /></div>
                <div className="align-right">
                    <div>
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Piazza" element={<h1>Piazza</h1>} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                            <Route path="Grades" element={<h1>Grades</h1>} />
                            <Route path="Quizzes" element={<Quizzes />} />
                            <Route path="Quizzes/QuizDetails/:quizId" element={<QuizDetails />} />
                            <Route path="Quizzes/EditQuizDetail/:quizId/*" element={<QuizEdit />} />
                            <Route path="Quizzes" element={<QuizPreview/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Courses;

