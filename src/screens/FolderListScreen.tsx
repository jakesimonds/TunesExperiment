import { FlatList, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../styles/theme';
import { getFolders } from '../data/library';

type Props = NativeStackScreenProps<RootStackParamList, 'FolderList'>;

export default function FolderListScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={getFolders()}
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
