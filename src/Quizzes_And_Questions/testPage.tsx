import React, { useState, useEffect } from "react";
import { Quiz, findAllQuizzes, findQuizById, createQuiz, updateQuiz, deleteQuiz } from "./client";

function TestPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [newQuiz, setNewQuiz] = useState<Quiz>({
        _id: "",
        title: "",
        description: "",
        assignedto: "",
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: "Yes",
        timeLimit: 0,
        multipleAttempts: "No",
        showCorrectAnswers: "No",
        accessCode: "",
        oneQuestionAtATime: "Yes",
        webcamRequired: "No",
        lockQuestionsAfterAnswering: "No"
    });


    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const data = await findAllQuizzes();
            setQuizzes(data);
        } catch (error) {
            console.error("Error fetching quizzes:", error);
        }
    };

    const handleCreateQuiz = async () => {
        try {
            await createQuiz(newQuiz);
            fetchQuizzes();
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    const handleUpdateQuiz = async () => {
        if (selectedQuiz) {
            try {
                await updateQuiz(selectedQuiz);
                fetchQuizzes();
            } catch (error) {
                console.error("Error updating quiz:", error);
            }
        }
    };

    const handleSelectQuiz = async (quiz: Quiz) => {
        setSelectedQuiz(quiz);
    };

    const handleChangeSelectedQuiz = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (selectedQuiz) {
            setSelectedQuiz({ ...selectedQuiz, [e.target.name]: e.target.value });
        }
    };
    

    const handleDeleteQuiz = async (quiz: Quiz) => {
        try {
            await deleteQuiz(quiz);
            fetchQuizzes(); // Refresh quiz list after deletion
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    return (
        <>
            <h1>Test Page for Quizzes</h1>
            <h2>Quizzes:</h2>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz._id}>
                        {quiz.title} - {quiz.points} points
                        <button onClick={() => handleDeleteQuiz(quiz)}>Delete</button>
                        <button onClick={() => handleSelectQuiz(quiz)}>Edit</button>
                    </li>
                ))}
            </ul>
            <h2>Create New Quiz:</h2>
            <input
                type="text"
                placeholder="Title"
                value={newQuiz.title || ""}
                onChange={(e) => setNewQuiz({ ...newQuiz, title: e.target.value })}
            />
            {/* Add input fields for other quiz properties */}
            <button onClick={handleCreateQuiz}>Create Quiz</button>

            {selectedQuiz && (
                <div>
                    <h2>Edit Quiz:</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={selectedQuiz.title}
                        onChange={handleChangeSelectedQuiz}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={selectedQuiz.description}
                        onChange={handleChangeSelectedQuiz}
                    />
                    <input
                        type="text"
                        placeholder="Assigned To"
                        name="assignedto"
                        value={selectedQuiz.assignedto}
                        onChange={handleChangeSelectedQuiz}
                    />
                    <select
                        name="quizType"
                        value={selectedQuiz.quizType}
                        onChange={handleChangeSelectedQuiz}
                    >
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Points"
                        name="points"
                        value={selectedQuiz.points}
                        onChange={handleChangeSelectedQuiz}
                    />
                    <select
                        name="assignmentGroup"
                        value={selectedQuiz.assignmentGroup}
                        onChange={handleChangeSelectedQuiz}
                    >
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                    </select>
                    <select
                        name="shuffleAnswers"
                        value={selectedQuiz.shuffleAnswers}
                        onChange={handleChangeSelectedQuiz}
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {/* Add input fields for other quiz properties */}
                    <button onClick={handleUpdateQuiz}>Update Quiz</button>
                </div>
            )}

        </>
    );
}

export default TestPage;