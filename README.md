## ※ ReactNative에서 SVG 파일을 아이콘으로 사용할 수 있도록 설정 및 구현된 컴포넌트 프로젝트

<br />

### ▪ Setting Guide

**[ install ]**

&nbsp;- [**react-native-svg**](https://github.com/software-mansion/react-native-svg)

```
npm install react-native-svg
```

<br>

&nbsp;- [**react-native-svg-transformer**](https://github.com/kristerkari/react-native-svg-transformer)

```
npm i react-native-svg-transformer
```

🏷️ **react-native-svg-transformer**  
**react-native-svg** 는 `<Svg />`, `<G />`, `<Path />` 등 거의 모든 SVG 관련 컴포넌트를 제공하지만, SVG 파일 자체를 `import` 할 수 있게 해주지는 않는다. SVG 파일을 import 해서 사용하려면 **react-native-svg-transformer** 라이브러리도 필요하다. 이 라이브러리는 **react-native-svg** 라이브러리를 사용해 SVG 파일을 읽어들여 React 컴포넌트로 사용할 수 있게 해준다.`

<br>

**※ [ `metro.config.js` ]**

```jsx
const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
```

<br>
<br>

**※ [ `declarations.d.ts` ] - (존재하지 않는 경우 프로젝트의 루트 폴더에 파일 생성)**

```tsx
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
```

<br>
<br>

**※ [ `.svgrrc` ] - (존재하지 않는 경우 프로젝트의 루트 폴더에 파일 생성)**

- SVG 이미지의 채우기 색상 변경

```tsx
{
  "replaceAttrValues": {
    "#000": "{props.fill}"
  }
}
```

<br>

---

<br>

**※ [ `index.ts` ] - (SVG 파일들 **re-export**)**
&nbsp;1.

- 모든 SVG 파일은 인덱스 파일을 따로 만들어 한 곳에서 관리하도록 하자.

```tsx
export { default as HomeBlack } from './icons/home_black.svg';
export { default as MenuBlack } from './icons/menu_black.svg';
```

<br>

**[ Usage ]**

&nbsp;- 하나의 파일에 묶이게 된 SVG 파일들을 읽어와 사용하는 컴포넌트 생성

```tsx
// src/components/SvgIcon.tsx
import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as Icons from '../res';

type IconProps = SvgProps & {
  // res 에서 re-export 되는 SVG 파일들의 이름을 name 으로 받을 수 있다.
  name: keyof typeof Icons;
  size?: number;
};
function Icon({
  name,
  fill = 'black',
  width: _width,
  height: _height,
  size,
  ...props
}: IconProps) {
  const Comp = Icons[name];
  // `width`, `height` 를 따로 지정할 수 있지만
  // 아이콘은 보통 가로 세로 값이 같은 정사각형 형식이기 때문에
  // 여기서는 `size` 를 사용해 너비와 높이를 같이 지정할 수 있게 해주었다.
  const width = _width ?? size;
  const height = _height ?? size;
  const sizeProps = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <Comp
      {...props}
      // 1.2.3. `.svgrrc` 의 설정 덕분에 `fill` prop 을 이렇게 사용할 수 있다.
      fill={fill}
      {...sizeProps}
    />
  );
}

export default Icon;
```

<br>

&nbsp;- 원하는 위치에서 **SvgIconAtom** 컴포넌트를 사용하여 선언해 둔 아이콘을 읽어와 바로 사용할 수 있다.

```tsx
import { SafeAreaView } from 'react-native';
import SvgIconAtom from './src/components/atoms/SvgIcon.atom';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 24 }}>
      {/* ... */}
      <SvgIconAtom name={'HomeBlack'} />
      <SvgIconAtom name={'MenuBlack'} fill={'orange'} />
      {/* ... */}
    </SafeAreaView>
  );
};

export default App;
```

---

<br>

**[예제 실행 화면]**  
<img src="src/assets/imgs/ScreenShot.jpeg" width="20%" height="auto" alt="RubberDuck" />
