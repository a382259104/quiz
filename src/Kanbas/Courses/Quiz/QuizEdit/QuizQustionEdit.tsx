import { Question, QuestionType, MultipleChoiceQuestion, TrueFalseQuestion, FillInBlanksQuestion } from './type';
import QuestionForm from './QuestionForm';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillInBlanksEditor from './FillInBlanksEditor';
import { findQuestionsByQuiz, createQuestion, updateQuestion,deleteQuestion
 } from '../../../../Quizzes_And_Questions/client';

// Main Quiz Editor component
function QuizQustionEdit() {
  const { courseId, quizId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    const response = await findQuestionsByQuiz(quizId);
    setQuestions(response);
    console.log(questions)
  };

  const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('MultipleChoice');

  const addNewQuestion = () => {
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
    createQuestion(quizId,newQuestion)
    setQuestions([...questions, newQuestion]);
  };

  const saveQuestion = (question: Question) => {
    const updatedQuestions = questions.map(q => q._id === question._id ? question : q);
    console.log(`This is the question id ${question._id}`)
    updateQuestion(quizId, question)
    setQuestions(updatedQuestions);
  };

  const cancelEdit = (question: Question) => {
    console.log("Attempting to delete")
    deleteQuestion(quizId,question)
  };

  return (
    <div>
      <select value={currentQuestionType} onChange={e => setCurrentQuestionType(e.target.value as QuestionType)}>
        <option value="MultipleChoice">Multiple Choice</option>
        <option value="TrueFalse">True/False</option>
        <option value="FillInTheBlanks">Fill in Multiple Blanks</option>
      </select>
      <button onClick={addNewQuestion}>Add New Question</button>
      {questions.map((question) => (
        <div key={question._id}>
          {question.type === 'MultipleChoice' && <MultipleChoiceEditor question={question as MultipleChoiceQuestion} onSave={saveQuestion} onCancel={cancelEdit} />}
          {question.type === 'TrueFalse' && <TrueFalseEditor question={question as TrueFalseQuestion} onSave={saveQuestion} onCancel={cancelEdit} />}
          {question.type === 'FillInTheBlanks' && <FillInBlanksEditor question={question as FillInBlanksQuestion} onSave={saveQuestion} onCancel={cancelEdit} />}
        </div>
      ))}
    </div>
  );
}

export default QuizQustionEdit;