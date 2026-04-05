import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0a0a14",
          borderTopColor: "#1e1e2c",
          height: 70,
          paddingBottom: 12,
        },
        tabBarActiveTintColor: "#ff6b00",
        tabBarInactiveTintColor: "#6a6a88",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Onboarding",
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Aujourd'hui",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>⚡</Text>,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "Collection",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🎌</Text>,
        }}
      />
      <Tabs.Screen
        name="progression"
        options={{
          title: "Progression",
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📈</Text>,
        }}
      />
    </Tabs>
  );
}