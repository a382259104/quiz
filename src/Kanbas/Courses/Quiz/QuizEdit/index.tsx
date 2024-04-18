import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router";
import QuizDetailEdit from "./QuizDetailEdit";
import QuizQustionEdit from "./QuizQustionEdit";


import { Link, NavLink } from "react-router-dom";

function QuizEdit() {
    let location = useLocation();
    let { courseId, quizId } = useParams();
    let navigate = useNavigate();

    // This base path should be the path to reach the QuizEdit component (e.g., '/edit/quiz/:id')
    let basePath = `/Kanbas/Courses/${courseId}/Quizzes/EditQuizDetail/${quizId}`;

    
    return (
        <>
            <h1> Quiz Edit</h1>
            <nav className="nav nav-tabs mt-2">
                <NavLink to={`${basePath}/details`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Details
                </NavLink>
                <NavLink to={`${basePath}/questions`} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    Questions
                </NavLink>
            </nav>
        
            <div>
            <Routes>
                <Route index element={<Navigate to="details" replace />} />
                <Route path="details" element={<QuizDetailEdit />} />
                <Route path="questions" element={<QuizQustionEdit />} />
            </Routes>
            </div>
        </>
    )
}

export default QuizEdit