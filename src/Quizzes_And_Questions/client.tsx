import axios from "axios";
const BASE_API = process.env.REACT_APP_API_BASE;
const QUIZ_API = `${BASE_API}/api/quizzes`;

console.log(`This is the quiz api: ${QUIZ_API}`)

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
  course: string;
  published: boolean
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

export const findQuizByCourse = async (quiz: Quiz) => {
  try {
    const response = await axios.get(`${QUIZ_API}/findquiz/${quiz.course}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by course:", error);
    throw error;
  }
};

export const findQuizById = async (id: any): Promise<Quiz> => {
  try {
    const response = await axios.get(`${QUIZ_API}/findquiz/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by course:", error);
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

export const findQuestionsByQuiz = async (quizId: any) => {
  try {
    const response = await axios.get(`${QUIZ_API}/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const findQuestionById = async (quizId: any, question: Question) => {
  try {
    const response = await axios.get(`${QUIZ_API}/${quizId}questions/${question._id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};

export const createQuestion = async (quizId: any, question: Question) => {
  try {
    const response = await axios.post(`${QUIZ_API}/${quizId}/questions`, question);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};

export const updateQuestion = async (quizId: any, question: Question) => {
  try {
    const response = await axios.put(`${QUIZ_API}/${quizId}/questions/${question._id}`, question);

    return response.data;
  } catch (error:any) {
    if (error.response && error.response.status === 404 && error.response.data.message === "Question not found.") {
      try {
        const newQuestionResponse = await createQuestion(quizId, question); 
        return newQuestionResponse.data; 
      } catch (createError) {
        console.error("Error creating question:", createError);
        throw createError;
      }
    } else {
      console.error("Error updating question:", error);
      throw error;
    }
  }
};


export const deleteQuestion = async (quizId: any, question: Question) => {
  try {
    const response = await axios.delete(`${QUIZ_API}/${quizId}/questions/${question._id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
};