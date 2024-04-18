import React, { useState, useEffect } from "react";
import { Question, findAllQuestions, findQuestionById, createQuestion, updateQuestion, deleteQuestion } from "./client";

function TestQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Question>({
    _id: "",
    type: "MultipleChoice",
    title: "Final",
    points: 0,
    question: "Random Question",
    choices: [],
    correctChoiceIndex: 0,
    correctAnswer: true,
    blanks: [{ text: "", correctAnswer: "" }]
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await findAllQuestions();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleCreateQuestion = async () => {
    try {
      await createQuestion(newQuestion);
      fetchQuestions();
    } catch (error) {
      console.error("Error creating question:", error);
    }
  };

  const handleUpdateQuestion = async () => {
    if (selectedQuestion) {
      try {
        await updateQuestion(selectedQuestion);
        fetchQuestions();
      } catch (error) {
        console.error("Error updating question:", error);
      }
    }
  };

  const handleSelectQuestion = async (question: Question) => {
    setSelectedQuestion(question);
  };

  const handleChangeSelectedQuestion = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (selectedQuestion) {
      setSelectedQuestion({ ...selectedQuestion, [e.target.name]: e.target.value });
    }
  };

  const handleDeleteQuestion = async (question: Question) => {
    try {
      await deleteQuestion(question);
      fetchQuestions(); // Refresh question list after deletion
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  return (
    <>
      <h1>Test Page for Questions</h1>
      <h2>Questions:</h2>
      <ul>
        {questions.map(question => (
          <li key={question._id}>
            {question.title} - {question.points} points
            <button onClick={() => handleDeleteQuestion(question)}>Delete</button>
            <button onClick={() => handleSelectQuestion(question)}>Edit</button>
          </li>
        ))}
      </ul>
      <h2>Create New Question:</h2>
      <input
        type="text"
        placeholder="Question"
        value={newQuestion.question || ""}
        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
      />
      {/* Add input fields for other question properties */}
      <button onClick={handleCreateQuestion}>Create Question</button>

      {selectedQuestion && (
        <div>
          <h2>Edit Question:</h2>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={selectedQuestion.title}
            onChange={handleChangeSelectedQuestion}
          />
          <select
            name="type"
            value={selectedQuestion.type}
            onChange={handleChangeSelectedQuestion}
          >
            <option value="MultipleChoice">Multiple Choice</option>
            <option value="TrueFalse">True/False</option>
            <option value="FillInTheBlanks">Fill in the Blanks</option>
          </select>
          <input
            type="number"
            placeholder="Points"
            name="points"
            value={selectedQuestion.points}
            onChange={handleChangeSelectedQuestion}
          />
          <textarea
            placeholder="Question"
            name="question"
            value={selectedQuestion.question}
            onChange={handleChangeSelectedQuestion}
          ></textarea>
          {/* Add input fields for other question properties */}
          <button onClick={handleUpdateQuestion}>Update Question</button>
        </div>
      )}
    </>
  );
}

export default TestQuestions;