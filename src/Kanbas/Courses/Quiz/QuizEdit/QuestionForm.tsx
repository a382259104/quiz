// QuestionForm.tsx
import React, { useState, useEffect } from 'react';
import { Question, QuestionType } from './type';

const QuestionForm = ({ question, onSave, onCancel }: { question: Question, onSave: (question: Question) => void, onCancel: () => void }) => {
    const [localQuestion, setLocalQuestion] = useState<Question>(question);

    useEffect(() => {
        setLocalQuestion(question);
    }, [question]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setLocalQuestion({
            ...localQuestion,
            [name]: value
        });
    };

    const handleSave = () => {
        onSave(localQuestion);
    };

    return (
        <div>
            <input type="text" name="title" value={localQuestion.title} onChange={handleChange} placeholder="Title" />
            <input type="number" name="points" value={localQuestion.points} onChange={handleChange} placeholder="Points" />
            <textarea name="question" value={localQuestion.question} onChange={handleChange} placeholder="Question" />
            {/* More fields based on question.type */}
            <button onClick={handleSave}>Save/Update Question</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default QuestionForm;
