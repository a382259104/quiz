
import React, { useState } from 'react';

// Types for questions
type QuestionType = 'Multiple Choice' | 'True/False' | 'Fill in the Blanks';
type Question = {
    id: number;
    type: QuestionType;
    content: string;
    options?: string[];
};

// Question Form for creating and editing questions
const QuestionForm = ({ question, onSave, onCancel }: { question: Question, onSave: (question: Question) => void, onCancel: () => void }) => {
    const [type, setType] = useState(question.type);
    const [content, setContent] = useState(question.content);
    const [options, setOptions] = useState(question.options || []);

    return (
        <div>
            <select value={type} onChange={(e) => setType(e.target.value as QuestionType)}>
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blanks">Fill in the Blanks</option>
            </select>
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            {type === 'Multiple Choice' && (
                <div>
                    {options.map((option, index) => (
                        <input key={index} type="text" value={option} onChange={(e) => {
                            const newOptions = [...options];
                            newOptions[index] = e.target.value;
                            setOptions(newOptions);
                        }} />
                    ))}
                </div>
            )}
            <button onClick={() => onSave({ ...question, type, content, options })}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

// Main Quiz Editor component
const QuizQustionEdit = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleNewQuestion = () => {
        const newQuestion = {
            id: Date.now(),
            type: 'Multiple Choice'as QuestionType,
            content: '',
            options: ['']
        };
        setQuestions([...questions, newQuestion]);
        setEditingId(newQuestion.id);
    };

    const handleSaveQuestion = (updatedQuestion: Question) => {
        const updatedQuestions = questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q);
        setQuestions(updatedQuestions);
        setEditingId(null);
    };

    const handleDeleteQuestion = (questionId: number) => {
        setQuestions(questions.filter(q => q.id !== questionId));
    };

    return (
        <div>
            <button onClick={handleNewQuestion}>New Question</button>
            {questions.map(question => (
                <div key={question.id}>
                    {editingId === question.id ? (
                        <QuestionForm question={question} onSave={handleSaveQuestion} onCancel={() => setEditingId(null)} />
                    ) : (
                        <div>
                            <span>{question.type}: {question.content}</span>
                                <button onClick={() => setEditingId(question.id)}>Edit</button>
                                <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuizQustionEdit;
