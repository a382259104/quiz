import React, { useState } from 'react';
import { TrueFalseQuestion } from './type';

interface TrueFalseEditorProps {
    question: TrueFalseQuestion;
    onSave: (question: TrueFalseQuestion) => void;
    onCancel: (question: TrueFalseQuestion) => void;
}

const TrueFalseEditor: React.FC<TrueFalseEditorProps> = ({ question, onSave, onCancel }) => {
    const [title, setTitle] = useState(question.title);
    const [points, setPoints] = useState(question.points);
    const [content, setContent] = useState<string>(question.question);
    const [answer, setAnswer] = useState(question.correctAnswer);

    const save = () => {
        onSave({ ...question, title, points, question:content, correctAnswer:answer });
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
            <button onClick={()=> onCancel}>Delete</button>
        </div>
    );
};

export default TrueFalseEditor;
