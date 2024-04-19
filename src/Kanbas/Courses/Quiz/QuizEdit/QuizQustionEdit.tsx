import { Question, QuestionType, MultipleChoiceQuestion, TrueFalseQuestion, FillInBlanksQuestion } from './type';
import QuestionForm from './QuestionForm';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TrueFalseEditor';
import FillInBlanksEditor from './FillInBlanksEditor';



// Main Quiz Editor component
function QuizQustionEdit() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionType, setCurrentQuestionType] = useState<QuestionType>('Multiple Choice');

    const addNewQuestion = () => {
        let newQuestion: Question;
        switch (currentQuestionType) {
            case 'Multiple Choice':
                newQuestion = {
                    id: Date.now(), title: '', points: 0, content: '', type: currentQuestionType,
                    choices: [''], correctAnswerIndex: 0
                } as MultipleChoiceQuestion;
                break;
            case 'True/False':
                newQuestion = {
                    id: Date.now(), title: '', points: 0, content: '', type: currentQuestionType,
                    answer: true
                } as TrueFalseQuestion;
                break;
            case 'Fill in Multiple Blanks':
                newQuestion = {
                    id: Date.now(), title: '', points: 0, content: '', type: currentQuestionType,
                    blanks: [{ answer: [''] }]
                } as FillInBlanksQuestion;
                break;
            default:
                throw new Error('Unsupported question type');
        }
        setQuestions([...questions, newQuestion]);
    };

    const saveQuestion = (question: Question) => {
        const updatedQuestions = questions.map(q => q.id === question.id ? question : q);
        setQuestions(updatedQuestions);
        
    };

    const cancelEdit = () => {
        
    };
   

    return (
        <div>
            <select value={currentQuestionType} onChange={e => setCurrentQuestionType(e.target.value as QuestionType)}>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Fill in Multiple Blanks">Fill in Multiple Blanks</option>
            </select>
            <button onClick={addNewQuestion}>Add New Question</button>
            {questions.map((question) => (
                <div key={question.id}>
                    {question.type === 'Multiple Choice' && <MultipleChoiceEditor question={question as MultipleChoiceQuestion} onSave={saveQuestion as any} onCancel={cancelEdit} />}
                    {question.type === 'True/False' && <TrueFalseEditor question={question as TrueFalseQuestion} onSave={saveQuestion as any} onCancel={cancelEdit} />}
                    {question.type === 'Fill in Multiple Blanks' && <FillInBlanksEditor question={question as FillInBlanksQuestion} onSave={saveQuestion as any} onCancel={cancelEdit} />}
                </div>
            ))}
        </div>
    );
};

export default QuizQustionEdit;