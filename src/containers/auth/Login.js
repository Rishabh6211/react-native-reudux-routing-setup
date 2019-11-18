import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    Image
} from "react-native";
import {mail,line,logo} from '../../assets/'
import {TextInput,Button} from '../../components/'
import {RFValue} from "react-native-responsive-fontsize"
import { verticalScale, moderateScale, ScaledSheet,scale } from 'react-native-size-matters'
import { connect, bindActionCreators } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    submit = () =>{
      Actions.push('drawer')
    }

    render() {
        return (
          <View style={{ flex: 1 }}>
           
            <KeyboardAwareScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
              <View style={{flex:0.2}}>

              </View>
              <View style={styles.emailImageView}>
               <Image source={logo}/>
              </View>
              
              <View style={styles.textView}/>
               
             
    
              <View
                style={styles.textInputView}
              >
                <TextInput
                  label="Enter Email"
                  value={this.state.email}
                  onChangeText={email => this.setState({  email })}
                />
              
                <TextInput
    
                  label="Enter Password"
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
    
               
              </View>
            
              <View style={styles.flexView} />
              <View style={styles.buttonView}>
                <Button text="Login" style={{ width: moderateScale(260) }} color={["#50A3C8", "#0A6991"]} onPress={()=>this.submit()}/>
              </View>
          
              <View style={styles.flexView} />
              <View style={styles.flexView} />
              <View style={{flex:0.1}}>
                <Text style={{alignSelf:'center'}}>
                  <Text style={{color:"#474747",fontSize:RFValue(14)}}>  Don't have an account?</Text>
                  <Text style={{color:"#4DA0C5",fontSize:RFValue(14)}}>  Contact Us</Text>
                </Text>
              </View>
            </KeyboardAwareScrollView>
          </View>
        );
      }

}

const mapStateToProps = state => {
console.log("--------->",state)
    return {

    };
};
const mapDispatchToProps = dispatch => ({

});

const styles = ScaledSheet.create({
    input: {
      width: scale(300),
      fontSize: RFValue(16),
      fontWeight: "500",
      height: '65@ms',
      backgroundColor: "#FFF",
      margin: 10,
      color: "white",
      padding: 8,
      borderRadius: moderateScale(30)
    },
    errorTexts: {
      color: "#cc0000",
      fontSize: moderateScale(13),
    //   fontFamily: Fonts.MontserratRegular
    },
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
    },
    backArrowView: {
      flex: 0.1,
      marginHorizontal: 20
    },
    topFlexView: {
      flex: 0.2
    },
    emailImageView: {
      flex: 0.2,
      marginHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
     
    },
    textView: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: moderateScale(38),
      flexDirection:'row'
    },
    textDesign: {
      fontSize: moderateScale(22),
      color: "#1D2226",
      alignSelf: "center",
    //   fontFamily: Fonts.MontserratRegular
    },
    lineView: {
      flex: 0.05,
      marginHorizontal: moderateScale(38)
    },
    textInputView: {
      backgroundColor: "white",
      justifyContent: "center",
      paddingHorizontal: moderateScale(38)
    },
    messageView: {
      flex: 0.15,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 0.2,
      marginHorizontal: moderateScale(40),
      borderColor: "#C6CFDF",
      elevation: 1,
      shadowColor: "#000000"
    },
    messageText: {
      fontSize: moderateScale(14),
      color: "#34A83F",
    //   fontFamily: Fonts.MontserratRegular
    },
    flexView: {
      flex: 0.1
    },
    forgotPasswordView: {
      fontSize: moderateScale(12),
      alignSelf: "flex-end",
      color: "#C6CFDF",
    //   fontFamily: Fonts.MontserratRegular,
      marginHorizontal: moderateScale(30)
    },
    buttonView: {
      flex: 0.15,
      justifyContent:'center',
      alignItems:'center'
    },
    signupTextView: {
      flex: 0.1,
      justifyContent: "center",
      alignItems: "center"
    },
    signupText: {
      fontSize: moderateScale(12),
      color: "#1D2226",
    //   fontFamily: Fonts.MontserratRegular,
    },
    signupText1: {
      fontSize: moderateScale(13),
      color: "#2A6CDF",
     fontWeight:'bold',
    //   fontFamily: Fonts.MontserratRegular,
    }
  });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)