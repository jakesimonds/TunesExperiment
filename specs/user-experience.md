# User Experience

## Screens

There are essentially two screens and a persistent "now playing" bar.

### 1. Folder List (Home)

- Shows a flat list of folder names from `library/`
- Each item is just the folder name as plain text
- Tap a folder → navigates to Track List

### 2. Track List

- Shows a flat list of audio file names within the selected folder
- Each item is just the filename (e.g. `01 - Song Name.mp3`)
- Tap a track → starts playback, navigates focus to now-playing

### 3. Now Playing Bar (persistent, bottom of screen)

- Appears once a track starts playing
- Shows: current track filename, current folder name
- Controls: **Play/Pause**, **Skip to Next**
- That's it. No seek bar, no previous track, no volume control.

## Playback Behavior

1. User taps a track in a folder
2. That track starts playing immediately
3. When it finishes, the next track in the folder plays automatically
4. When the last track finishes, it loops back to the first track in the folder
5. Playback continues with the screen off
6. Playback continues when the app is in the background

## Android Media Notification

When audio is playing, the standard Android media notification appears in the notification shade / lock screen:

- **Play / Pause** button
- **Skip** button (next track)
- Shows current track name

This comes from `react-native-track-player`'s built-in notification service.

## No Fancy Stuff

- No album art anywhere
- No progress bar
- No time elapsed / time remaining
- No shuffle
- No repeat toggle (it always loops the folder)
- No queue management
- File names are displayed as-is — no parsing or prettifying
