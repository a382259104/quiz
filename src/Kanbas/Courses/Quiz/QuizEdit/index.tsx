import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import QuizDetailEdit from "./QuizDetailEdit";
import QuizQustionEdit from "./QuizQustionEdit";


import { Link } from "react-router-dom";

function QuizEdit() {
    let location = useLocation();
    let { pathname } = location;

    // Extract the base path without the last segment
    let basePath = pathname.substring(0, pathname.lastIndexOf('/'));
    
    return (
        <>
            <nav className="nav nav-tabs mt-2">
                <Link to={`${basePath}/details`}
                      className={`nav-link ${pathname.includes(`${basePath}/details`) ? "active" : ""}`}>Details</Link>
                <Link to={`${basePath}/questions`}
                      className={`nav-link ${pathname.includes(`${basePath}/questions`) ? "active" : ""}`}>Questions</Link>
            </nav>
        
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="EditQuizDetail/*" />} />
                    <Route path="/EditQuizDetail/*" element={<QuizDetailEdit />} />
                    <Route path="/EditQuestions/*" element={<QuizQustionEdit />} />
                </Routes>
            </div>
        </>
    )
}

export default QuizEdit