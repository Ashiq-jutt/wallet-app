# Upwork Portfolio Entry — Nova Wallet

Everything below is paste-ready. Every claim was fact-checked against the code
(two earlier drafts were rejected for claiming native blur and Reanimated — neither
library is actually imported anywhere, so neither is mentioned).

---

## TITLE  (Upwork limit: 70 characters)

**Primary — 60 chars**

```
Nova Wallet: 23-Screen Fintech App UI in React Native + Expo
```

**Alternates**

| Title | Chars |
|---|---|
| `React Native Wallet UI: 23 Screens, Hand-Written SVG Charts & Icons` | 67 |
| `Design Image to 23-Screen React Native Wallet App (Expo, iOS)` | 61 |
| `Mobile Banking Wallet UI: 23 React Native Screens, Expo SDK 57` | 62 |
| `Nova Wallet - 23-Screen Mobile Banking UI in React Native & Expo` | 64 |

---

## SHORT DESCRIPTION  (the opening blurb / project card)

```
Twenty-three screens of a dark-navy mobile banking wallet, built in React Native 0.86
and Expo SDK 57 from a single design reference image. Charts and a 40-icon set
hand-drawn in react-native-svg, glass panels made from gradients over translucent fills
with hairline borders rather than blur, TypeScript strict, React Navigation 7.
Mock data, no backend — delivered as a runnable Expo project, run as a native iOS build.
```

---

## FULL DESCRIPTION  (paste into the project body)

```
THE BRIEF WAS ONE IMAGE

A dark navy, glass-panelled finance UI - no Figma file, no spec. I turned it into
Nova Wallet: 23 screens that all run and navigate inside one React Native app.

THEME AND COMPONENTS

I sampled the reference into a single theme module - colours, gradients, radii,
spacing, type and shadow tokens - imported by all 23 screen files. The component
folder holds 17 files: 16 shared pieces (cards, buttons, fields, list rows, charts,
a custom tab bar) plus the icon set, 40 icons hand-drawn in react-native-svg, not an
icon font or a library. Both charts are hand-written too: the area chart takes a
number array plus labels and smooths it Catmull-Rom to bezier, the donut strokes each
segment as its own gradient arc. One Screen wrapper owns safe-area insets and
scrolling for every screen.

The glass is a linear-gradient wash over a translucent white fill (2-8% white) inside
a 1px hairline border. Nothing blurs - no blur module is imported anywhere.

THE 23 SCREENS

Entry and auth: Splash, Onboarding (3 paged slides), Sign In, Sign Up, Forgot
Password, Verify (OTP).
Cards: Home (balance donut ring, quick actions, recent activity), Wallet (multi-card
stack, Cards/Account tabs), Card Detail (freeze card, spending limit, online
payments), Add Card (live preview redrawing as you type, colour picker).
Money: Send Money (contact row, custom numeric keypad), Receive (QR panel, shareable
payment link), Top Up (amount presets, pay-with options), Success.
Activity: Transactions (filter chips, searchable, income/outcome totals summed from
the data), Transaction Detail (itemised receipt, report a problem).
Statistics: SVG area chart, spend-by-category breakdown, Week/Month/Year segmented
control.
Account: Notifications, Rewards, Profile, Edit Profile, Settings (biometric unlock,
2FA, trusted devices), Support (search and FAQ).

STRUCTURE AND MOTION

A root native stack; the four-tab bottom navigator behind the custom tab bar is one
route inside it. Transitions are set per route - slide from right, fade, fade from
bottom. React Native's Animated API drives the Splash (scale overshoot via Easing.back
plus an opacity fade) and the Success screen; tiles scale to 0.96 on press; Onboarding
is a paging ScrollView with a scroll-driven dot indicator.

DELIVERED

One codebase - React Native 0.86, Expo SDK 57, TypeScript strict, React Navigation 7 -
split across screens, components, theme, data and navigation. Built and run as a
native iOS Release build in the simulator; nothing built or tested on Android. Shared
demo data (user, cards, transactions, contacts, notifications) sits in one module and
feeds 12 of the 23 screens; the rest carry their content inline. No backend: this is a
UI build.

The attached recording is a scripted walkthrough of the running app, screen by screen -
the small driver that paces it sits behind a DEMO_TOUR flag you switch off to tap
through the app yourself.
```

---

## SKILLS / TAGS

```
React Native · Expo · TypeScript · Mobile App Development · iOS Development
· SVG · Mobile UI Design · Animation
```

Deliberately **not** tagged: Android App Development, Cross-Platform Development
(nothing was built or tested on Android) and Figma to React Native (the brief was an
image, not a Figma file). Claiming those is the kind of thing a technical buyer checks.

---

## FILES IN THIS FOLDER

| File | What it is | Use it for |
|---|---|---|
| `nova-wallet-demo.mp4` | 57s · 750×1630 portrait · 4.4 MB — the real app, screen by screen | The main portfolio video |
| `nova-wallet-demo-landscape.mp4` | 60s · 1920×1080 · 4.3 MB — 3s title card, then the phone on a blurred ambient backdrop | Anywhere a landscape/16:9 video fits better |
| `nova-wallet-cover.png` | 1920×1080 still — three screens on the brand gradient | Project thumbnail / cover image |
| `PROJECT.md` | This file | Title, description, tags |

**How the video was made:** the app was compiled as a native iOS **Release** build
(`npx expo run:ios --configuration Release`) and recorded in the iOS Simulator with
`xcrun simctl io recordVideo` — so what you see is the real app at full speed, with no
Expo Go chrome, no dev-menu overlay and no debug watermark. The status bar is a clean
9:41 via `simctl status_bar override`.

**To re-record:** the walkthrough is driven by `src/demo/tour.ts` (`DEMO_TOUR = true`,
wired into the navigator's `onReady`). Edit the `SCRIPT` array to change the order or
the pacing, rebuild, and record again. Set `DEMO_TOUR = false` to hand the app back to
normal touch navigation.
