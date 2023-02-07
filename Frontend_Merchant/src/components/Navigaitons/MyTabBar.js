//Components
import { useEffect, useRef } from "react";
import { StyleSheet, Animated, View, TouchableOpacity } from "react-native";

function MyTabBar({ state, descriptors, navigation, position }) {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    return (
        <View style={{ flexDirection: "row", margin: 12 }}>
            {state.routes.map((route, index) => {
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
                            borderBottomWidth: 2,
                            borderBottomColor: "#FF4200",
                        }}
                    >
                        <Animated.View style={{ 
                            // opacity,
                            }}>
                            <Animated.Text
                                style={{
                                    color: fontColor,
                                    fontFamily: "Kanit-Medium",
                                    fontSize: 16,
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

export default MyTabBar;
