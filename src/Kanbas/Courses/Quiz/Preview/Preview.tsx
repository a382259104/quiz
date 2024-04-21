// Main Quiz Editor component

import { useParams } from "react-router";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./preview.css";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import { useEffect, useState } from "react";
import { Quiz, findQuizById, findQuestionsByQuiz, Question } from "../../../../Quizzes_And_Questions/client";

function Preview() {

    const { courseId, quizId } = useParams();
    const [questions, setQuestions] = useState<Question[]>([]);


    const [quiz, setQuiz] = useState<Quiz>();



    const fetchQuiz = async () => {
        try {
            const data = await findQuizById(quizId);

            console.log(`This is what we got from the server:${data}`)
            setQuiz((prevQuiz) => ({ ...prevQuiz, ...data }));
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };


    const fetchQuestions = async () => {
        const response = await findQuestionsByQuiz(quizId);
        setQuestions(response);
        console.log(questions)
    };

    useEffect(() => {
        fetchQuiz();
        fetchQuestions();
    }, []);


    // const renderQ = () => {
    //     switch (questionType) {
    //         case "MultipleChoice":
    //             return <MultipleChoice />

    //         case "TrueFalse":
    //             return <TrueFalse />

    //         case "FillInTheBlanks":
    //             <>FillInTheBlanks</>
    //             break;

    //         default:
    //             <>no such Q</>
    //     }
    // }
    return (
        <div>
            {quiz &&
                <>
                    <h1>{quiz.title}</h1>
                    <div className="preview-warning">
                        <AiOutlineExclamationCircle className="preview-icon"/>
                        <p>This is a preview of the published version of the quiz</p>
                    </div>

                </>}






        </div>
    )
}

export default Preview;