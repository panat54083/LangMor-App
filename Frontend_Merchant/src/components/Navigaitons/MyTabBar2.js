//ComponentsMyTabBar222
import { useEffect, useRef } from "react";
import { StyleSheet, Animated, View, TouchableOpacity } from "react-native";

function MyTabBar2({ state, descriptors, navigation, position }) {
    const AnimatedTouchable =
        Animated.createAnimatedComponent(TouchableOpacity);
    return (
        <View
            style={{
                flexDirection: "row",
                marginTop: 12,
            }}
        >
            {state.routes.map((route, index, { length }) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                const inputRange = state.routes.map((_, i) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
                });
                const bgColor = isFocused ? "#FF4200" : "#FFE8E0";
                const fontColor = isFocused ? "white" : "#FF4200";
                const bdLeftRadius = index === 0 ? 10 : 0;
                const bdRightRadius = index === length - 1 ? 15 : 0;

                return (
                    <AnimatedTouchable
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: bgColor,
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#FF7A00",
                            borderRightWidth: 0.5,
                            borderLeftWidth: 0.5,
                            borderRightColor: "white",
                            borderLeftColor: "white",
                        }}
                    >
                        <Animated.View
                            style={
                                {
                                    // opacity,
                                }
                            }
                        >
                            <Animated.Text
                                style={{
                                    color: fontColor,
                                    fontFamily: "Kanit-Medium",
                                    fontSize: 12,
                                }}
                            >
                                {label}
                            </Animated.Text>
                        </Animated.View>
                    </AnimatedTouchable>
                );
            })}
        </View>
    );
}

export default MyTabBar2;
