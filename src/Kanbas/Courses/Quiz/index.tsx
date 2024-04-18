import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle, FaRocket, FaBan } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { format, isAfter, isBefore, isWithinInterval } from 'date-fns';
//import { quizzes } from "../../Database";
import "./index.css"
import { RxDragHandleDots2 } from "react-icons/rx";
import { GrNotes } from "react-icons/gr";
import { GoPlus } from "react-icons/go";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuizzes,
  deleteQuizzes,
  updateQuizzes,
  setQuiz,
  setQuizzes
} from "./reducer";
import { KanbasState } from "../../store";
//import * as client from "./client";

import "./index.css";
import { LuFileText } from "react-icons/lu";
import { GoTriangleDown, GoTriangleRight } from "react-icons/go";
import { CiCircleCheck } from "react-icons/ci";
import axios from "axios";

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
      dueText: `Due ${format(dueDate, 'MMM dd \'at\' p')}`,
    };
  };

  //formats
  const successformat = "text-success";
  const secondaryFormat = "text-secondary";


  const handleAddQuiz = async () => {
    // Define the default properties for a new quiz
    const newQuiz = {
      title: 'New Quiz',
      Id: 123
    };
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
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${newQuiz.Id}`);
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
                  <RxDragHandleDots2 className="me-2 align-center" />
                  <FaRocket className={successformat} />

                  <div className="assignment-description">
                    <Link to="#" className="no-margin">
                      {quiz.title}
                    </Link>
                    <br />
                    Quiz Description
                    {/* // Call getCurrentDateInfo for each quiz */}
                    {/* const {aval, due} = getCurrentDateInfo(quiz); */}

                <div>availabilityText</div>  Availability info
                    <div>dueDate</div>
                    <div>{quiz.points} pts | {quiz.numberOfQuestions} Questions</div>



                  </div>
                  <span className="float-end">
                    {/* Change the logic to check if a quiz is published */}
                    {quiz.isPublished ? (
                      <FaCheckCircle className="text-success" />
                    ) : (
                      <FaCheckCircle className="text-muted" />
                    )}
                    <FaEllipsisV className="ms-2" />
                    <span>
                      <button onClick={() => dispatch(setQuiz(quiz))}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteQuiz(quiz._id)}>
                        Delete
                      </button>

                    </span>
                  </span>

                </li>))

            }

            {/* published */}
            <li className="list-group-item" >
              <RxDragHandleDots2 className="me-2 align-center" />
              <FaRocket className={successformat} />

              <div className="assignment-description">
                <Link to="#" className="no-margin">
                  Quiz Title
                </Link>
                {/* <span className="float-end">
                                        {/* Change the logic to check if a quiz is published */}
                {/* {quiz.isPublished ? (
                                            <FaCheckCircle className="text-success" />
                                        ) : (
                                            <FaCheckCircle className="text-muted" />
                                        )}
                                        <FaEllipsisV className="ms-2" />
                              </span>   */}

                <br />
                Quiz Description
              </div>
              <span className="float-end">
                {/* <button onClick={() => dispatch(setQuiz(quiz))}>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteQuiz(quiz._id)}>
                                Delete
                            </button> */}
                <FaCheckCircle className={successformat} /><FaEllipsisV className="ms-2" />

                <button>Edit</button>
                <button>Delete</button>

              </span>
            </li>

            {/* unpublished */}

            <li className="list-group-item" >
              <RxDragHandleDots2 className="me-2 align-center" />
              <FaRocket className={secondaryFormat} />

              <div className="assignment-description">
                <Link to="#" className="no-margin">
                  Quiz Title
                </Link>
                <br />
                Quiz description


              </div>
              <span className="float-end">

                <FaBan className={secondaryFormat} />  <FaEllipsisV className="ms-2" />
                <button>Edit</button>
                <button>Delete</button>
              </span>
            </li>


            {/* {quizzes.map((quiz: any) => (
              <li className="list-group-item" >
                <RxDragHandleDots2 className="me-2 align-center" />
                <GrNotes className="me-2 completed" />

                <div className="assignment-description">
                  <Link to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`} className="no-margin">
                    {quiz.title}
                  </Link>
                  <br />
                  hiii
                </div>
                <span className="float-end">
                  <FaCheckCircle className="text-success" /><FaEllipsisV className="ms-2" /></span>
              </li>))} */}
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
