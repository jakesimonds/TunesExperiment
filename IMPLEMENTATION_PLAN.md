# Implementation Plan — TunesExperiment

> **Method**: Ralph (ghuntley/how-to-ralph-wiggum)
> **Total tasks**: 18
> **Checkpoints**: marked with 🏁 — at each checkpoint, the app can be tested on a real device.

---

## Phase 1: Project Setup & Navigation

### 🏁 Checkpoint: Scan QR code → app opens with two screens you can tap between.

- [x] TASK-01: Initialize Expo project with TypeScript
  - **What**: Create the Expo app in the project root using `npx create-expo-app`
  - **Acceptance criteria**:
    - `npx expo start` launches the dev server
    - App renders "TunesExperiment" text on screen
    - TypeScript is configured and working
  - **Files**: `app.json`, `tsconfig.json`, `package.json`, `App.tsx`

- [x] TASK-02: Set up folder list and track list screens with React Navigation
  - **What**: Two screens — FolderListScreen and TrackListScreen — with stack navigation
  - **Acceptance criteria**:
    - App opens to FolderListScreen showing hardcoded folder names ("Test Album 1", "Test Album 2")
    - Tapping a folder navigates to TrackListScreen showing hardcoded track names
    - Back button returns to FolderListScreen
  - **Depends**: TASK-01
  - **Files**: `src/screens/FolderListScreen.tsx`, `src/screens/TrackListScreen.tsx`, `src/navigation/AppNavigator.tsx`, `App.tsx`

- [x] TASK-03: Style screens with bare-bones UI
  - **What**: Minimal, clean styling — flat lists with clear tap targets for running (big text, easy to hit)
  - **Acceptance criteria**:
    - FolderListScreen: flat list, folder names in large readable text, full-width rows
    - TrackListScreen: flat list, track names in large readable text, header shows folder name
    - Dark background, light text (easier to read while running)
  - **Depends**: TASK-02
  - **Files**: `src/screens/FolderListScreen.tsx`, `src/screens/TrackListScreen.tsx`, `src/styles/theme.ts`

---

## Phase 2: Asset Bundling Pipeline

### 🏁 Checkpoint: App shows real folder names and real track names from library/ directory.

- [x] TASK-04: Create library/ directory with test MP3 fixtures
  - **What**: Create `library/TestAlbum1/` and `library/TestAlbum2/` with short test MP3 files (generated tones, ~30 seconds each)
  - **Acceptance criteria**:
    - `library/TestAlbum1/` has 3 MP3 files
    - `library/TestAlbum2/` has 2 MP3 files
    - Files are valid MP3s that can be played
  - **Files**: `library/TestAlbum1/*.mp3`, `library/TestAlbum2/*.mp3`

- [x] TASK-05: Build-time script to generate music manifest
  - **What**: Node script that scans `library/`, produces a manifest JSON and a `library-index.ts` that `require()`s each audio file
  - **Acceptance criteria**:
    - `node scripts/generate-manifest.js` runs without errors
    - Produces `src/generated/music-manifest.json` with folder names and track filenames
    - Produces `src/generated/library-index.ts` with require() calls for each audio file
    - Script handles .mp3 and .wav extensions
  - **Files**: `scripts/generate-manifest.js`, `src/generated/music-manifest.json`, `src/generated/library-index.ts`

- [ ] TASK-06: Wire manifest into screens — show real library data
  - **What**: Replace hardcoded data in FolderListScreen and TrackListScreen with data from the generated manifest
  - **Acceptance criteria**:
    - FolderListScreen shows "TestAlbum1" and "TestAlbum2" (from manifest)
    - Tapping a folder shows real track filenames from that folder
    - Adding a new folder to library/ and re-running generate-manifest updates the app
  - **Depends**: TASK-05
  - **Files**: `src/screens/FolderListScreen.tsx`, `src/screens/TrackListScreen.tsx`, `src/data/library.ts`

---

## Phase 3: Audio Playback

### 🏁 Checkpoint: Tap a song → it plays. Finishes → next song plays. Last song → loops to first.

- [ ] TASK-07: Install and configure react-native-track-player
  - **What**: Add react-native-track-player, register playback service, basic initialization
  - **Acceptance criteria**:
    - `react-native-track-player` is installed
    - TrackPlayer.setupPlayer() runs on app start without crashing
    - Playback service is registered in `index.js`
  - **Depends**: TASK-01
  - **Files**: `package.json`, `index.js`, `src/services/playback-service.ts`, `src/services/track-player-setup.ts`

- [ ] TASK-08: Play a track when tapped
  - **What**: Tapping a track in TrackListScreen loads it into track player and plays it
  - **Acceptance criteria**:
    - Tap a track → audio plays from the bundled MP3
    - Tapping a different track stops the current one and plays the new one
    - Track player receives the correct asset URI from library-index
  - **Depends**: TASK-06, TASK-07
  - **Files**: `src/screens/TrackListScreen.tsx`, `src/services/queue-manager.ts`

- [ ] TASK-09: Auto-advance to next track
  - **What**: When a track finishes, automatically play the next track in the folder
  - **Acceptance criteria**:
    - Track finishes → next track in folder starts automatically
    - Queue is loaded with all tracks from the current folder in order
  - **Depends**: TASK-08
  - **Files**: `src/services/queue-manager.ts`, `src/services/playback-service.ts`

- [ ] TASK-10: Loop folder when last track finishes
  - **What**: After the last track in a folder finishes, loop back to the first track
  - **Acceptance criteria**:
    - Last track finishes → first track in folder plays
    - This loops indefinitely
  - **Depends**: TASK-09
  - **Files**: `src/services/queue-manager.ts`

---

## Phase 4: Background Playback & Notification Controls

### 🏁 Checkpoint: Lock phone → music keeps playing. Notification shade has play/pause/skip.

- [ ] TASK-11: Enable background audio playback
  - **What**: Configure Android foreground service so audio continues when app is backgrounded or screen is off
  - **Acceptance criteria**:
    - Press home button → music keeps playing
    - Turn screen off → music keeps playing
    - App is not killed by Android while playing
  - **Depends**: TASK-08
  - **Files**: `app.json` (or `app.config.js`), Android-specific config

- [ ] TASK-12: Lock screen and notification media controls
  - **What**: Configure react-native-track-player notification capabilities — play/pause, skip next
  - **Acceptance criteria**:
    - Media notification appears in notification shade when playing
    - Shows current track name
    - Play/Pause button works from notification
    - Skip Next button works from notification
    - Controls appear on lock screen
  - **Depends**: TASK-11
  - **Files**: `src/services/playback-service.ts`, `src/services/track-player-setup.ts`

- [ ] TASK-13: Handle audio focus (phone calls, other apps)
  - **What**: Pause playback when another app takes audio focus, resume when it's released
  - **Acceptance criteria**:
    - Phone call → music pauses → call ends → music resumes
    - Another media app plays → TunesExperiment pauses
  - **Depends**: TASK-12
  - **Files**: `src/services/track-player-setup.ts`

---

## Phase 5: Now Playing Bar

### 🏁 Checkpoint: Persistent bar at bottom shows current track. Play/pause and skip work from the bar.

- [ ] TASK-14: Now-playing bar component
  - **What**: Persistent bar at the bottom of both screens showing current track info and controls
  - **Acceptance criteria**:
    - Bar appears at bottom once a track starts playing
    - Shows: track filename, folder name
    - Hidden when nothing has been played yet
  - **Depends**: TASK-08
  - **Files**: `src/components/NowPlayingBar.tsx`

- [ ] TASK-15: Play/pause and skip controls in now-playing bar
  - **What**: Add play/pause button and skip-next button to the now-playing bar
  - **Acceptance criteria**:
    - Play/Pause toggles playback state, icon updates to reflect state
    - Skip Next advances to next track (with folder looping)
    - Controls respond quickly (no lag)
  - **Depends**: TASK-14
  - **Files**: `src/components/NowPlayingBar.tsx`

- [ ] TASK-16: Highlight currently playing track in track list
  - **What**: When viewing the track list for the currently playing folder, highlight the active track
  - **Acceptance criteria**:
    - Currently playing track is visually distinct (bold, different color, or indicator)
    - Updates when track auto-advances
  - **Depends**: TASK-14
  - **Files**: `src/screens/TrackListScreen.tsx`

---

## Phase 6: Build & Ship

### 🏁 Checkpoint: APK file on Jake's phone. Music plays while running. Done.

- [ ] TASK-17: Configure EAS Build for Android APK
  - **What**: Set up `eas.json` with a preview profile that produces a sideloadable APK
  - **Acceptance criteria**:
    - `eas build --platform android --profile preview` starts a build
    - Build completes and produces an APK (not AAB)
    - `eas.json` has correct config for APK output
  - **Depends**: TASK-11
  - **Files**: `eas.json`, `app.json`

- [ ] TASK-18: End-to-end build verification and generate-manifest in prebuild
  - **What**: Wire `generate-manifest.js` into the build pipeline so it runs automatically, verify full build works
  - **Acceptance criteria**:
    - Manifest generation runs as a prebuild step (npm script or expo config plugin)
    - `eas build` produces a working APK with bundled music
    - APK installs on Android device and all features work
  - **Depends**: TASK-17
  - **Files**: `package.json` (scripts), `eas.json`, `app.config.js`
