import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Uniwind, useUniwind, withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);
const StyledSafeAreaView = withUniwind(SafeAreaView);

export default function Index() {
  return (
    <StyledSafeAreaView className="flex-1 bg-background font-">
      <ScrollView contentContainerClassName="p-6 gap-8">
        {/* Header Section */}
        <View className="gap-2">
          <ThemedText variant="h1">
            Hey Abiodun 👋
          </ThemedText>
          <ThemedText variant="h3" type="secondary" italic>
            Let’s set up future you
          </ThemedText>
        </View>
        {/* Theme Showcase */}
        <View className="gap-4">
          <ThemedText variant="h2">
            Active Theme
          </ThemedText>
          <CurrentThemeCard />
        </View>

        {/* Theme Switcher */}
        <View className="gap-4">
          <ThemedText variant="subtitle">
            Available Themes
          </ThemedText>
          <ThemeGrid />
        </View>
      </ScrollView>
    </StyledSafeAreaView >
  );
}

const CurrentThemeCard = () => {
  const { theme } = useUniwind();

  return (
    <View className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <View className="flex-row items-center gap-4">
        <View className="h-12 w-12 rounded-full bg-primary items-center justify-center">
          <StyledIonicons name="color-palette" size={24} className="text-primary-foreground" />
        </View>
        <View>
          <ThemedText variant="h3" className="capitalize">
            {theme} Actions
          </ThemedText>
          <ThemedText variant="caption" type="secondary">
            Primary color preview
          </ThemedText>
        </View>
      </View>
      <View className="mt-6 flex-row gap-3">
        <View className="bg-primary px-4 py-2 rounded-lg">
          <ThemedText className="text-primary-foreground font-medium">Primary Button</ThemedText>
        </View>
        <View className="bg-background border border-border px-4 py-2 rounded-lg">
          <ThemedText className="font-medium">Secondary</ThemedText>
        </View>
      </View>
    </View>
  )
}

const ThemeGrid = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();

  const themes = [
    { name: 'light', label: 'Light', icon: 'sunny' },
    { name: 'dark', label: 'Dark', icon: 'moon' },
  ];

  // Adjust icon names if needed based on actual installed Ionicons version
  // 'sunny', 'moon', 'water', 'leaf', 'contrast' are standard. 

  return (
    <View className="flex-row flex-wrap gap-4">
      {themes.map((t) => {
        const isActive = theme === t.name;
        return (
          <Pressable
            key={t.name}
            onPress={() => Uniwind.setTheme(t.name as any)}
            className={`
                    w-[47%] p-4 rounded-xl border border-red-600
                    ${isActive ? 'bg-primary border-primary' : 'bg-card'}
                    items-center justify-center gap-3 aspect-square
                  `}
          >
            <StyledIonicons
              name={t.icon as any}
              size={32}
              className={isActive ? 'text-primary-foreground' : 'text-primary'}
            />
            <ThemedText className={`font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
              {t.label}
            </ThemedText>
          </Pressable>
        )
      })}
    </View>
  );
};