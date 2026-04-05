import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const [step, setStep] = useState(1);
  const [equip, setEquip] = useState<string[]>(["bodyweight"]);
  const [time, setTime] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const router = useRouter();

  const toggleEquip = (key: string) => {
    setEquip(prev => prev.includes(key) ? prev.filter(e => e !== key) : [...prev, key]);
  };

  const toggleGoal = (key: string) => {
    setGoals(prev => prev.includes(key) ? prev.filter(g => g !== key) : [...prev, key]);
  };

  const equipItems = [
    { key: "bodyweight", icon: "🏠", label: "Poids du corps", sub: "Toujours dispo" },
    { key: "bar", icon: "🔩", label: "Barre de traction", sub: "Chez toi" },
    { key: "dumbbells", icon: "🏋️", label: "Haltères", sub: "Paire ou réglables" },
    { key: "bands", icon: "🪢", label: "Élastiques", sub: "Résistance légère" },
    { key: "rings", icon: "⭕", label: "Anneaux", sub: "Calisthenics" },
    { key: "bench", icon: "🛋️", label: "Banc / chaise", sub: "Dips, élévations" },
    { key: "barbell", icon: "🏗️", label: "Barre olympique", sub: "Squat, deadlift" },
    { key: "gym", icon: "🏟️", label: "Salle complète", sub: "Accès machines" },
  ];

  const timeItems = [
    { key: "15", icon: "⚡", label: "15 minutes", sub: "Séance express" },
    { key: "30", icon: "🔥", label: "30 minutes", sub: "Le sweet spot" },
    { key: "45", icon: "💪", label: "45 minutes", sub: "Séance complète" },
    { key: "60", icon: "🏆", label: "1h et +", sub: "Tout donner" },
  ];

  const goalItems = [
    { key: "mass", icon: "💪", label: "Prise de masse", sub: "Devenir imposant et puissant", perso: "Le Colosse" },
    { key: "fat", icon: "🔥", label: "Perte de poids", sub: "Brûler et sculpter ton corps", perso: "Le Chasseur" },
    { key: "explo", icon: "⚡", label: "Explosivité", sub: "Vitesse et puissance maximale", perso: "L'Élu" },
    { key: "zen", icon: "🧘", label: "Mobilité / Zen", sub: "Souplesse et contrôle total", perso: "Le Maître" },
    { key: "limit", icon: "💀", label: "Dépassement de soi", sub: "Repousser toutes les limites", perso: "Le Renégat" },
    { key: "endur", icon: "🏃", label: "Endurance", sub: "Indestructible, jamais fatigué", perso: "L'Éternel" },
  ];

  return (
    <View style={s.root}>
      <ScrollView contentContainerStyle={s.scroll}>
        <Text style={s.logo}>Anime<Text style={s.orange}>Fit</Text></Text>

        {/* PROGRESS DOTS */}
        <View style={s.dots}>
          {[1,2,3].map(i => (
            <View key={i} style={[s.dot, step >= i && s.dotActive]} />
          ))}
        </View>

        {/* STEP 1 — ÉQUIPEMENT */}
        {step === 1 && (
          <View>
            <Text style={s.stepNum}>Étape 1 / 3</Text>
            <Text style={s.title}>Ton équipement ?</Text>
            <Text style={s.sub}>Sélectionne tout ce que t'as.</Text>
            <View style={s.grid2}>
              {equipItems.map(item => (
                <TouchableOpacity
                  key={item.key}
                  style={[s.gridItem, equip.includes(item.key) && s.gridItemActive]}
                  onPress={() => toggleEquip(item.key)}
                >
                  <Text style={s.gridIcon}>{item.icon}</Text>
                  <Text style={s.gridLabel}>{item.label}</Text>
                  <Text style={s.gridSub}>{item.sub}</Text>
                  {equip.includes(item.key) && <Text style={s.check}>✓</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 2 — TEMPS */}
        {step === 2 && (
          <View>
            <Text style={s.stepNum}>Étape 2 / 3</Text>
            <Text style={s.title}>Combien de temps ?</Text>
            <Text style={s.sub}>Par séance. Sois honnête.</Text>
            {timeItems.map(item => (
              <TouchableOpacity
                key={item.key}
                style={[s.listItem, time === item.key && s.listItemActive]}
                onPress={() => setTime(item.key)}
              >
                <Text style={s.listIcon}>{item.icon}</Text>
                <View style={s.listText}>
                  <Text style={s.listLabel}>{item.label}</Text>
                  <Text style={s.listSub}>{item.sub}</Text>
                </View>
                {time === item.key && <Text style={s.check}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* STEP 3 — OBJECTIFS */}
        {step === 3 && (
          <View>
            <Text style={s.stepNum}>Étape 3 / 3</Text>
            <Text style={s.title}>Ton objectif ?</Text>
            <Text style={s.sub}>Ton héros sera choisi selon ta réponse.</Text>
            {goalItems.map(item => (
              <TouchableOpacity
                key={item.key}
                style={[s.listItem, goals.includes(item.key) && s.listItemActive]}
                onPress={() => toggleGoal(item.key)}
              >
                <Text style={s.listIcon}>{item.icon}</Text>
                <View style={s.listText}>
                  <Text style={s.listLabel}>{item.label}</Text>
                  <Text style={s.listSub}>{item.sub}</Text>
                  {goals.includes(item.key) && (
                    <Text style={s.persoTag}>→ {item.perso}</Text>
                  )}
                </View>
                {goals.includes(item.key) && <Text style={s.check}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* BOUTON */}
        <TouchableOpacity
  style={[s.btn, step === 3 && goals.length === 0 && s.btnDisabled]}
  onPress={() => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      router.push("/home");
    }
  }}
  disabled={step === 3 && goals.length === 0}
        >
          <Text style={s.btnTxt}>{step === 3 ? "C'EST PARTI 🔥" : "CONTINUER →"}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#080810" },
  scroll: { padding: 24, paddingTop: 56 },
  logo: { fontSize: 30, fontWeight: "bold", color: "#f0ede8", letterSpacing: 4, marginBottom: 28 },
  orange: { color: "#ff6b00" },
  dots: { flexDirection: "row", gap: 6, marginBottom: 28 },
  dot: { flex: 1, height: 3, backgroundColor: "#1e1e2c", borderRadius: 2 },
  dotActive: { backgroundColor: "#ff6b00" },
  stepNum: { fontSize: 11, letterSpacing: 4, color: "#ff6b00", textTransform: "uppercase", marginBottom: 8, fontWeight: "700" },
  title: { fontSize: 36, fontWeight: "bold", color: "#f0ede8", marginBottom: 8 },
  sub: { fontSize: 13, color: "#6a6a88", marginBottom: 24, lineHeight: 20 },
  grid2: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 8 },
  gridItem: { width: "47%", backgroundColor: "#161620", borderWidth: 1.5, borderColor: "#1e1e2c", borderRadius: 14, padding: 14, alignItems: "center", position: "relative" },
  gridItemActive: { borderColor: "#ff6b00", backgroundColor: "rgba(255,107,0,0.1)" },
  gridIcon: { fontSize: 26, marginBottom: 6 },
  gridLabel: { fontSize: 13, fontWeight: "700", color: "#f0ede8", textAlign: "center" },
  gridSub: { fontSize: 11, color: "#6a6a88", marginTop: 2, textAlign: "center" },
  check: { position: "absolute", top: 8, right: 10, color: "#ff6b00", fontWeight: "700", fontSize: 12 },
  listItem: { backgroundColor: "#161620", borderWidth: 1.5, borderColor: "#1e1e2c", borderRadius: 14, padding: 16, flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 10 },
  listItemActive: { borderColor: "#ff6b00", backgroundColor: "rgba(255,107,0,0.1)" },
  listIcon: { fontSize: 24, width: 32, textAlign: "center" },
  listText: { flex: 1 },
  listLabel: { fontSize: 15, fontWeight: "700", color: "#f0ede8" },
  listSub: { fontSize: 11, color: "#6a6a88", marginTop: 2 },
  persoTag: { fontSize: 11, color: "#ff6b00", fontWeight: "700", marginTop: 4 },
  btn: { marginTop: 24, padding: 18, backgroundColor: "#ff6b00", borderRadius: 14, alignItems: "center" },
  btnDisabled: { backgroundColor: "#2a2a3a" },
  btnTxt: { color: "white", fontSize: 18, fontWeight: "bold", letterSpacing: 3 },
});