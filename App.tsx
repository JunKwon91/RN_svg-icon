/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import { SafeAreaView } from 'react-native';
import SvgIconAtom from './src/components/atoms/SvgIcon.atom';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 24, backgroundColor: 'white' }}>
      {/* ... */}
      <SvgIconAtom name={'HomeBlack'} />
      <SvgIconAtom name={'MenuBlack'} fill={'orange'} />
      {/* ... */}
    </SafeAreaView>
  );
};

export default App;
