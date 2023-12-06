import { Difficulty, Question, QuestionsState } from '../types/questions';

const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

export const getQuestions = async (difficulty: string): Promise<QuestionsState> => {
  const endpoint = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint, { cache: 'no-store' })).json();
  let color: string;

  return data.results.map((question: Question) => {
    if (question.difficulty === Difficulty.EASY) {
      color = '$green10Light';
    } else if (question.difficulty === Difficulty.MEDIUM) {
      color = '$yellow10Light';
    } else if (question.difficulty === Difficulty.HARD) {
      color = '$red10Light';
    }
    return {
      ...question,
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
      color,
    };
  });
};
