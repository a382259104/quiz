import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaRocket, FaBan } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createQuiz } from "../../../Quizzes_And_Questions/client";

import { format, isAfter, isBefore, isWithinInterval } from 'date-fns';
//import { quizzes } from "../../Database";
import "./index.css"
import { RxDragHandleDots2, RxMargin } from "react-icons/rx";
import { GrNotes } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
//import * as client from "./client";

import "./index.css";
import { LuFileText } from "react-icons/lu";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";
import { BiBorderAll } from "react-icons/bi";

const API_BASE = process.env.REACT_APP_API_BASE;


function Quizzes() {

  const navigate = useNavigate();
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const Quizzes_API = `${API_BASE}/api/quizzes/${courseId}`
  const findAllQuizzes = async () => {
    const response = await axios.get(Quizzes_API);
    setQuizzes(response.data);
  };


  useEffect(() => {
    findAllQuizzes();
  }, []);



  const handleDeleteQuiz = async (quizId: String) => {
    const response = await axios.delete(
      `${API_BASE}/api/quizzes/${quizId}`
    );
    setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
  }

  const handleSetQuiz = async (quizId: String) => {
    // navigate(`QuizDetails/${quizId}`)
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quizId}`);
  }


  // getCurrentDateInfo
  const getCurrentDateInfo = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);
    const dueDate = new Date(quiz.dueDate);

    let availabilityText = 'Closed';

    if (isBefore(now, availableDate)) {
      availabilityText = `Not available until ${format(availableDate, 'MMM dd \'at\' p')}`;
    } else if (isWithinInterval(now, { start: availableDate, end: availableUntilDate })) {
      availabilityText = 'Available';
    }


    return {
      availabilityText,
      dueText: `Due ${dueDate}`,
    };
  };

  //formats
  const successformat = "me-2 text-success";
  const secondaryFormat = "me-2 text-secondary";


  const handleAddQuiz = async () => {
    // Define the default properties for a new quiz
    const newQuiz = {
      _id: "",
      title: "New Quiz",
      description: "",
      assignedto: "",
      quizType: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: "Yes",
      timeLimit: 0,
      multipleAttempts: "No",
      showCorrectAnswers: "No",
      accessCode: "",
      oneQuestionAtATime: "Yes",
      webcamRequired: "No",
      lockQuestionsAfterAnswering: "No",
      questions: [],
      course: "RS101",
      published: false
    };

    try {
      const quiz = await createQuiz(newQuiz);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quiz._id}`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }




    //   try {
    //     // Dispatch an action to add the new quiz
    //     // Assuming addQuiz is an async thunk, wait for the result
    //     const resultAction = dispatch(addQuiz(newQuiz));
    //     // Get the new quiz id from the result of the dispatched action
    //     const newQuizId = resultAction.payload.id; // Adjust according to your state structure
    //     // Navigate to the Quiz Details page for editing the new quiz
    //     history.push(`/quiz/${newQuizId}/edit`);
    // } catch (err) {
    //     console.error('Failed to create the quiz: ', err);
    // }


  }


  return (
    <>
      <div className="top-buttons">

        <button> <FaEllipsisV /></button>
        <button className="assignment"
          onClick={handleAddQuiz}> <GoPlus /> Quiz</button>
        <input className="search" placeholder="Search for Quiz" />
      </div>

      <hr />
      <ul className="list-group wd-modules">
        <li className="list-group-item">

          {/* This is the header of the Quizzes */}
          <div>
            <RxDragHandleDots2 className="me-2" />
            <GoTriangleDown className="me-2" />
            Quizzes
            <span className="float-end">

              <GoPlus className="ms-2" />
              <FaEllipsisV className="ms-2" />
            </span>
          </div>
          {/* These are the items */}
          <ul className="list-group ">

            {
              quizzes.map((quiz) => (
                <li className="list-group-item" >
                  <RxDragHandleDots2 className="me-2 align-center " />

                  {quiz.isPublished ? (
                    <FaRocket className={successformat} />
                  ) : (
                    <FaRocket className={secondaryFormat} />
                  )}


                  <span>
                    <div className="assignment-description">
                      <Link to="#" className="no-margin">
                        {quiz.title}
                      </Link>
                      <br />
                      <div> {getCurrentDateInfo(quiz).availabilityText}  |
                        {getCurrentDateInfo(quiz).dueText} |
                        {quiz.points} pts | {(quiz.questions).length} Questions
                      </div>
                    </div>
                  </span>

                  <span className="float-end">
                    {/* Change the logic to check if a quiz is published */}
                    {quiz.isPublished ? (
                      <FaCheckCircle className="text-success" />
                    ) : (
                      <FaBan className="text-muted" />
                    )}
                    <FaEllipsisV className="ms-2" />

                    <button onClick={() => handleSetQuiz(quiz._id)} className="goodButton">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteQuiz(quiz._id)} className="goodButton">
                      Delete
                    </button>

                  </span>

                </li>))

            }
          </ul>
        </li >
      </ul >
    </>
  );
}
export default Quizzes;

function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
