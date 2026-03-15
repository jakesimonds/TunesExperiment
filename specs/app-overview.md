# App Overview

TunesExperiment is a dead-simple offline music player for Android. Music files are bundled into the app at build time. No server, no streaming, no internet required.

## Core Concept

- A `library/` directory in the project contains folders of audio files
- Each folder = an album
- Folders contain `.mp3` or `.wav` files (MP3 preferred for size)
- At build time, the `library/` contents get bundled as app assets
- The app lets you browse folders, tap a song, and it plays through the folder with looping
- Works with screen off (background audio via Android media service)

## Target User

Jake. One user. Sideloaded APK. Used while running.

## Non-Goals

- No server / no internet required (music plays locally from bundled files)
- No shuffle
- No playlists
- No album art or ID3 metadata reading
- No search
- No favorites / bookmarks
- No playback position memory
- No nested folders (user will keep it flat: library/AlbumName/track.mp3)
- No database

## Key Constraint

An hour of MP3 at 192kbps ≈ 85MB. App size is not a concern for sideloading. The practical limit is "however many albums Jake wants to carry." MP3 is preferred over WAV simply because WAV files are ~10x larger — both formats play fine.
