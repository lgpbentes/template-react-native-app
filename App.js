import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Moment from 'moment';

export default function App() {
  const [timeNow, setTimeNow] = React.useState('');

  React.useEffect(() => {
    setInterval(() => {
      setTimeNow(getTimeNow());
    }, 1000);
  }, [])

  const getTimeNow = () => {
    return Moment().format('hh:mm:ss');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.timeNow}>{timeNow}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeNow: {
    textShadowColor: '#0AAFE6',
    textShadowOffset: {
      width: 0,
      height: 0
    },
    textShadowRadius: 10,
    fontSize: 70,
    color: '#daf6ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
