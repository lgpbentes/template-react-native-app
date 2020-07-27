import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

const HomeRoute = () => <Text>Home</Text>;

const UserRoute = () => <Text>Acesso</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'recents', title: 'Recents', icon: 'history' },
    { key: 'user', title: 'Acesso', icon: 'lock' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    user: UserRoute,
    home: HomeRoute,
    recents: RecentsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;