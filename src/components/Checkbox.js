import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { verticalScale, moderateScale, scale } from "react-native-size-matters";
import CheckBox from 'react-native-check-box'
import { Actions } from 'react-native-router-flux'

export default class CheckBoxes extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <CheckBox
                    checkBoxColor={this.props.color}
                    isChecked={this.props.check}
                    rightText={this.props.text}
                    onClick={this.props.press}
                />
            </View>
        )
    }

} 