import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../styles/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'FolderList'>;

const FOLDERS = ['Test Album 1', 'Test Album 2'];

export default function FolderListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={FOLDERS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('TrackList', { folderName: item })}
          >
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
    ...typography.folderName,
  },
});
