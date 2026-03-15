# Tech Stack

## Framework

- **React Native** via **Expo** (managed workflow)
- Build with `eas build` (not Expo Go — track player requires a dev build)
- Output: APK for Android, sideloaded

## Key Libraries

| Library | Purpose |
|---|---|
| `react-native-track-player` | Audio playback, background audio, lock screen/notification controls |
| `expo-asset` | Bundling the `library/` music files into the app binary |
| `expo-file-system` | Reading the bundled asset directory structure at runtime |

## Why react-native-track-player

- Purpose-built for background music playback on mobile
- Provides Android media notification (play/pause/skip) for free
- Keeps playing when screen is off via Android foreground service
- Handles audio focus (pauses when a phone call comes in, etc.)
- Works with Expo dev builds

## Build & Deploy

- `eas build --platform android --profile preview` → produces APK
- Sideload APK onto phone (no Play Store)
- Music is baked into the APK as bundled assets

## No Backend

No server. No API. No database. The app is entirely self-contained.
