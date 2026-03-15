# TunesExperiment

Bare-bones offline music player for Android — started 2026-03-15.

**Method: Ralph (ghuntley/how-to-ralph-wiggum).**

## Running

```bash
# TBD — update once Phase 1 tasks define the dev setup
npx expo start --dev-client    # likely
```

## Architecture

- **Framework**: React Native via Expo (managed workflow, eas build)
- **Audio**: react-native-track-player (background playback, lock screen controls)
- **Music**: Bundled as assets at build time from `library/` directory
- **No database. No server. No internet.**
- See `specs/` for detailed requirements per topic
- See `IMPLEMENTATION_PLAN.md` for Ralph task list

## Agent Rules

- NEVER use the AskUserQuestion tool. Always ask questions as plain text.
- One task per session. Verify. Commit. Exit.
- Keep tasks small and independently verifiable.
