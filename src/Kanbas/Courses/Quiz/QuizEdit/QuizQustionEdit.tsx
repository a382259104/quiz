import { Question, QuestionType, MultipleChoiceQuestion } from './type';
import QuestionForm from './QuestionForm';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';



// Main Quiz Editor component
function QuizQustionEdit() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const addNewQuestion = () => {
        const newQuestion: MultipleChoiceQuestion = {
            id: Date.now(),
            type: 'Multiple Choice',
            title: '',
            points: 0,
            content: '',
            choices: [''],
            correctAnswerIndex: 0
        };
        setQuestions([...questions, newQuestion]);
        setEditingId(newQuestion.id);
    };

    const saveQuestion = (question: Question) => {
        const updatedQuestions = questions.map(q => q.id === question.id ? question : q);
        setQuestions(updatedQuestions);
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };
   

    return (
        <div>
            {questions.map((question) => (
                <div key={question.id}>
                    {editingId === question.id ? (
                        <QuestionForm
                            question={question}
                            onSave={saveQuestion}
                            onCancel={cancelEdit}
                        />
                    ) : (
                        <div>
                            <h4>{question.title || 'New Question'}</h4>
                            <button onClick={() => setEditingId(question.id)}>Edit</button>
                        </div>
                    )}
                </div>
            ))}
            <button onClick={addNewQuestion}>Add New Question</button>
        </div>
    );
};

export default QuizQustionEdit;