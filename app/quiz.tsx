import { Stack, useLocalSearchParams } from 'expo-router';
import { XStack, YStack } from 'tamagui';
import { ButtonText, Container, Main, Subtitle, Button } from '../tamagui.config';
import { useEffect, useState } from 'react';
import { getQuestions } from '../api/questions';
import { QuestionsState } from '../types/questions';
import QuizCard from '../components/QuizCard';

export default function Quiz() {
  const { difficulty } = useLocalSearchParams();
  const [questions, setQuestions] = useState<QuestionsState>([]);

  useEffect(() => {
    (async () => {
      setQuestions(await getQuestions(difficulty as string));
    })();
  }, [setQuestions]);

  const totalQuestions: number = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const isQuestionAnswered = userAnswers[currentQuestionIndex] ? true : false;

  const handleOnAnswerClick = (answer: string, currentQuestionIndex: number) => {
    if (isQuestionAnswered) return;
    const isCorrect = questions[currentQuestionIndex].correct_answer === answer;
    if (isCorrect) setScore((prev) => prev + 1);
    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleChangeQuestion = (step: number) => {
    const newQuestionIndex = currentQuestionIndex + step;
    if (newQuestionIndex < 0 || newQuestionIndex >= totalQuestions) return;
    setCurrentQuestionIndex(newQuestionIndex);
  };
  const quiz = `quiz n°${currentQuestionIndex + 1} of ${
    totalQuestions == 0 ? '?' : totalQuestions
  }`;
  return (
    <Container>
      <Stack.Screen options={{ title: quiz }} />
      <Main>
        <YStack>
          <Subtitle fontSize={28} textAlign="center">
            Score: {score}
          </Subtitle>
        </YStack>
        <YStack>
          {questions && (
            <QuizCard
              currentQuestionIndex={currentQuestionIndex}
              question={questions[currentQuestionIndex]}
              answers={questions[currentQuestionIndex]?.answers}
              userAnswer={userAnswers[currentQuestionIndex]}
              onClick={handleOnAnswerClick}
            />
          )}
        </YStack>
        <XStack justifyContent="space-between">
          <Button onPress={() => handleChangeQuestion(-1)}>
            <ButtonText>Prev Quiz</ButtonText>
          </Button>
          <Button onPress={() => handleChangeQuestion(1)}>
            <ButtonText>Next Quiz</ButtonText>
          </Button>
        </XStack>
      </Main>
    </Container>
  );
}
