import React, { useState } from 'react';
import { TrueFalseQuestion } from './type';

interface TrueFalseEditorProps {
    question: TrueFalseQuestion;
    onSave: (question: TrueFalseQuestion) => void;
    onCancel: () => void;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState(question.title);
    const [points, setPoints] = useState(question.points);
    const [content, setContent] = useState(question.content);
    const [answer, setAnswer] = useState(question.answer);

    const save = () => {
        onSave({ ...question, title, points, content, answer });
    };

    return (
        <div>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
            <input type="number" value={points} onChange={e => setPoints(Number(e.target.value))} placeholder="Points" />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Question Content" />
            <div>
                <label>
                    <input type="radio" checked={answer === true} onChange={() => setAnswer(true)} /> True
                </label>
                <label>
                    <input type="radio" checked={answer === false} onChange={() => setAnswer(false)} /> False
                </label>
            </div>
            <button onClick={save}>Save/Update Question</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default TrueFalseEditor;
