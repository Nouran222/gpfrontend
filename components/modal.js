import React from 'react';
// import { BlurView } from "@react-native-community/blur";
// import { Platform } from 'react-native';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
  Text,
} from 'react-native';
import Star from './Star';
// import Stars from './Stars';



const { width, height } = Dimensions.get('screen');

const MODAL_HEIGHT = height * 0.30;

export const RatingBottomModal = ({visible, onClose,onRatingChanged,starSize,maxStars = 5,starRating = 0,}) => {
  if (!visible) {
    return null;
  }

  const pan = React.useRef(new Animated.ValueXY({ x: 0, y: height })).current;
  const [offset, setOffset] = React.useState(starRating || 0);
  const animatedWidth = React.useRef(0);

  const openAnim = () => {
    Animated.spring(pan.y, {
      toValue: height - MODAL_HEIGHT,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeAnim = () => {
    Animated.spring(pan.y, {
      toValue: height,
      useNativeDriver: true,
    }).start();

    // you may invoke it in the animation end callback, but
    // that may feel slower
    onClose();
  };

  React.useEffect(() => {
    onRatingChanged(offset);
  }, [offset]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    openAnim();
  }, [visible]);

  const changeOffset = React.useCallback((e) => {
    const { nativeEvent } = e;

    const distance = (width - animatedWidth.current) / 2;
    const starSize = animatedWidth.current / (maxStars || 5);

    let v = Number((nativeEvent.pageX - distance) / starSize);

    const rest = v - Math.trunc(v);

    if (rest <= 0.5) {
      v = Math.trunc(v);
    } else {
      v = Math.trunc(v) + 0.5;
    }

    setOffset(v);
  }, []);

  const changeModalPosition = React.useCallback(
    (gs) => {
      const value = height - MODAL_HEIGHT + gs.dy;

      // prevent dragging too high or too low
      if (value >= height || value < height - MODAL_HEIGHT) {
        return;
      }

      pan.y.setValue(value);
    },
    [],
  );

  const modalResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e) => {
        // check if touch is in the modal area
        if (e.nativeEvent.pageY > height - MODAL_HEIGHT) {
          return true;
        }

        closeAnim();

        return false;
      },
      onPanResponderGrant: () => {
        // TODO: show some visual feedback here
      },
      onPanResponderMove: (_, gs) => {
        changeModalPosition(gs);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < MODAL_HEIGHT / 2) {
          openAnim();
        } else {
          closeAnim();
        }
      },
    }),
  ).current;

  const starPanResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gs) => {
        changeOffset(e);
        return true;
      },
      onPanResponderMove: (e, gs) => {
        // user swiped down on a star
        if (gs.dy > 50) {
          changeModalPosition(gs);
          return;
        }

        changeOffset(e);
      },
      onPanResponderRelease: (_, { dy }) => {
        if (dy < MODAL_HEIGHT / 2) {
          openAnim();
        } else {
          closeAnim();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...modalResponder.panHandlers}
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height,
          backgroundColor: 'rgba(0,0,0,.1)',
        },
      ]}>
        {/* {Platform.OS === 'android'?(<BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />):<View><Text>MSH Gaya</Text></View> } */}
      {/* <BlurView
        style={StyleSheet.absoluteFillObject}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      /> */}
      <View>
        <Animated.View
          style={{
            opacity: pan.y.interpolate({
              inputRange: [height - MODAL_HEIGHT, height],
              outputRange: [1, 0.5],
            }),
            transform: [
              {
                translateY: pan.y,
              },
            ],
          }}>
          <View
            style={{
              width: '100%',
              height: MODAL_HEIGHT,
              backgroundColor: '#fff',
              shadowColor: '#ccc',
              shadowOffset: { height: -1, width: 0 },
              shadowRadius: 15,
              shadowOpacity: 0.1,
            }}>
            <View
              style={{
                flex: 1,
                paddingTop: 24,
                alignItems: 'center',
                justifyContent: 'flex-start'
              }}>
              <Text
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                rate Provider 1
              </Text>

              <View
                style={{
                  marginTop: 16,
                  flexDirection: 'row',
                }}>
                <Animated.View
                  onLayout={(e) => {
                    animatedWidth.current = e.nativeEvent.layout.width;
                  }}
                  style={{ flexDirection: 'row' }}
                  {...starPanResponder.panHandlers}>
                  {Array.from({ length: maxStars || 5 }).map((_, i) => {
                    return (
                      <Star
                        key={i}
                        size={starSize}
                        distance={8}
                        offset={offset - i}
                      />
                    );
                  })}
                </Animated.View>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export default RatingBottomModal;