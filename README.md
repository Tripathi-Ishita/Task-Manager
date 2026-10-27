# Task Manager — React Native

**Live demo:** https://task-manager-psi-beryl-84.vercel.app
*(The same React Native code running in the browser through React Native Web. The web version lives on the [`web`](https://github.com/Tripathi-Ishita/Task-Manager/tree/web) branch.)*

A daily task planner for Android, built with React Native and TypeScript. Pick a day from the week strip, add tasks with a start and end time and a category, and see today's weather at the top.

## Features

- Week strip and calendar picker to move between days
- Create tasks with title, date, start/end time and one of ten categories, with input checks (no empty titles, end after start, no past start times)
- Each category has its own icon and colour; delete a task from its card
- Tasks are saved on the device, so they survive closing the app
- Live weather chip from the OpenWeather API

## Tech

React Native 0.85 · TypeScript · Zustand (with `persist`) · React Navigation (native stack) · AsyncStorage · OpenWeather REST API

**State:** started with React Context, then moved to Zustand to cut the provider boilerplate shared across screens.

## Run it on Android

Set up React Native first: https://reactnative.dev/docs/set-up-your-environment

```sh
npm install
npm start          # Metro, in one terminal
npm run android    # in a second terminal
```

## Project structure

```
App.tsx              navigation (Splash → Home → New Task)
src/screens/         SplashScreen, HomeScreen, TaskDetailScreen
src/components/      TaskCard, CategoryChip, WeatherChip
src/store/           taskStore.ts (Zustand + persist)
```

## Web version

The [`web`](https://github.com/Tripathi-Ishita/Task-Manager/tree/web) branch builds this same app for the browser with Vite and react-native-web, and is what the live demo runs. There the OpenWeather key is kept out of the app entirely: the app calls a small Vercel serverless function that adds the key from an environment variable.
