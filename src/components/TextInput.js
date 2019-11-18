import React, { Component } from "react";
import FloatingLabel from "../helpers/react-native-floating-labels";
// import {Fonts} from "../constants";
import {StyleSheet} from "react-native"
import {
  moderateScale
} from "react-native-size-matters";

export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let {styleGlobal,inputStyle,labelInput,editable,placeholder = "", value = "",multiline,numberOfLines,
    onBlur = () => {},
    onChangeText = () => {},}=this.props;

    return (
      <FloatingLabel
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={this.props.secureTextEntry}
        labelStyle={styles.labelInput}
        inputStyle={[styles.inputStyle,inputStyle]}
        style={styles.styleGlobal}
        placeholder={placeholder}
        value={value}
        editable={editable}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onKeyPress={this.props.onKeyPress}
        keyboardType={this.props.keyboardType}
      >
        {this.props.label}
      </FloatingLabel>
    );
  }
}


const styles = StyleSheet.create({
  inputStyle : {
    fontSize: moderateScale(16),
    borderWidth: 0,
    color:"#6A7A8C",
    // fontFamily:Fonts.MontserratRegular,
   
  },
  styleGlobal: {
    width: "100%",
    borderBottomWidth: moderateScale(0.5),
    // marginVertical:moderateScale(10),
    borderBottomColor: "#707070",
    
  
 
  },
  labelInput:{
    fontSize: moderateScale(16),
    fontWeight:'500',
    borderWidth: 0,
    color:"#A0A0A0",
    // fontFamily:Fonts.MontserratRegular,
 
  },
});