import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
} from "react-native";
import StaticTabbar from "./IconTabBar";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width } = Dimensions.get("window");
const height = 64;
const barHeight = height - 10;

const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = "white";

const getPath = () => {
  const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: 0, y: 0 },
    { x: width, y: 0 },
  ]);
  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: width, y: 0 },
    { x: width + 5, y: 0 },
    { x: width + 10, y: 10 },
    { x: width + 15, y: barHeight },
    { x: width + tabWidth - 15, y: barHeight },
    { x: width + tabWidth - 10, y: 10 },
    { x: width + tabWidth - 5, y: 0 },
    { x: width + tabWidth, y: 0 },
  ]);
  const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: width + tabWidth, y: 0 },
    { x: width * 2, y: 0 },
    { x: width * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};
const d = getPath();

export default function TabBar() {
  const value = useRef(new Animated.Value(0)).current;

  return (
    <>
      <View width={width} height={height}>
        <AnimatedSvg
          width={width * 2}
          height={height}
          style={{
            transform: [
              {
                translateX: value.interpolate({
                  inputRange: [0, width],
                  outputRange: [-width, 0],
                }),
              },
            ],
          }}
        >
          <Path fill={backgroundColor} d={d} />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar tabs={tabs} value={value} />
        </View>
      </View>
      <SafeAreaView style={styles.container} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
