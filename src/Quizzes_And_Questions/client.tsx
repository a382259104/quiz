import axios from "axios";
const BASE_API = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${BASE_API}/api/quizzes`;
const QUESTION_API = `${BASE_API}/api/questions`;

console.log(`This is the quiz api: ${QUIZ_API}`)
console.log(`This is the question api: ${QUESTION_API}`)

export interface Quiz {
    _id: string;
    title: string,
    description: string,
    assignedto: string,
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
    questions: Question[],
    course:string;
    published:boolean
}

export interface Question {
    _id: string;
    type: "MultipleChoice" | "TrueFalse" | "FillInTheBlanks";
    title: string;
    points: number;
    question: string;
    choices?: string[];
    correctChoiceIndex?: number;
    correctAnswer?: boolean;
    blanks?: { text: string, correctAnswer: string }[];
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

export const findQuizById = async (quiz: Quiz) => {
    try {
        const response = await axios.get(`${QUIZ_API}/${quiz._id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz by ID:", error);
        throw error;
    }
};

export const createQuiz = async (quiz: Quiz) => {
    try {
        const response = await axios.post(QUIZ_API, quiz);
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error);
        throw error;
    }
};

export const updateQuiz = async (quiz: Quiz) => {
    try {
        const response = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
        return response.data;
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw error;
    }
};

export const deleteQuiz = async (quiz: Quiz) => {
    try {
        const response = await axios.delete(`${QUIZ_API}/${quiz._id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting quiz:", error);
        throw error;
    }
};


export const findAllQuestions = async (course:string) => {
    try {
      const response = await axios.get(`${QUIZ_API}/${course}/questions`);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw error;
    }
  };
  
  export const findQuestionById = async (course:string,question: Question) => {
    try {
      const response = await axios.get(`${QUIZ_API}/${course}/questions/${question._id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching question by ID:", error);
      throw error;
    }
  };
  
  export const createQuestion = async (course:string,question: Question) => {
    try {
      const response = await axios.post(`${QUIZ_API}/${course}/questions`, question);
      return response.data;
    } catch (error) {
      console.error("Error creating question:", error);
      throw error;
    }
  };
  
  export const updateQuestion = async (course:string,question: Question) => {
    try {
      const response = await axios.put(`${QUIZ_API}/${course}/questions/${question._id}`, question);
      return response.data;
    } catch (error) {
      console.error("Error updating question:", error);
      throw error;
    }
  };
  
  export const deleteQuestion = async (course:string,question: Question) => {
    try {
      const response = await axios.delete(`${QUIZ_API}/${course}/questions/${question._id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting question:", error);
      throw error;
    }
  };