import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { games as seedGames, type Game } from "../data/games";
import type { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "GameList">;

export function GameListScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return seedGames;
    return seedGames.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q)
    );
  }, [query]);

  const renderItem = ({ item }: { item: Game }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Play ${item.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() =>
        navigation.navigate("GamePlayer", { title: item.title, url: item.url })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.playHint}>Tap to play</Text>
    </Pressable>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.header}>Games</Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search games…"
            accessibilityLabel="Search games"
            style={styles.search}
            autoCorrect={false}
            autoCapitalize="none"
          />

          <FlatList
            data={filtered}
            keyExtractor={(g) => g.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <Text style={styles.empty}>No games match your search.</Text>
            }
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B0F1A" },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
  },
  search: {
    backgroundColor: "#111A2E",
    borderWidth: 1,
    borderColor: "#22345D",
    color: "white",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  listContent: { paddingBottom: 16 },
  card: {
    backgroundColor: "#0F1730",
    borderWidth: 1,
    borderColor: "#22345D",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  cardPressed: { transform: [{ scale: 0.99 }], opacity: 0.9 },
  title: { color: "white", fontSize: 18, fontWeight: "700" },
  desc: { color: "#B7C4E0", marginTop: 6, lineHeight: 18 },
  playHint: { color: "#7FA6FF", marginTop: 10, fontWeight: "600" },
  empty: { color: "#B7C4E0", marginTop: 20 },
});
