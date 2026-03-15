# Asset Bundling

This is the trickiest part of the project. The music files need to be part of the app binary.

## Directory Structure

```
TunesExperiment/
├── library/
│   ├── My Album/
│   │   ├── 01 - First Song.mp3
│   │   ├── 02 - Second Song.mp3
│   │   └── 03 - Third Song.mp3
│   └── Running Mix/
│       ├── track1.mp3
│       └── track2.wav
├── app/
│   └── ... (React Native code)
└── ...
```

## The Challenge

Expo's asset system (`expo-asset`) is designed for known, individually-referenced assets — not for dynamically reading a directory of unknown files. We need a build-time step that:

1. Scans `library/` for folders and audio files
2. Generates a manifest (JSON) listing all folders and their tracks
3. Registers each audio file as a bundled asset
4. At runtime, the app reads the manifest and uses it to locate and play files

## Approach: Build-Time Asset Manifest

A script (or Expo config plugin) runs before/during build:

1. Walks `library/` recursively (one level deep — folders only, no nesting)
2. Produces `assets/music-manifest.json`:
   ```json
   {
     "folders": [
       {
         "name": "My Album",
         "tracks": [
           { "filename": "01 - First Song.mp3", "path": "library/My Album/01 - First Song.mp3" },
           { "filename": "02 - Second Song.mp3", "path": "library/My Album/02 - Second Song.mp3" }
         ]
       }
     ]
   }
   ```
3. Generates a `library-index.ts` file that `require()`s each audio file so Metro/Expo bundles them
4. The app imports the manifest and the asset references at runtime

## Supported Formats

- `.mp3` (primary, recommended)
- `.wav` (supported, but files are ~10x larger)

## Adding New Music

1. Drop files into `library/YourAlbumName/`
2. Rebuild the app (`eas build`)
3. Sideload the new APK

There is no way to add music without rebuilding. This is by design — keeps the app simple.
