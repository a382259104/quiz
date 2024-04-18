import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizEdit from './QuizEdit';

// Mock function to simulate publishing/unpublishing
const publishQuiz = async (id:any, isPublished:any) => {
    // Placeholder for actual publish/unpublish logic
    return !isPublished;
};

  
function QuizDetails() {
  let { id } = useParams(); // This hook gives us access to the URL parameters
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState({
        id,
        title: 'Q1 - HTML',
        type: 'Graded Quiz',
        points: 29,
        assignmentGroup: 'QUIZZES',
        shuffleAnswers: 'No',
        timeLimit: '20 Minutes',
        multipleAttempts: 'No',
        showCorrectAnswers: 'After Submission',
        accessCode: '',
        oneQuestionAtATime: 'Yes',
        webcamRequired: 'No',
        lockQuestionsAfterAnswering: 'No',
        dueDate: '2024-04-30T23:59', // ISO string format for date
        availableDate: '2024-04-01T00:00',
        untilDate: '2024-05-01T23:59',
        isPublished: false,
      });
    
    
      const handlePublishToggle = async () => {
        const newStatus = await publishQuiz(quiz.id, quiz.isPublished);
        setQuiz({ ...quiz, isPublished: newStatus });
      };
    
      const handlePreview = () => {
        // Navigate to the Quiz Preview page
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizPreview/${quiz.id}`);
      };
    
      const handleEdit = () => {
        // Navigate to the Quiz Editor page
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/EditQuizDetail/${quiz.id}`);
      };
  
  return (
    <div>
      <h1>Quiz Details</h1>
      <h1>{quiz.title}</h1>
      <div>Quiz Type: {quiz.type}</div>
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
      <div>Due Date: {new Date(quiz.dueDate).toLocaleString()}</div>
      <div>Available Date: {new Date(quiz.availableDate).toLocaleString()}</div>
      <div>Until Date: {new Date(quiz.untilDate).toLocaleString()}</div>
      <button onClick={handlePublishToggle}>
        {quiz.isPublished ? 'Unpublish' : 'Publish'}
      </button>
      <button onClick={handlePreview}>Preview</button>
      <button onClick={handleEdit}>Edit</button>
      
    </div>
  );
}

export default QuizDetails;

