import axios from "axios";
const BASE_API = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${BASE_API}/api/quizzes`;

console.log(`This is the quiz api: ${QUIZ_API}`)

export interface Quiz {
    _id: string;
    title:string,
    description:string,
    assignedto:string,
    quizType: string;
    points: number;
    assignmentGroup: string;
    shuffleAnswers: string;
    timeLimit: number;
    multipleAttempts: string;
    showCorrectAnswers: string;
    accessCode: string;
    oneQuestionAtATime: string;
    webcamRequired: string;
    lockQuestionsAfterAnswering: string;
    dueDate?: Date;
    availableDate?: Date;
    untilDate?: Date;
}

export interface Question {
    _id: string;
    type: string; // Can be "MultipleChoice", "TrueFalse", or "FillInMultipleBlanks"
    title: string;
    points: number;
    question: string;
    choices?: string[]; // For MultipleChoice questions
    correctChoiceIndex?: number; // For MultipleChoice questions
    correctAnswer?: boolean; // For TrueFalse questions
    blanks?: { text: string, correctAnswer: string }[]; // For FillInMultipleBlanks questions
}

export const findAllQuizzes = async () => {
    try {
        const response = await axios.get(QUIZ_API);
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
    }
};

export const findQuizById = async (quiz:Quiz) => {
    try {
        const response = await axios.get(`${QUIZ_API}/${quiz._id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz by ID:", error);
        throw error;
    }
};

export const createQuiz = async (quiz:Quiz) => {
    try {
        const response = await axios.post(QUIZ_API, quiz);
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error);
        throw error;
    }
};

export const updateQuiz = async (quiz:Quiz) => {
    try {
        const response = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
        return response.data;
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw error;
    }
};

export const deleteQuiz = async (quiz:Quiz) => {
    try {
        const response = await axios.delete(`${QUIZ_API}/${quiz._id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting quiz:", error);
        throw error;
    }
};