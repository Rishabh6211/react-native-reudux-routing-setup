import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Text,ActivityIndicator } from "react-native";

// import {Fonts} from "../constants";
import {
  verticalScale,
  moderateScale,
  scale
} from "react-native-size-matters";
export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color = [],loader,fontSize } = this.props;
    const colors = ["#50A3C8", "#0A6991"];

    return (
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={this.props.onPress}
      >
      
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[...color]}
          style={[
            {
              width: "90%",
              height: verticalScale(50),
              borderRadius: moderateScale(40),
              justifyContent: "center",
              alignItems: "center"
            },
            this.props.style
          ]}
        >
         <Text style={{ fontSize:moderateScale(18), color: "#FFFFFF" }}>
            {this.props.text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
