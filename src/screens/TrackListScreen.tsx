import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackList'>;

const TRACKS: Record<string, string[]> = {
  'Test Album 1': ['01 - Track One.mp3', '02 - Track Two.mp3', '03 - Track Three.mp3'],
  'Test Album 2': ['01 - Track One.mp3', '02 - Track Two.mp3'],
};

export default function TrackListScreen({ route }: Props) {
  const { folderName } = route.params;
  const tracks = TRACKS[folderName] ?? [];

  return (
    <FlatList
      data={tracks}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});
