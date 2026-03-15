import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { getTracks, getAsset } from '../data/library';

/**
 * Load all tracks from a folder into the queue and start playing
 * the track at the given index.
 *
 * All folder tracks are added to the queue so the player
 * auto-advances to the next track when the current one finishes.
 */
export async function playTrackFromFolder(
  folderName: string,
  trackIndex: number,
): Promise<void> {
  const tracks = getTracks(folderName);
  if (tracks.length === 0) return;

  // Reset the queue
  await TrackPlayer.reset();

  // Auto-advance through the queue; stop after the last track
  // (TASK-10 will switch this to RepeatMode.Queue for looping)
  await TrackPlayer.setRepeatMode(RepeatMode.Off);

  // Build the queue from the folder's tracks
  const queue = tracks.map((track) => ({
    id: track.path,
    url: getAsset(track.path),
    title: track.filename.replace(/\.\w+$/, ''),
    artist: folderName,
  }));

  await TrackPlayer.add(queue);
  await TrackPlayer.skip(trackIndex);
  await TrackPlayer.play();
}
