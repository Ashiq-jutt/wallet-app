/**
 * Auto-tour driver — used only to record the portfolio demo video.
 * Flip DEMO_TOUR to false (or delete this folder + the two lines it adds to
 * src/navigation/index.tsx) to return the app to normal interactive behaviour.
 */
import { createNavigationContainerRef } from '@react-navigation/native';

export const DEMO_TOUR = true;

export const navigationRef = createNavigationContainerRef<any>();

type Step = { name: string; params?: object; hold: number };

/** Ordered walkthrough of every screen in the product. */
const SCRIPT: Step[] = [
  // --- onboarding is reached on its own from Splash (1.8s timer) ---
  { name: 'Onboarding', hold: 2200 },

  // --- auth ---
  { name: 'SignIn', hold: 2000 },
  { name: 'ForgotPassword', hold: 1800 },
  { name: 'SignUp', hold: 2200 },
  { name: 'Verify', hold: 2000 },

  // --- home ---
  { name: 'Main', params: { screen: 'Home' }, hold: 3000 },
  { name: 'Notifications', hold: 2200 },

  // --- money movement ---
  { name: 'SendMoney', hold: 2400 },
  { name: 'Success', params: { kind: 'send', amount: '250' }, hold: 2000 },
  { name: 'Receive', hold: 2200 },
  { name: 'TopUp', hold: 2200 },

  // --- activity ---
  { name: 'Transactions', hold: 2400 },
  { name: 'TransactionDetail', params: { id: 't3' }, hold: 2200 },

  // --- wallet ---
  { name: 'Main', params: { screen: 'Wallet' }, hold: 2500 },
  { name: 'CardDetail', params: { id: 'c1' }, hold: 2400 },
  { name: 'AddCard', hold: 2200 },

  // --- insights ---
  { name: 'Main', params: { screen: 'Statistics' }, hold: 2900 },
  { name: 'Rewards', hold: 2200 },

  // --- account ---
  { name: 'Main', params: { screen: 'Profile' }, hold: 2400 },
  { name: 'EditProfile', hold: 2000 },
  { name: 'Settings', hold: 2200 },
  { name: 'Support', hold: 2000 },

  // --- land back home ---
  { name: 'Main', params: { screen: 'Home' }, hold: 3400 },
];

let timers: ReturnType<typeof setTimeout>[] = [];

export function startDemoTour() {
  if (!DEMO_TOUR) return;
  stopDemoTour();

  // Splash replaces itself with Onboarding after 1.8s; pick up just after that.
  let at = 2000;
  for (const step of SCRIPT) {
    const t = setTimeout(() => {
      if (navigationRef.isReady()) navigationRef.navigate(step.name as never, step.params as never);
    }, at);
    timers.push(t);
    at += step.hold;
  }
}

export function stopDemoTour() {
  timers.forEach(clearTimeout);
  timers = [];
}

/** Total runtime of the scripted tour, in seconds — handy when trimming the capture. */
export const TOUR_SECONDS = Math.ceil((2000 + SCRIPT.reduce((s, x) => s + x.hold, 0)) / 1000);
