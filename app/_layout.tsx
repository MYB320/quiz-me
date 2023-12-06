import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack, useRouter, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider, Theme, Button } from 'tamagui';

import config from '../tamagui.config';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const router = useRouter();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const BackButton = () => (
    <Button
      borderRadius={100}
      backgroundColor="transparent"
      padding={10}
      pressStyle={{ opacity: 0.1 }}
      onPress={router.back}
      icon={<Feather name="arrow-left" size={22} color="black" />}></Button>
  );

  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="quiz" options={{ title: '', headerLeft: () => <BackButton /> }} />
        </Stack>
      </Theme>
    </TamaguiProvider>
  );
}
