import { Link } from 'expo-router';
import { YStack, Image, Text } from 'tamagui';

import { Container, Main, Title, Button, ButtonText, Subtitle } from '../tamagui.config';
import SelectDifficulty from '../components/SelectDifficulty';
import { useState } from 'react';

export default function Page() {
  const quizImage = require('../assets/img.png');

  const [difficulty, setDifficulty] = useState<string>('');
  return (
    <Container>
      <Main>
        <YStack alignItems="center" paddingTop={30}>
          <Title>Quiz.Me</Title>
          <Subtitle fontSize={26}>Do you have what it takes to become the Quiz.me master?</Subtitle>
          <Image paddingVertical={20} source={quizImage} width={300} height={300} />
        </YStack>
        <YStack gap={20}>
          <SelectDifficulty difficulty={setDifficulty} />
          {difficulty != '' && (
            <Link
              href={{
                pathname: '/quiz',
                params: { difficulty },
              }}
              asChild>
              <Button>
                <ButtonText>Start Quiz</ButtonText>
              </Button>
            </Link>
          )}
        </YStack>
      </Main>
    </Container>
  );
}
