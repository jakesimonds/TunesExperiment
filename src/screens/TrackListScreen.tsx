import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useActiveTrack } from 'react-native-track-player';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../styles/theme';
import { getTracks } from '../data/library';
import { playTrackFromFolder } from '../services/queue-manager';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackList'>;

export default function TrackListScreen({ route }: Props) {
  const { folderName } = route.params;
  const tracks = getTracks(folderName);
  const activeTrack = useActiveTrack();

  const handleTrackPress = (index: number) => {
    playTrackFromFolder(folderName, index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.path}
        renderItem={({ item, index }) => {
          const isActive = activeTrack?.id === item.path;
          return (
            <TouchableOpacity style={styles.row} onPress={() => handleTrackPress(index)}>
              <Text style={[styles.text, isActive && styles.activeText]}>
                {isActive ? `▶ ${item.filename}` : item.filename}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    paddingVertical: spacing.rowVertical,
    paddingHorizontal: spacing.rowHorizontal,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  text: {
    ...typography.trackName,
  },
  activeText: {
    color: colors.accent,
    fontWeight: '700',
  },
});
