import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import QuizEdit from './QuizEdit';
import { Quiz } from '../../../Quizzes_And_Questions/client';
import { findQuizById } from '../../../Quizzes_And_Questions/client';

// Mock function to simulate publishing/unpublishing
const publishQuiz = async (_id: any, published: any) => {
  // Placeholder for actual publish/unpublish logic
  return !published;
};

// const fetchQuizDetails = async (_id) => {
//   // Placeholder for actual API call to fetch quiz details by _id
//   return {
//       _id,
//       title: 'Q1 - HTML',
//       // ... other quiz properties
//   };
// };  
function QuizDetails() {
  const { courseId, quizId } = useParams();
  console.log(`CourseID: ${courseId}, quizid: ${quizId}`)


  const navigate = useNavigate();



  const [quiz, setQuiz] = useState<Quiz>({
    _id: `${quizId}`,
    title: "",
    description: "",
    assignedto: "",
    quizType: "Graded Quiz",
    points: 12,
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


  const handlePublishToggle = async () => {
    const newStatus = await publishQuiz(quiz._id, quiz.published);
    setQuiz({ ...quiz, published: newStatus });
  };

  const handlePreview = () => {
    // Navigate to the Quiz Preview page
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizPreview/${quizId}`);
  };

  const handleEdit = () => {

    console.log(`CourseID: ${courseId}, quizid: ${quiz._id}`)
    if (courseId && quiz?._id) {
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/EditQuizDetail/${quizId}`);
    } else {
      console.error('Missing courseId or quiz._id');
    }
  };


  // For test
  const handleEditNEW = () => {  
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/EditQuizDetail/${quizId}`);
  };


  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const data = await findQuizById(quizId);

      console.log(`This is what we got from the server:${data}`)
      setQuiz((prevQuiz) => ({ ...prevQuiz, ...data }));
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div>
      <h1>Quiz Details</h1>
      <h1>{quiz.title}</h1>
      <div>Quiz Type: {quiz.quizType}</div>
      <div>Points: {quiz.points}</div>
      <div>Assignment Group: {quiz.assignmentGroup}</div>
      <div>Shuffle Answers: {quiz.shuffleAnswers}</div>
      <div>Time Limit: {quiz.timeLimit}</div>
      <div>Multiple Attempts: {quiz.multipleAttempts}</div>
      <div>Show Correct Answers: {quiz.showCorrectAnswers}</div>
      <div>Access Code: {quiz.accessCode}</div>
      <div>One Question at a Time: {quiz.oneQuestionAtATime}</div>
      <div>Webcam Required: {quiz.webcamRequired}</div>
      <div>Lock Questions After Answering: {quiz.lockQuestionsAfterAnswering}</div>

      {quiz.dueDate && <div>Due Date: {new Date(quiz.dueDate).toLocaleString()}</div>}
      {quiz.availableDate && 
      <div>Available Date: {new Date(quiz.availableDate).toLocaleString()}</div>}
      {quiz.untilDate && 
      <div>Until Date: {new Date(quiz.untilDate).toLocaleString()}</div>}
      <button onClick={handlePublishToggle}>
        {quiz.published ? 'Unpublish' : 'Publish'}
      </button>
      <button onClick={handlePreview}>Preview</button>
      <button onClick={handleEdit}>Edit</button>
      {/* For test */}
      <button onClick={handleEditNEW}>Edit New</button>

    </div>
  );
}

export default QuizDetails;

