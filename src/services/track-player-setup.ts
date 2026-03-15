import TrackPlayer, { Capability } from 'react-native-track-player';

let isSetup = false;

export async function setupTrackPlayer(): Promise<boolean> {
  if (isSetup) {
    return true;
  }

  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
    });
    isSetup = true;
    return true;
  } catch (error) {
    console.error('Error setting up TrackPlayer:', error);
    return false;
  }
}
