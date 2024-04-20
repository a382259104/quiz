// types.ts
export type QuestionType = 'MultipleChoice' | 'TrueFalse' | 'FillInTheBlanks';

export interface QuestionBase {
  _id: string;
  type: QuestionType;
  title: string;
  points: number;
  question: string;
  choices?: string[];
  correctChoiceIndex?: number;
  correctAnswer?: boolean;
  blanks?: Array<{ text: string, correctAnswer: string }>;
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'MultipleChoice';
  choices: string[];
  correctChoiceIndex: number;
  correctAnswer?: never;
  blanks?: never;
}

export interface TrueFalseQuestion extends QuestionBase {
  type: 'TrueFalse';
  correctAnswer: boolean;
  choices?: never;
  correctChoiceIndex?: never;
  blanks?: never;
}

export interface FillInBlanksQuestion extends QuestionBase {
  type: 'FillInTheBlanks';
  blanks: Array<{ text: string, correctAnswer: string }>;
  choices?: never;
  correctChoiceIndex?: never;
  correctAnswer?: never;
}

export type Question = MultipleChoiceQuestion | TrueFalseQuestion | FillInBlanksQuestion;