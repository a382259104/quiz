import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import QuizDetailEdit from "./QuizDetailEdit";
import QuizQustionEdit from "./QuizQustionEdit";
import Nav from "../../../../Nav";

function QuizEdit() {
    return (
        <>
        {/* Bug Here */}
            <Nav />
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