/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaView, StatusBar, View } from 'react-native';
import SvgIconAtom from './src/components/atoms/SvgIcon.atom';

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StatusBar barStyle={'dark-content'} />
      {/* ... */}
      <SvgIconAtom name={'HomeBlack'} size={30} />
      <View style={{ marginTop: 20 }}>
        <SvgIconAtom name={'MenuBlack'} fill={'red'} />
      </View>
      {/* ... */}
    </SafeAreaView>
  );
};

export default App;
