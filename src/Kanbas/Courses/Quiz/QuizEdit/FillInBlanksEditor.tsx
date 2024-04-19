import React, { useState } from 'react';
import { FillInBlanksQuestion } from './type';

interface Props {
    question: FillInBlanksQuestion;
    onSave: (question: FillInBlanksQuestion) => void;
    onCancel: () => void;
}

const FillInBlanksEditor: React.FC<Props> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState(question.title);
    const [points, setPoints] = useState(question.points);
    const [content, setContent] = useState(question.content);
    const [blanks, setBlanks] = useState(question.blanks);

    const handleAddBlank = () => {
        setBlanks([...blanks, { answer: [''] }]);
    };

    const handleRemoveBlank = (index: number) => {
        setBlanks(blanks.filter((_, i) => i !== index));
    };

    const handleAnswerChange = (index: number, value: string, answerIndex: number) => {
        const newBlanks = blanks.map((blank, i) =>
            i === index ? { ...blank, answer: blank.answer.map((a, ai) => ai === answerIndex ? value : a) } : blank
        );
        setBlanks(newBlanks);
    };

    const addAnswer = (index: number) => {
        const newBlanks = blanks.map((blank, i) =>
            i === index ? { ...blank, answer: [...blank.answer, ''] } : blank
        );
        setBlanks(newBlanks);
    };

    const removeAnswer = (index: number, answerIndex: number) => {
        const newBlanks = blanks.map((blank, i) =>
            i === index ? { ...blank, answer: blank.answer.filter((_, ai) => ai !== answerIndex) } : blank
        );
        setBlanks(newBlanks);
    };

    const save = () => {
        onSave({ ...question, title, points, content, blanks });
    };

    return (
        <div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input type="number" value={points} onChange={e => setPoints(Number(e.target.value))} placeholder="Points" />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Question Content" />
            {blanks.map((blank, index) => (
                <div key={index}>
                    {blank.answer.map((answer, ai) => (
                        <div key={ai}>
                            <input type="text" value={answer} onChange={e => handleAnswerChange(index, e.target.value, ai)} placeholder="Correct Answer" />
                            {ai > 0 && <button onClick={() => removeAnswer(index, ai)}>Remove Answer</button>}
                        </div>
                    ))}
                    <button onClick={() => addAnswer(index)}>Add Answer</button>
                    <button onClick={() => handleRemoveBlank(index)}>Remove Blank</button>
                </div>
            ))}
            <button onClick={handleAddBlank}>Add Blank</button>
            <button onClick={save}>Save/Update Question</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default FillInBlanksEditor;
