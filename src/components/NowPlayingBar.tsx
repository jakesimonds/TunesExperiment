import { View, Text, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { useActiveTrack, useIsPlaying } from 'react-native-track-player';
import { colors, spacing } from '../styles/theme';

export default function NowPlayingBar() {
  const track = useActiveTrack();
  const { playing } = useIsPlaying();

  if (!track) {
    return null;
  }

  const togglePlayPause = async () => {
    if (playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const skipNext = async () => {
    await TrackPlayer.skipToNext();
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {track.title ?? 'Unknown Track'}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {track.artist ?? ''}
        </Text>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={togglePlayPause} style={styles.button} hitSlop={8}>
          <Text style={styles.buttonText}>{playing ? '⏸' : '▶'}</Text>
        </Pressable>
        <Pressable onPress={skipNext} style={styles.button} hitSlop={8}>
          <Text style={styles.buttonText}>⏭</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: spacing.rowHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  artist: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: colors.text,
  },
});
