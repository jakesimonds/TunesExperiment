import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FolderListScreen from '../screens/FolderListScreen';
import TrackListScreen from '../screens/TrackListScreen';
import { colors } from '../styles/theme';

export type RootStackParamList = {
  FolderList: undefined;
  TrackList: { folderName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Stack.Screen
        name="FolderList"
        component={FolderListScreen}
        options={{ title: 'TunesExperiment' }}
      />
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={({ route }) => ({ title: route.params.folderName })}
      />
    </Stack.Navigator>
  );
}
