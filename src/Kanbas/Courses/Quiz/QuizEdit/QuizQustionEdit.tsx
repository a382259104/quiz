import { Question, QuestionType, MultipleChoiceQuestion, TrueFalseQuestion, FillInBlanksQuestion } from './type';
import QuestionForm from './QuestionForm';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillInBlanksEditor from './FillInBlanksEditor';
import {
  findQuestionsByQuiz, createQuestion, updateQuestion, deleteQuestion,
  findQuizById, updateQuiz
} from '../../../../Quizzes_And_Questions/client';
import { GrWaypoint } from 'react-icons/gr';

// Main Quiz Editor component
function QuizQustionEdit() {

  const { courseId, quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editQuestionId, setEditQuestionId] = useState<string | null>(null);
  const [localQuestions, setLocalQuestions] = useState<Question[]>([]); // Local state to manage edits
  const [totalPoints, setTotalPoints] = useState(0);
  const [questionsToDelete, setQuestionsToDelete] = useState<Question[]>([]);


  const fetchQuestions = async () => {
    const response = await findQuestionsByQuiz(quizId);
    setQuestions(response);
    setLocalQuestions(response || []); // Initialize local state with fetched data
    console.log(questions)
  };

  useEffect(() => {
    fetchQuestions();
    calculateTotalScore();
  }, [quizId]);

  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('MultipleChoice');

  const addNewQuestion = async () => {
    let newQuestion: Question;
    switch (currentQuestionType) {
      case 'MultipleChoice':
        newQuestion = {
          _id: Date.now().toString(),
          type: 'MultipleChoice',
          title: 'New Question',
          points: 0,
          question: 'Fill me in',
          choices: [''],
          correctChoiceIndex: 0
        } as MultipleChoiceQuestion;
        break;
      case 'TrueFalse':
        newQuestion = {
          _id: Date.now().toString(),
          type: 'TrueFalse',
          title: 'New True and False Question',
          points: 0,
          question: 'Fill me in',
          correctAnswer: true
        } as TrueFalseQuestion;
        break;
      case 'FillInTheBlanks':
        newQuestion = {
          _id: Date.now().toString(),
          type: 'FillInTheBlanks',
          title: 'New Fill-in the Blanks',
          points: 0,
          question: 'Fill me in',
          blanks: [{ text: '', correctAnswer: '' }]
        } as FillInBlanksQuestion;
        break;
      default:
        throw new Error('Unsupported question type');
    }
    // createQuestion(quizId,newQuestion)
    // setQuestions([...questions, newQuestion]);
    // const createdQuestion = await createQuestion(quizId, newQuestion);
    // setQuestions([...questions, createdQuestion || newQuestion]);
    setLocalQuestions([...localQuestions, newQuestion]); // Add to local state only
    setEditQuestionId(newQuestion._id); // Edit immediately on create
  };

  const saveQuestionLocally = (updatedQuestion: Question) => {
    const updatedLocalQuestions = localQuestions.map(q => q._id === updatedQuestion._id ? updatedQuestion : q);

    setTotalPoints(calculateTotalScore());
    console.log(`Total points after local update:${totalPoints}`)
    setLocalQuestions(updatedLocalQuestions);
    setEditQuestionId(null); // Exit edit mode
  };

  const cancelEdit = (questionId: string) => {
    setEditQuestionId(null);  // Simply exit edit mode without reverting changes
  };



  const calculateTotalScore = () => {
    let totalScore = 0;
    localQuestions.forEach((question) => {
      totalScore += question.points;
    });
    console.log(`Total score is ${totalScore}`);
    return totalScore;
  };



  const saveAllQuestions = async () => {
    // first updates all the questions
    await Promise.all(localQuestions.map(question => updateQuestion(quizId, question)));

    // deletes all the questions too
    await Promise.all(questionsToDelete.map(question => deleteQuestion(quizId, question)));

    // updates the score
    const totalScore = calculateTotalScore();
    const quiz = await findQuizById(quizId);
    if (quiz) {
      try {
        quiz.points = totalScore;
        await updateQuiz(quiz);
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    }

    setQuestions(localQuestions);
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/QuizDetails/${quizId}`);
    alert('All changes have been saved to the server.');
  };

  const saveNpublishAllQuestions = async () => {
    await saveAllQuestions();
    const quiz = await findQuizById(quizId);
    if (quiz) {
      try {
        quiz.published = true;
        await updateQuiz(quiz);
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    }
  };

  const editQuestion = (questionId: string) => {
    setEditQuestionId(questionId);
  };

  const deleteQuestionLocally = async (questionId: string) => {
    // Update local state to remove the question
    // TODO: STORE AN ARRAY TO DELETE AND DELTE THAT ARRAY IF CANCELLED
    const theNextOneInLine = localQuestions.find(question => question._id === questionId);
    if (theNextOneInLine) {
      setQuestionsToDelete(prev => [...prev, theNextOneInLine]);
      console.log(`Added ${theNextOneInLine.question} to be deleted later`)
    }
    setLocalQuestions(localQuestions.filter(question => question._id !== questionId));
  };

  const cancelAllEdits = () => {
    fetchQuestions()
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  }


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
      // return <div key={question._id}>No such question type</div>;
    }
  };


  return (
    <div>
      <select value={currentQuestionType} onChange={e => setCurrentQuestionType(e.target.value as QuestionType)}>
        <option value="MultipleChoice">Multiple Choice</option>
        <option value="TrueFalse">True/False</option>
        <option value="FillInTheBlanks">Fill in Multiple Blanks</option>
      </select>

      <button onClick={addNewQuestion} className='goodButton'>Add New Question</button>
      {localQuestions.map((question) => (

        <div key={question._id}>


          {editQuestionId === question._id ? (
            <>
              {question.type === 'MultipleChoice' && <MultipleChoiceEditor question={question as MultipleChoiceQuestion} onSave={saveQuestionLocally} onCancel={() => cancelEdit(question._id)} />}
              {question.type === 'TrueFalse' && <TrueFalseEditor question={question as TrueFalseQuestion} onSave={saveQuestionLocally} onCancel={() => cancelEdit(question._id)} />}
              {question.type === 'FillInTheBlanks' && <FillInBlanksEditor question={question as FillInBlanksQuestion} onSave={saveQuestionLocally} onCancel={() => cancelEdit(question._id)} />}
            </>
          ) : (
            <>

              <div className="preview-questions" >
                {/* <CgPentagonRight className="icon" /> */}
                <div className="questionBox">
                  <div className="title">
                    <p>{question.title}</p>
                    <p className="points">{question.points} pts</p>
                  </div>

                  <div className="question">

                    <p>{question.question}</p>
                  </div>
                  <div className="answers">
                    <div>{renderAnswers(question)}</div>
                  </div>
                </div>

              </div>
              <button onClick={() => editQuestion(question._id)} className='goodButton'>Edit</button>
              <button onClick={() => deleteQuestionLocally(question._id)} className='goodButton'>Delete</button>
            </>
          )}
        </div>
      ))}






      <hr />
      <button className='goodButton float-end' onClick={saveNpublishAllQuestions}>Save All and Published</button>
      <button className='goodButton float-end' onClick={saveAllQuestions}>Save All Changes</button>
      <button className='goodButton float-end' onClick={cancelAllEdits}>Cancel</button>

    </div>
  );
};

export default QuizQustionEdit;