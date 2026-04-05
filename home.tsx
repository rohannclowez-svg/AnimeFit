import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

const character = {
  emoji: "⚔️",
  name: "Le Guerrier Solitaire",
  type: "Force / Core",
  quote: "Rien ne s'obtient sans sacrifice.",
  sessions: 2,
  required: 5,
  stats: [
    { label: "Force", value: 92 },
    { label: "Endurance", value: 88 },
    { label: "Vitesse", value: 79 },
  ],
  exercises: [
    { name: "Pompes larges", detail: "4 × 20 reps • 60s repos" },
    { name: "Tractions", detail: "3 × 10 reps • 90s repos" },
    { name: "Planche", detail: "3 × 60 sec • 45s repos" },
    { name: "Dips triceps", detail: "4 × 15 reps • 60s repos" },
  ],
};

export default function Home() {
  const [done, setDone] = useState<boolean[]>(character.exercises.map(() => false));
  const [xp, setXp] = useState(680);
  const [streak, setStreak] = useState(7);
  const [validated, setValidated] = useState(false);

  const toggleEx = (i: number) => {
    setDone(prev => prev.map((d, idx) => idx === i ? !d : d));
  };

  const allDone = done.every(Boolean);

  const validate = () => {
    setXp(prev => prev + 120);
    setStreak(prev => prev + 1);
    setValidated(true);
    setTimeout(() => {
      setDone(character.exercises.map(() => false));
      setValidated(false);
    }, 2500);
  };

  const lockPct = Math.round(character.sessions / character.required * 100);

  return (
    <View style={s.root}>
      {/* HEADER */}
      <View style={s.header}>
        <Text style={s.logo}>Anime<Text style={s.orange}>Fit</Text></Text>
        <View style={s.headerRight}>
          <Text style={s.xpText}>{xp} XP</Text>
          <View style={s.streakPill}>
            <Text style={s.streakText}>🔥 {streak}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.dayLabel}>Training du jour</Text>

        {/* CHAR CARD */}
        <View style={s.card}>
          <View style={s.cardTop}>
            <View style={s.ava}>
              <Text style={s.avaEmoji}>{character.emoji}</Text>
            </View>
            <View style={s.charInfo}>
              <Text style={s.charType}>{character.type.toUpperCase()}</Text>
              <Text style={s.charName}>{character.name}</Text>
              <Text style={s.charQuote}>"{character.quote}"</Text>
              {/* UNLOCK BAR */}
              <View style={s.lockRow}>
                <View style={s.lockBarWrap}>
                  <View style={[s.lockBarFill, { width: `${lockPct}%` as any }]} />
                </View>
                <Text style={s.lockTxt}>{character.sessions}/{character.required} séances</Text>
              </View>
            </View>
          </View>

          {/* STATS */}
          <View style={s.statsBlk}>
            <Text style={s.blkHead}>ATTRIBUTS</Text>
            {character.stats.map(stat => (
              <View key={stat.label} style={s.statRow}>
                <Text style={s.statLbl}>{stat.label}</Text>
                <View style={s.statBar}>
                  <View style={[s.statFill, { width: `${stat.value}%` as any }]} />
                </View>
                <Text style={s.statNum}>{stat.value}</Text>
              </View>
            ))}
          </View>

          {/* EXERCISES */}
          <View style={s.exBlk}>
            <View style={s.exHead}>
              <Text style={s.exTitle}>PROGRAMME</Text>
              <View style={s.diffPill}>
                <Text style={s.diffTxt}>Intense</Text>
              </View>
            </View>
            {character.exercises.map((ex, i) => (
              <TouchableOpacity key={i} style={s.exItem} onPress={() => toggleEx(i)}>
                <Text style={s.exNum}>0{i + 1}</Text>
                <View style={s.exInfo}>
                  <Text style={[s.exName, done[i] && s.exNameDone]}>{ex.name}</Text>
                  <Text style={s.exDetail}>{ex.detail}</Text>
                </View>
                <View style={[s.exChk, done[i] && s.exChkDone]}>
                  <Text style={[s.exChkTxt, done[i] && s.exChkTxtDone]}>✓</Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[s.btn, validated && s.btnDone]}
              onPress={validate}
              disabled={!allDone || validated}
            >
              <Text style={[s.btnTxt, validated && s.btnTxtDone]}>
                {validated ? "🔥 SÉANCE VALIDÉE !" : allDone ? "✅ VALIDER LA SÉANCE (+120 XP)" : "⚔️ COMPLÈTE LES EXERCICES"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#080810" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, paddingTop: 56, borderBottomWidth: 1, borderBottomColor: "#1e1e2c" },
  logo: { fontSize: 22, fontWeight: "bold", color: "#f0ede8", letterSpacing: 3 },
  orange: { color: "#ff6b00" },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  xpText: { fontSize: 12, fontWeight: "700", color: "#6a6a88" },
  streakPill: { backgroundColor: "rgba(255,107,0,0.12)", borderWidth: 1, borderColor: "rgba(255,107,0,0.3)", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 50 },
  streakText: { fontSize: 13, fontWeight: "700", color: "#ffaa00" },
  scroll: { padding: 20 },
  dayLabel: { fontSize: 10, letterSpacing: 4, color: "#ff6b00", textTransform: "uppercase", fontWeight: "700", marginBottom: 14 },
  card: { backgroundColor: "#161620", borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,107,0,0.2)", overflow: "hidden" },
  cardTop: { flexDirection: "row", gap: 16, padding: 18, borderBottomWidth: 1, borderBottomColor: "#1e1e2c" },
  ava: { width: 68, height: 68, borderRadius: 34, backgroundColor: "rgba(255,107,0,0.1)", borderWidth: 2, borderColor: "rgba(255,107,0,0.4)", alignItems: "center", justifyContent: "center" },
  avaEmoji: { fontSize: 34 },
  charInfo: { flex: 1 },
  charType: { fontSize: 10, letterSpacing: 2, color: "#ff6b00", fontWeight: "700" },
  charName: { fontSize: 22, fontWeight: "bold", color: "#f0ede8", marginTop: 2 },
  charQuote: { fontSize: 12, color: "#6a6a88", fontStyle: "italic", marginTop: 3, lineHeight: 18 },
  lockRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 8 },
  lockBarWrap: { flex: 1, height: 4, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" },
  lockBarFill: { height: "100%", backgroundColor: "#ff6b00", borderRadius: 2 },
  lockTxt: { fontSize: 10, color: "#6a6a88", fontWeight: "700" },
  statsBlk: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#1e1e2c" },
  blkHead: { fontSize: 10, letterSpacing: 3, color: "#6a6a88", marginBottom: 10 },
  statRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 7 },
  statLbl: { fontSize: 11, fontWeight: "700", color: "#6a6a88", width: 70, letterSpacing: 1 },
  statBar: { flex: 1, height: 5, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" },
  statFill: { height: "100%", backgroundColor: "#ff6b00", borderRadius: 3 },
  statNum: { fontSize: 12, fontWeight: "700", color: "#ffaa00", width: 26, textAlign: "right" },
  exBlk: { padding: 16 },
  exHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  exTitle: { fontSize: 10, letterSpacing: 3, color: "#6a6a88" },
  diffPill: { backgroundColor: "rgba(230,57,70,0.15)", borderWidth: 1, borderColor: "rgba(230,57,70,0.3)", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 50 },
  diffTxt: { fontSize: 10, fontWeight: "700", color: "#e63946", letterSpacing: 2 },
  exItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#1e1e2c" },
  exNum: { fontSize: 18, fontWeight: "bold", color: "rgba(255,107,0,0.3)", width: 24 },
  exInfo: { flex: 1 },
  exName: { fontSize: 15, fontWeight: "700", color: "#f0ede8" },
  exNameDone: { textDecorationLine: "line-through", color: "#6a6a88" },
  exDetail: { fontSize: 11, color: "#6a6a88", marginTop: 2 },
  exChk: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: "rgba(255,107,0,0.3)", alignItems: "center", justifyContent: "center" },
  exChkDone: { backgroundColor: "#00e676", borderColor: "#00e676" },
  exChkTxt: { fontSize: 12, color: "transparent" },
  exChkTxtDone: { color: "#000" },
  btn: { marginTop: 16, padding: 16, backgroundColor: "#ff6b00", borderRadius: 14, alignItems: "center" },
  btnDone: { backgroundColor: "#00e676" },
  btnTxt: { color: "white", fontSize: 16, fontWeight: "bold", letterSpacing: 2 },
  btnTxtDone: { color: "#000" },
});