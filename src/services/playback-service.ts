import TrackPlayer, { Event } from 'react-native-track-player';

export async function PlaybackService() {
  // Remote / notification controls
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteNext, () =>
    TrackPlayer.skipToNext(),
  );

  // Audio focus: autoHandleInterruptions (in setupPlayer) pauses/resumes for
  // transient interruptions (phone calls, other media apps). This handler
  // covers permanent focus loss — e.g. another music app fully takes over.
  TrackPlayer.addEventListener(Event.RemoteDuck, async (event) => {
    if (event.permanent) {
      await TrackPlayer.stop();
    }
  });

  // Auto-advance: react-native-track-player handles moving to the
  // next track in the queue automatically. This listener logs the
  // transition for debugging.
  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    ({ index, track }) => {
      if (track) {
        console.log(`Now playing [${index}]: ${track.title}`);
      }
    },
  );
}
