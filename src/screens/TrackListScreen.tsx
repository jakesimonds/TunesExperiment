import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackList'>;

const TRACKS: Record<string, string[]> = {
  'Test Album 1': ['01 - Track One.mp3', '02 - Track Two.mp3', '03 - Track Three.mp3'],
  'Test Album 2': ['01 - Track One.mp3', '02 - Track Two.mp3'],
};

export default function TrackListScreen({ route }: Props) {
  const { folderName } = route.params;
  const tracks = TRACKS[folderName] ?? [];

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
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
});
