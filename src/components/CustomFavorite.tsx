import React, {useRef, useEffect} from 'react';
import {TouchableOpacity, Vibration, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

// Custom Imports
import {colors, images} from '../utils';

export interface AppProps {
  like: boolean;
  setLike: Function;
}

export default function CustomFavorite(props: AppProps) {
  const animation: any = useRef();
  const isFirstRun: any = useRef();

  const {like, setLike} = props;

  useEffect(() => {
    if (isFirstRun.current) {
      if (like) {
        animation.current.play(66, 66);
      } else {
        animation.current.play(19, 19);
      }
      isFirstRun.current = false;
    } else if (like) {
      animation.current.play(19, 50);
    } else {
      animation.current.play(0, 19);
    }
  }, [like]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={Styles.favView}
      onPress={e => {
        e.stopPropagation();
        setLike(!like);
        like ? null : Vibration.vibrate(200);
      }}>
      <LottieView
        ref={animation}
        source={images.favorite}
        style={Styles.fav}
        autoPlay={false}
        loop={false}
      />
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  favView: {
    borderRadius: 30,
    backgroundColor: colors.modalBg,
  },
  fav: {
    height: 60,
    width: 60,
  },
});
