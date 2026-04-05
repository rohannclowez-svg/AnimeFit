import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

const characters = [
  { id: "colosse", emoji: "💪", name: "Le Colosse", type: "Prise de masse", sessions: 2, required: 5, unlocked: false },
  { id: "chasseur", emoji: "🏃", name: "Le Chasseur", type: "Perte de poids", sessions: 5, required: 5, unlocked: true },
  { id: "elu", emoji: "⚡", name: "L'Élu", type: "Explosivité", sessions: 1, required: 5, unlocked: false },
  { id: "maitre", emoji: "🧘", name: "Le Maître", type: "Mobilité / Zen", sessions: 0, required: 5, unlocked: false },
  { id: "renegat", emoji: "💀", name: "Le Renégat", type: "Dépassement de soi", sessions: 5, required: 5, unlocked: true },
  { id: "eternel", emoji: "🏆", name: "L'Éternel", type: "Endurance", sessions: 3, required: 5, unlocked: false },
];

export default function Collection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <View style={s.root}>
      <View style={s.header}>
        <Text style={s.logo}>Anime<Text style={s.orange}>Fit</Text></Text>
      </View>

      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.pageTitle}>Collection</Text>
        <Text style={s.pageSub}>Entraîne-toi pour débloquer tes héros</Text>

        <View style={s.grid}>
          {characters.map(char => (
            <TouchableOpacity
              key={char.id}
              style={[s.card, char.unlocked && s.cardUnlocked, !char.unlocked && s.cardLocked]}
              onPress={() => setSelected(char.id === selected ? null : char.id)}
            >
              {char.unlocked && <View style={s.cardTopBar} />}
              <Text style={s.cardLockIcon}>{char.unlocked ? "✨" : "🔒"}</Text>
              <Text style={s.cardEmoji}>{char.emoji}</Text>
              <Text style={s.cardName}>{char.name}</Text>
              <Text style={s.cardType}>{char.type}</Text>
              <Text style={s.cardProg}>
                {char.unlocked ? "✅ Débloqué" : `${char.sessions}/${char.required} séances`}
              </Text>

              {/* BARRE DE PROGRESSION */}
              {!char.unlocked && (
                <View style={s.progBarWrap}>
                  <View style={[s.progBarFill, { width: `${Math.round(char.sessions / char.required * 100)}%` as any }]} />
                </View>
              )}

              {/* DETAIL SI SÉLECTIONNÉ */}
              {selected === char.id && (
                <View style={s.detail}>
                  <Text style={s.detailTxt}>
                    {char.unlocked
                      ? "Ce héros est disponible dans ton planning !"
                      : `Il te reste ${char.required - char.sessions} séance(s) pour débloquer ce héros.`}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
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
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: { width: "47%", backgroundColor: "#161620", borderWidth: 1.5, borderColor: "#1e1e2c", borderRadius: 16, padding: 14, alignItems: "center", position: "relative" },
  cardUnlocked: { borderColor: "rgba(255,107,0,0.5)" },
  cardLocked: { opacity: 0.6 },
  cardTopBar: { position: "absolute", top: 0, left: 0, right: 0, height: 2, backgroundColor: "#ff6b00", borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  cardLockIcon: { position: "absolute", top: 8, right: 10, fontSize: 12 },
  cardEmoji: { fontSize: 34, marginBottom: 8, marginTop: 8 },
  cardName: { fontSize: 13, fontWeight: "700", color: "#f0ede8", textAlign: "center" },
  cardType: { fontSize: 10, color: "#ff6b00", fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginTop: 3, textAlign: "center" },
  cardProg: { fontSize: 11, color: "#6a6a88", marginTop: 6 },
  progBarWrap: { width: "100%", height: 3, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 2, marginTop: 8, overflow: "hidden" },
  progBarFill: { height: "100%", backgroundColor: "#ff6b00", borderRadius: 2 },
  detail: { marginTop: 10, backgroundColor: "rgba(255,107,0,0.08)", borderRadius: 8, padding: 8, width: "100%" },
  detailTxt: { fontSize: 11, color: "#f0ede8", textAlign: "center", lineHeight: 16 },
});