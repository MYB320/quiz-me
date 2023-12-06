import { YStack, Text, Card, Button, XStack, ColorTokens } from 'tamagui';
import { decode } from 'html-entities';
import { Question } from '../types/questions';

type Props = {
  currentQuestionIndex: number;
  question: Question;
  answers: string[];
  userAnswer: string | undefined;
  onClick: (answer: string, currentQuestionIndex: number) => void;
};

export default function QuizCard({
  currentQuestionIndex,
  question,
  answers,
  userAnswer,
  onClick,
}: Props) {
  const getBGColor = (
    userAnswer: string | undefined,
    correctAnswer: string,
    answer: string
  ): string => {
    const isAnswerCorrect = userAnswer ? userAnswer === correctAnswer : undefined;

    if (
      (isAnswerCorrect === true && answer === userAnswer) ||
      (isAnswerCorrect === false && answer === correctAnswer)
    )
      return '$green10Light';

    if (isAnswerCorrect === false && answer === userAnswer) return '$red10Light';

    return '$backgroundTransparent';
  };
  return (
    <Card>
      <Card.Header gap={16}>
        <YStack>
          <Text textAlign="center" fontSize={20} fontWeight={600 as any}>
            {decode(question?.question)}
          </Text>
        </YStack>
        <YStack gap={8}>
          {answers?.map((answer, i) => (
            <Button
              key={i}
              onPress={() => onClick(answer, currentQuestionIndex)}
              backgroundColor={getBGColor(userAnswer, question?.correct_answer, answer)}>
              {decode(answer)}
            </Button>
          ))}
        </YStack>
      </Card.Header>
      <XStack p={8} justifyContent="space-between">
        <Text>{decode(question?.category)}</Text>
        <Text color={question?.color}> {question?.difficulty}</Text>
      </XStack>
    </Card>
  );
}
