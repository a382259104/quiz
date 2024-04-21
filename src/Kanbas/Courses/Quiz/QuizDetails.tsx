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
    timeLimit: 20,
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

      <div className='float-end'>
        <button onClick={handlePublishToggle} className='quiz-detail-buttons '>
          {quiz.published ? 'Unpublish' : 'Publish'}
        </button>
        <button onClick={handlePreview} className='quiz-detail-buttons'>Preview</button>
        <button onClick={handleEdit} className='quiz-detail-buttons'>Edit</button>
      </div>
      <br/>
      <hr />

      <h1>{quiz.title}</h1>

      <table>
        <tbody className="quizDetailTable">
          <tr>
            <td>Quiz Type</td>
            <td>{quiz.quizType}</td>
          </tr>

          <tr>
            <td>Points</td>
            <td>{quiz.points}</td>
          </tr>

          <tr>
            <td>Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>

          <tr>
            <td>Shuffle Answers</td>
            <td>{quiz.shuffleAnswers}</td>
          </tr>


          <tr>
            <td>Time Limit</td>
            <td>{quiz.timeLimit}</td>
          </tr>


          <tr>
            <td>Multiple Attempts</td>
            <td>{quiz.multipleAttempts}</td>
          </tr>

          <tr>
            <td>Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>

          <tr>
            <td>Access Codes</td>
            <td>{quiz.accessCode}</td>
          </tr>


          <tr>
            <td>One Question at a Time</td>
            <td>{quiz.oneQuestionAtATime}</td>
          </tr>

          <tr>
            <td>Webcam Required</td>
            <td>{quiz.webcamRequired}</td>
          </tr>

          <tr>
            <td>Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering}</td>
          </tr>
        </tbody>

      </table>

      <br />

      <table className='quizTableButtom'>
        <thead>
          <th>Due</th>
          <th>For</th>
          <th>Avaliable from</th>
          <th>Until</th>
        </thead>


        <tbody>
          <tr>
            <td>{quiz.dueDate && <div>{new Date(quiz.dueDate).toLocaleString()}</div>}</td>
            <td>{quiz.assignedto}</td>
            <td>{quiz.availableDate && <div>{new Date(quiz.availableDate).toLocaleString()}</div>}</td>
            <td>{quiz.untilDate && <div>{new Date(quiz.untilDate).toLocaleString()}</div>}</td>
          </tr>

        </tbody>
      </table>



    </div>
  );
}

export default QuizDetails;

