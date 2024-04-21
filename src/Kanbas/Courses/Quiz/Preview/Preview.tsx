// Main Quiz Editor component

import { useParams } from "react-router";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GrWaypoint } from "react-icons/gr";
import { RxTriangleRight } from "react-icons/rx";
import { TfiPencil } from "react-icons/tfi";
import { GoQuestion } from "react-icons/go";
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

    const formatDate = () => {
        const options = {
            month: 'short' as const,
            day: 'numeric' as const,
            hour: 'numeric' as const,
            minute: 'numeric' as const,
            hour12: true as const,
        };
        const date = new Date();
        return date.toLocaleString('en-US', options);
    };

    useEffect(() => {
        fetchQuiz();
        fetchQuestions();
    }, []);

    const renderAnswers = (question: Question) => {
        switch (question.type) {
            case "MultipleChoice":
                return (
                    <div>
                        {question.choices?.map((choice, index) => (
                            <div key={index}>
                                <hr />
                                <input type="radio" id={`choice-${index}`} name={`choice`} value={choice} />
                                <label htmlFor={`choice-${index}`}>{choice}</label>

                            </div>
                        ))}
                    </div>
                );
            case "TrueFalse":
                return (
                    <div>
                        <hr />
                        <label>
                            <input type="radio" name={`truefalse-${question._id}`} value="true" /> True
                        </label>
                        <hr />
                        <label>
                            <input type="radio" name={`truefalse-${question._id}`} value="false" /> False
                        </label>
                    </div>
                );
            case "FillInTheBlanks":
                return (
                    <div key={question._id}>
                        {question.blanks?.map((blank, index) => (
                            <div key={index}>
                                <label className="same-line-container">
                                    <label>{index + 1}.</label>
                                    <input type="text" />
                                </label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return <div key={question._id}>No such question type</div>;
        }
    };

    return (
        <div>
            {quiz &&
                <>
                    <h1>{quiz.title}</h1>
                    <div className="preview-warning">
                        <AiOutlineExclamationCircle className="preview-icon" />
                        <p>This is a preview of the published version of the quiz</p>
                    </div>
                    <p className="preview-start">Started: {formatDate()}</p>
                    <h1>Quiz Instructions</h1>
                    <hr className="preview-bold" />
                </>}
            {questions && questions.map((question, index) => (
                <div className="preview-questions" key={index}>
                    {/* <CgPentagonRight className="icon" /> */}
                    <GrWaypoint className="icon" />
                    <div className="questionBox">
                        <div className="title">
                            <p>{question.title}</p>
                            <p className="points">{question.points} pts</p>
                        </div>
                        <div className="question">
                            <p>{question.question}</p>
                        </div>
                        <div className="answers">

                            {renderAnswers(question)}
                        </div>
                    </div>

                </div>
            ))}
            <div className="nextButton">
                <button>Next <RxTriangleRight />

                </button>
            </div>
            <div className="submitQuiz">
                <p>Quiz saved at {formatDate()}</p>
                <button>Submit Quiz</button>
            </div>
            <div className="keepEditing">
                <TfiPencil className="icon" />
                <p>Keep Editing This Quiz</p>
            </div>

            <div className="questionSelector">
                <h2>Questions</h2>
                <div className="line">
                    {questions && questions.map((question, index) => (
                        <div key={index}>
                            <label className="same-line-container">
                                <GoQuestion/>
                                <label className="red-bold">Question {index + 1}</label>
                            </label>
                        </div>
                    ))}
                </div>
            </div>




        </div>
    )
}

export default Preview;