import React, { useState } from 'react';
import { MultipleChoiceQuestion } from './type';

interface Props {
    question: MultipleChoiceQuestion;
    onSave: (question: MultipleChoiceQuestion) => void;
    onCancel: (question: MultipleChoiceQuestion) => void;
}

const MultipleChoiceEditor: React.FC<Props> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState(question.title);
    const [points, setPoints] = useState(question.points);
    const [content, setContent] = useState(question.question);
    const [choices, setChoices] = useState(question.choices);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(question.correctChoiceIndex);

    const handleChoiceChange = (index: number, value: string) => {
        const newChoices = choices.map((choice, i) => i === index ? value : choice);
        setChoices(newChoices);
    };

    const handleAddChoice = () => {
        setChoices([...choices, '']);
    };

    const handleRemoveChoice = (index: number) => {
        const newChoices = choices.filter((_, i) => i !== index);
        setChoices(newChoices);
        if (correctAnswerIndex >= index) {
            setCorrectAnswerIndex(prev => prev > 0 ? prev - 1 : 0);
        }
    };

    const save = () => {
        onSave({ ...question, title, points, question:content, choices, correctChoiceIndex:correctAnswerIndex });
    };

    return (
        <div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input type="number" value={points} onChange={e => setPoints(parseInt(e.target.value, 10))} placeholder="Points" />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Question Content" />
            {choices.map((choice, index) => (
                <div key={index}>
                    <textarea value={choice} onChange={e => handleChoiceChange(index, e.target.value)} placeholder="Choice Text" />
                    <input type="radio" name="correctAnswer" checked={index === correctAnswerIndex} onChange={() => setCorrectAnswerIndex(index)} />
                    <button className="goodButton" onClick={() => handleRemoveChoice(index)}>Remove</button>
                </div>
            ))}
            <br />
            <button className="goodButton" onClick={handleAddChoice}>Add Choice</button>
            <button className="goodButton" onClick={save}>Save/Update Question</button>
            <button className="goodButton" onClick={() => onCancel(question)}>Cancel</button>
            <hr />
        </div>
    );
};

export default MultipleChoiceEditor;
