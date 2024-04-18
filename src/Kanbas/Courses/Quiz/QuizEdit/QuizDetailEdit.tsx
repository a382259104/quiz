import React, { useState, useEffect } from 'react';
import { Quiz, findAllQuizzes, findQuizById, createQuiz, updateQuiz, deleteQuiz }
  from "../../../../Quizzes_And_Questions/client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css';
import { useNavigate, useParams } from 'react-router';

function QuizDetailEdit() {

  const [showQuestions, setQuestions] = useState(false);

  
  const [quiz, setQuiz] = useState<Quiz>({
    _id: "",
    title: "",
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
  });
  

  const handleCreateQuiz = async () => {
    try {
      await createQuiz(quiz);
      fetchQuizzes();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };


  const handleDeleteQuiz = async (quiz: Quiz) => {
    try {
      await deleteQuiz(quiz);
      fetchQuizzes(); // Refresh quiz list after deletion
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };


  const navigate = useNavigate();
  const { courseId, quizId } = useParams();


  const fetchQuizzes = async () => {
    try {
      const data = await findQuizById(quiz);
      setQuiz(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };



// EVERYTHING BELOW IS THE CODE FROM BEFORE, I WILL START CHANGING EVERYTHING 

  const handleChange = (key: any, value: any) => {
    setQuiz({ ...quiz, [key]: value });
  };


  // Event handler for 'Save'
  const handleSave = async () => {
    console.log('Saving quiz:', quiz);

    if (quiz) {
      try {
        console.log(`this is the quiz id: ${quiz._id}`)
        await updateQuiz(quiz);
        fetchQuizzes();
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    }
    // Navigate to the Quiz Details screen
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quizId}`);
  };

  // Event handler for 'Save and Publish'
  const handleSaveAndPublish = async () => {
    // Save and then publish the quiz
    // await saveQuizDetails(quiz);
    // await publishQuiz(quizId);
    console.log('Saving and publishing quiz:', quiz);

    // Navigate to the Quiz List screen
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  // Event handler for 'Cancel'
  const handleCancel = () => {
    // Navigate back to the Quiz List screen without saving
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  
















  return (
    <form className="quiz-form">
      <label>Title:</label>
      <input
        type="text"
        value={quiz.title}
        placeholder="Unnamed title"
        onChange={(e) => handleChange('title', e.target.value)}
      />

      <label>Quiz instruction:</label>
      {/* <ReactQuill
        theme="snow"
        value={quiz.description}
        onChange={(value: any) => handleChange('description', value)}
        style={{ height: '200px' }}
      /> */}

      <br />
      <br />

      <label htmlFor="points">Points:</label>
      <input type="text" style={{ width: "10%", height: "30px" }} id="points" value={quiz.points} readOnly />

      <label htmlFor="time-limit">Time Limit:</label>
      <input type="number" id="time-limit" value={quiz.timeLimit || 20} onChange={(e) => handleChange('timeLimit', e.target.value)} /> Minutes

      <label>Quiz Type:</label>
      <select value={quiz.quizType} onChange={(e) => handleChange('type', e.target.value)}>
        <option value="Graded Quiz">Graded Quiz</option>
        <option value="Practice Quiz">Practice Quiz</option>
        <option value="Graded Survey">Graded Survey</option>
        <option value="Ungraded Survey">Ungraded Survey</option>
      </select>

      <label>Assignment Group:</label>
      <select value={quiz.assignmentGroup} onChange={(e) => handleChange('assignmentGroup', e.target.value)}>
        <option value="Quizzes">Quizzes</option>
        <option value="Exams">Exams</option>
        <option value="Assignments">Assignments</option>
        <option value="Project">Project</option>
      </select>

      <label>Shuffle Answers:</label>
      <select value={quiz.shuffleAnswers} onChange={(e) => handleChange('shuffleAnswers', e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label htmlFor="multiple-attempts">Multiple Attempts:</label>
      <select id="multiple-attempts" value={quiz.multipleAttempts} onChange={(e) => handleChange('multipleAttempts', e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <label htmlFor="show-correct-answers">Show Correct Answers:</label>
      <input type="text" id="show-correct-answers" value={quiz.showCorrectAnswers} onChange={(e) => handleChange('showCorrectAnswers', e.target.value)} />

      <label htmlFor="access-code">Access Code:</label>
      <input type="text" id="access-code" value={quiz.accessCode} onChange={(e) => handleChange('accessCode', e.target.value)} />

      <label htmlFor="one-question-at-a-time">One Question at a Time:</label>
      <select id="one-question-at-a-time" value={quiz.oneQuestionAtATime} onChange={(e) => handleChange('oneQuestionAtATime', e.target.value)}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label htmlFor="webcam-required">Webcam Required:</label>
      <select id="webcam-required" value={quiz.webcamRequired} onChange={(e) => handleChange('webcamRequired', e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>

      <label htmlFor="lock-questions-after-answering">Lock Questions After Answering:</label>
      <select id="lock-questions-after-answering" value={quiz.lockQuestionsAfterAnswering} onChange={(e) => handleChange('lockQuestionsAfterAnswering', e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
      </select>


      <label>Due Date:</label>
      <input
        type="date"
        value={quiz.untilDate ? quiz.untilDate.toISOString().slice(0, 10) : ''}
        onChange={(e) => handleChange('dueDate', e.target.value)}
      />

      <label htmlFor="available-date">Available Date:</label>
      <input type="date" id="available-date" value={quiz.availableDate ? quiz.availableDate.toISOString().slice(0, 10) : ''}
       onChange={(e) => handleChange('availableDate', e.target.value)} />

      <label htmlFor="until-date">Until Date:</label>
      <input type="date" id="until-date" value={quiz.untilDate ? quiz.untilDate.toISOString().slice(0, 10) : ''}
       onChange={(e) => handleChange('untilDate', e.target.value)} />


      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={handleSaveAndPublish}>Save and Publish</button>
      <button type="button" onClick={handleCancel}>Cancel</button>

    </form>
  );
}

export default QuizDetailEdit;
