# Kottekliv Productivity Tool
Kottekliv is a simple but powerful tool to help you manage your time and stay focused. It combines a task list with two types of timers (Stopwatch and Pomodoro) and shows your progress through easy-to-understand graphs. The app is built using React and React Native, ensuring a consistent experience across both web and mobile devices.

Live Demo: [kottekliv.com](kottekliv.com)

## Features
- **Multi-Platform:** Core features like the Timer system and Task Management are developed with React Native for mobile support.
- **Two Timers:** Choose between a regular Stopwatch or a Pomodoro timer.
- **Save Your Sessions:** Log how long you worked, what category it was (eg. "Deep Work" or "Admin"), and how productive you felt.
- **Progress Graphs:** See your work patterns over the week with clear charts.
- **Task List:** Organize your "To-Do" items into different lists.
- **Dark & Light Mode:** Switch between a dark or light theme depending on your preference.
- **Saved Data:** The app remembers your tasks and sessions even if you close the browser.

## How we built it
We used modern tools to make sure the app works smoothly:
- **React & TypeScript:** To build a solid and error-free user interface.
- **Shared Architecture:** A centralized shared directory for types and logic to minimize code duplication.
- **Context & Reducers:** This is the "brain" of the app. It keeps the timer running even when you click around on different pages.
- **Recharts:** A library used to turn your saved data into visual graphs.
- **React Router:** Helps the app navigate between Home, Tasks, Timer, and History without reloading the page.
- **Cloudflare Pages:** Used to host the website online.

## The team
This project was a collaboration between:
- David Lindblom - [GitHub](https://github.com/Gagipose)
- Veronica Czarnotta - [GitHub](https://github.com/vczarnotta)

We shared the work by helping each other with different parts of the code. We made sure to comment on our code so that the other person could easily understand and continue working on it.
