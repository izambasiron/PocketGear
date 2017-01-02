/* @flow */

import Exponent from 'exponent';
import React, { PureComponent } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from './src/components/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusbar: {
    height: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: '#fff',
  },
});

type State = {
  bootstrapped: boolean;
}

export default class App extends PureComponent<void, *, State> {

  state: State = {
    bootstrapped: false,
  };

  componentWillMount() {
    this._bootstrap();
  }

  _bootstrap = async () => {
    await Exponent.Font.loadAsync({
      /* $FlowFixMe */
      Montserrat: require('./assets/fonts/Montserrat.otf'),
      /* $FlowFixMe */
      MontserratBold: require('./assets/fonts/MontserratBold.otf'),
      ...MaterialIcons.font,
    });

    global.requestAnimationFrame(() => {
      this.setState({ bootstrapped: true });
    });
  };

  render() {
    if (!this.state.bootstrapped) {
      return <Exponent.Components.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.statusbar} />
        <Home />
      </View>
    );
  }
}

Exponent.registerRootComponent(App);
