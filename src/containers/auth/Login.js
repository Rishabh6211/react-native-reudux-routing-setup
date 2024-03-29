import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { logo } from '../../assets/'
import { TextInput, Button } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { moderateScale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {emptyEmail,emailReg,invalidEmail,emptyPassword} from '../../constant'
const { height} = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordError: false,
      invalidEmailAddress: false,
      emailError: false,
    }
  }

  submit = () => {
    let {
      email,
      password
    } = this.state;

    if (email) {
      if (emailReg.test(email)) {
        this.setState({ invalidEmail: false })
        if (password) {
          let body = {
            password: this.state.password,
            email: this.state.email,
            device: {
              "type": Platform.OS
            },            
          }
          Actions.push('drawer')
        }
        else {
          this.setState({ passwordError: true });
        }
      }
      else {
        this.setState({ emailError: true, invalidEmailAddress: true });
      }
    }
    else {
      this.setState({ emailError: true });
    }
  }

  errorView = type => {
    return (
      <View style={{ paddingTop: 2, }}>
        <Text style={styles.errorTexts}>
          {type === "email" && this.state.invalidEmailAddress ? invalidEmail : type === "email" ? emptyEmail : emptyPassword}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ height: height * 0.1 }} />
        <View style={styles.iconContainer}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image source={logo} />
          </View>
        </View>
        <View style={{ height: height * 0.05 }} />
        <View style={styles.fieldView}>
          <View style={styles.field}>
            <TextInput
              label="Enter Email"
              value={this.state.email}
              onChangeText={email => this.setState({ emailError: false, email })}
            />
            {this.state.emailError ? this.errorView("email") : null}
          </View>
          <View style={styles.field}>
            <TextInput
              label="Enter Password"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({ passwordError: false,password })}
            />
            {this.state.passwordError ? this.errorView("password") : null}
          </View>
        </View>
        <View style={styles.buttonView}>
          <Button text="Login" style={{ width: moderateScale(260) }} color={["#50A3C8", "#0A6991"]} onPress={() => this.submit()} />
        </View>
        <View style={styles.bottomTextContainer}>
          <Text style={{ alignSelf: 'center' }}>
            <Text style={{ color: "#474747", fontSize: RFValue(14) }}>  Don't have an account? </Text>
            <Text style={{ color: "#4DA0C5", fontSize: RFValue(14) }} onPress={()=>Actions.push('forgot')}>  SignUp </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};
const mapDispatchToProps = dispatch => ({

});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff"
  },
  bottomTextContainer: {
    height: height * 0.15
  },
  buttonView: {
    height: height * 0.10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    // flexDirection: "row"
  },
  fieldView: {
    height: height * 0.30,
    marginHorizontal: moderateScale(20)
  },
  field: {
    height: height * 0.12
  },
  errorTexts: {
    color: "#cc0000",
    fontSize: moderateScale(13)
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)