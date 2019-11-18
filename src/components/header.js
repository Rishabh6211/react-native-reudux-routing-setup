import React, { Component } from "react";
import { View, Text,TouchableOpacity ,Image} from 'react-native'
import { verticalScale, moderateScale, scale } from "react-native-size-matters";
import { sidebar,icons } from '../assets/'
import {Actions} from 'react-native-router-flux'

export default class Header extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff',flexDirection: 'row', backgroundColor: '#fff'  }}>
              
                    <TouchableOpacity style={{ flex: 0.05, marginHorizontal: moderateScale(20) }} onPress={() => Actions.drawerOpen()}>
                        <Image source={sidebar} />
                    </TouchableOpacity>
                    <View style={{flex:0.1,justifyContent:'center',alignItems:'center',marginBottom:moderateScale(20)}}>
                        <Image source={icons} />
                    </View>
                    <View style={{ flex: 0.6 }} />
                    <View style={{ flex: 0.2 ,justifyContent:'center',alignItems:'center',marginHorizontal: moderateScale(5),marginBottom:moderateScale(20)}}>
                       <Image source={this.props.source}/>
                    </View>
                
            </View>
        )
    }

} 