import { useState } from "react";
import { Question } from "../../../Quizzes_And_Questions/client";

function QuizPreview() {

    const [questions, setQuestions] = useState<Question[]>([]);
    

    return(
        <>
        <h1>?</h1>
        </>
    );
}

export default QuizPreview;