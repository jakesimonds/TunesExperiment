import { View, Text, StyleSheet } from 'react-native';
import { useActiveTrack } from 'react-native-track-player';
import { colors, spacing } from '../styles/theme';

export default function NowPlayingBar() {
  const track = useActiveTrack();

  if (!track) {
    return null;
  }

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
});
