import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../styles/theme';
import { getTracks } from '../data/library';

type Props = NativeStackScreenProps<RootStackParamList, 'TrackList'>;

export default function TrackListScreen({ route }: Props) {
  const { folderName } = route.params;
  const tracks = getTracks(folderName);

  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Text style={styles.text}>{item.filename}</Text>
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
