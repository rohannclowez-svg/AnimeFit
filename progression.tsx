import { Text, View, StyleSheet, ScrollView } from "react-native";

const badges = [
  { emoji: "🔥", name: "7j streak", unlocked: true },
  { emoji: "💪", name: "10 séances", unlocked: true },
  { emoji: "⚔️", name: "Guerrier débloqué", unlocked: false },
  { emoji: "🌀", name: "Maître débloqué", unlocked: false },
  { emoji: "👑", name: "Légende", unlocked: false },
  { emoji: "⚡", name: "Explosif", unlocked: false },
];

export default function Progression() {
  return (
    <View style={s.root}>
      <View style={s.header}>
        <Text style={s.logo}>Anime<Text style={s.orange}>Fit</Text></Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.pageTitle}>Progression</Text>
        <Text style={s.pageSub}>Continue à t'entraîner pour évoluer</Text>

        {/* NIVEAU */}
        <View style={s.lvCard}>
          <View style={s.lvTop} />
          <Text style={s.lvLabel}>NIVEAU ACTUEL</Text>
          <Text style={s.lvNum}>12</Text>
          <Text style={s.lvName}>Guerrier Prometteur</Text>
          <View style={s.lvBarWrap}>
            <View style={s.lvBarFill} />
          </View>
          <Text style={s.lvSub}>680 / 1000 XP • Prochain : Guerrier Confirmé</Text>
        </View>

        {/* STATS */}
        <View style={s.statsGrid}>
          <View style={s.statMini}>
            <Text style={s.statVal}>14</Text>
            <Text style={s.statLbl}>Séances</Text>
          </View>
          <View style={s.statMini}>
            <Text style={s.statVal}>2</Text>
            <Text style={s.statLbl}>Héros débloqués</Text>
          </View>
          <View style={s.statMini}>
            <Text style={s.statVal}>7</Text>
            <Text style={s.statLbl}>Streak 🔥</Text>
          </View>
          <View style={s.statMini}>
            <Text style={s.statVal}>680</Text>
            <Text style={s.statLbl}>XP Total</Text>
          </View>
        </View>

        {/* BADGES */}
        <Text style={s.badgesTitle}>BADGES</Text>
        <View style={s.badgesGrid}>
          {badges.map((b, i) => (
            <View key={i} style={[s.badge, !b.unlocked && s.badgeLocked]}>
              <Text style={s.badgeEmoji}>{b.emoji}</Text>
              <Text style={s.badgeName}>{b.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#080810" },
  header: { padding: 16, paddingTop: 56, borderBottomWidth: 1, borderBottomColor: "#1e1e2c" },
  logo: { fontSize: 22, fontWeight: "bold", color: "#f0ede8", letterSpacing: 3 },
  orange: { color: "#ff6b00" },
  scroll: { padding: 20, paddingBottom: 100 },
  pageTitle: { fontSize: 30, fontWeight: "bold", color: "#f0ede8", letterSpacing: 2, marginBottom: 4 },
  pageSub: { fontSize: 13, color: "#6a6a88", marginBottom: 20 },
  lvCard: { backgroundColor: "#161620", borderWidth: 1, borderColor: "rgba(255,107,0,0.2)", borderRadius: 20, padding: 20, marginBottom: 16, position: "relative", overflow: "hidden" },
  lvTop: { position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundColor: "#ff6b00" },
  lvLabel: { fontSize: 10, letterSpacing: 3, color: "#6a6a88", marginBottom: 6 },
  lvNum: { fontSize: 64, fontWeight: "bold", color: "#ff6b00", lineHeight: 70 },
  lvName: { fontSize: 15, fontWeight: "700", color: "#f0ede8", marginBottom: 14 },
  lvBarWrap: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 4, height: 8, marginBottom: 6, overflow: "hidden" },
  lvBarFill: { width: "68%", height: "100%", backgroundColor: "#ff6b00", borderRadius: 4 },
  lvSub: { fontSize: 12, color: "#6a6a88" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  statMini: { width: "47%", backgroundColor: "#161620", borderWidth: 1, borderColor: "#1e1e2c", borderRadius: 14, padding: 16, alignItems: "center" },
  statVal: { fontSize: 32, fontWeight: "bold", color: "#ffaa00" },
  statLbl: { fontSize: 10, color: "#6a6a88", textTransform: "uppercase", letterSpacing: 2, marginTop: 2 },
  badgesTitle: { fontSize: 10, letterSpacing: 3, color: "#6a6a88", marginBottom: 12 },
  badgesGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  badge: { width: "30%", backgroundColor: "#161620", borderWidth: 1, borderColor: "#1e1e2c", borderRadius: 12, padding: 14, alignItems: "center" },
  badgeLocked: { opacity: 0.3 },
  badgeEmoji: { fontSize: 26, marginBottom: 4 },
  badgeName: { fontSize: 11, fontWeight: "700", color: "#f0ede8", textAlign: "center" },
});