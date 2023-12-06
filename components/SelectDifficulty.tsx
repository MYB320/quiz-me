import { YStack, Text, Select, Adapt, Sheet } from 'tamagui';
import { useMemo } from 'react';

export default function SelectDifficulty({ difficulty }: { difficulty: React.Dispatch<string> }) {
  const items = [{ name: 'Easy' }, { name: 'Medium' }, { name: 'Hard' }];

  return (
    <YStack gap={4}>
      <Text fontSize={18} pl={14}>
        Quiz difficulty:
      </Text>
      <Select onValueChange={(value) => difficulty(value)}>
        <Select.Trigger borderRadius={24} borderWidth={1} borderColor={'#6366F1'}>
          <Select.Value placeholder="Chose the difficulty" />
        </Select.Trigger>
        <Adapt when="sm" platform="touch">
          <Sheet
            modal
            dismissOnSnapToBottom
            snapPoints={[15]}
            animationConfig={{
              type: 'spring',
              damping: 20,
              mass: 1.2,
              stiffness: 250,
            }}>
            <Sheet.Frame>
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
        <Select.Content>
          <Select.Viewport>
            <Select.Group>
              {useMemo(
                () =>
                  items.map((item, i) => {
                    return (
                      <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                        <Select.ItemText>{item.name}</Select.ItemText>
                      </Select.Item>
                    );
                  }),
                [items]
              )}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select>
    </YStack>
  );
}
