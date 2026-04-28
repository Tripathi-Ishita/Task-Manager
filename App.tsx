import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TaskDetailScreen from "./src/screens/TaskDetailScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/SplashScreen";
import { StatusBar } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TaskProvider } from "./src/screens/TaskContext";

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Splash',
  screens:
  {
    Home: { screen: HomeScreen, options: { headerShown: false } },
    Splash: { screen: SplashScreen, options: { headerShown: false } },
    TaskDetail: { screen: TaskDetailScreen, options: { headerShown: false } }
  }
});
const Navigation = createStaticNavigation(RootStack);

const App = () => {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <StatusBar barStyle="dark-content"
          backgroundColor="transparent"
        />
        <Navigation />
      </TaskProvider>
    </SafeAreaProvider>

  );
};
export default App;