// types.ts
export type QuestionType = 'Multiple Choice' | 'True/False' | 'Fill in Multiple Blanks';

export interface QuestionBase {
    id: number;
    type: QuestionType;
    title: string;
    points: number;
    content: string;
}

export interface MultipleChoiceQuestion extends QuestionBase {
    choices: string[];
    correctAnswerIndex: number;
}

export interface TrueFalseQuestion extends QuestionBase {
    answer: boolean;
}

export interface FillInBlanksQuestion extends QuestionBase {
    blanks: Array<{answer: string[]}>;  // Array of answers for each blank, allowing multiple correct answers per blank
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillInBlanksQuestion;
