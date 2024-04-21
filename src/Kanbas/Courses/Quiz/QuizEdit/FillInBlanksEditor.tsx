import React, { useState } from 'react';
import { FillInBlanksQuestion } from './type';

interface Props {
  question: FillInBlanksQuestion;
  onSave: (question: FillInBlanksQuestion) => void;
  onCancel: (question: FillInBlanksQuestion) => void;
}

const FillInBlanksEditor: React.FC<Props> = ({ question, onSave, onCancel }) => {
  const [title, setTitle] = useState(question.title);
  const [points, setPoints] = useState(question.points);
  const [questionText, setQuestionText] = useState(question.question);
  const [blanks, setBlanks] = useState(question.blanks);

  const handleAddBlank = () => {
    setBlanks([...blanks, { text: '', correctAnswer: '' }]);
  };

  const handleRemoveBlank = (index: number) => {
    setBlanks(blanks.filter((_, i) => i !== index));
  };

  const handleBlankTextChange = (index: number, value: string) => {
    const newBlanks = blanks.map((blank, i) =>
      i === index ? { ...blank, text: value } : blank
    );
    setBlanks(newBlanks);
  };

  const handleCorrectAnswerChange = (index: number, value: string) => {
    const newBlanks = blanks.map((blank, i) =>
      i === index ? { ...blank, correctAnswer: value } : blank
    );
    setBlanks(newBlanks);
  };

  const save = () => {
    onSave({ ...question, title, points, question: questionText, blanks });
  };

  return (

    <div className="preview-questions" >
      <div className="questionBox">
        <div className="title">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="Points"
          />
        </div>
        <div className="question">
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Question Content"
          />
        </div>
        <div className="answers">

          {blanks.map((blank, index) => (
            <div key={index}>
              <input
                type="text"
                value={blank.text}
                onChange={(e) => handleBlankTextChange(index, e.target.value)}
                placeholder="Blank Text"
              />
              <input
                type="text"
                value={blank.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                placeholder="Correct Answer"
              />
              <button className="goodButton" onClick={() => handleRemoveBlank(index)}>Remove Blank</button>
            </div>
          ))}

          <br />
          <button className="goodButton " onClick={handleAddBlank}>Add Blank</button>
        </div>


        <hr />

        <div className='float-end'>
        <button className="goodButton" onClick={() => onCancel(question)}>Cancel</button>

          <button className="goodButton" onClick={save}>Save/Update Question</button>
          <p />
        </div>

      </div>

    </div>



  );
};

export default FillInBlanksEditor;