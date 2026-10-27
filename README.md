# Task Manager — React Native

**Live demo:** https://task-manager-psi-beryl-84.vercel.app
*(The same React Native code, running in the browser through React Native Web.)*

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

**API key safety:** the app never contains the OpenWeather key. It calls `api/weather`, a small serverless function on Vercel that adds the key (stored as an environment variable) and returns only the temperature and description.

## Run it on Android

Set up React Native first: https://reactnative.dev/docs/set-up-your-environment

```sh
npm install
npm start          # Metro, in one terminal
npm run android    # in a second terminal
```

## Run it in the browser

```sh
npm install
npm run web          # dev server with hot reload
npm run build:web    # production build into dist/
```

The web build uses Vite and react-native-web. A few phone-only libraries have small browser stand-ins in `web/shims/` (gradient, Ionicons with the same font, date/time picker, alerts), so the app code in `src/` is shared by both.

## Project structure

```
App.tsx              navigation (Splash → Home → New Task)
src/screens/         SplashScreen, HomeScreen, TaskDetailScreen
src/components/      TaskCard, CategoryChip, WeatherChip
src/store/           taskStore.ts (Zustand + persist)
src/config.ts        where the weather comes from
api/weather.js       Vercel serverless function holding the OpenWeather key
web/                 browser entry point and stand-ins for phone-only libraries
```
