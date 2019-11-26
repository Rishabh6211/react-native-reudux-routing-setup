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
import { emptyEmail, emailReg, invalidEmail, emptyPassword, firstName, lastName } from '../../constant'
const { height } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            contact: '',
            firstNameError: '',
            lastNameError: '',
            passwordError: false,
            invalidEmailAddress: false,
            emailError: false,
        }
    }

    submit = () => {
        let {
            firstName,
            lastName,
            email,
            password,
            contact
        } = this.state;
        if(firstName){
            if(lastName){
                if (email) {
                    if (emailReg.test(email)) {
                        this.setState({ invalidEmail: false })
                        if (password) {
                            let body = {
                                firstName:this.state.firstName,
                                lastName:this.state.lastName,
                                password: this.state.password,
                                email: this.state.email,
                                device: {
                                    "type": Platform.OS
                                },
                            }
                            Actions.push('login')
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
            else {
                this.setState({ lastNameError: true });
            }
           
        }
        else {
            this.setState({ firstNameError: true });
        }
      
    }

    errorView = type => {
        return (
            <View style={{ paddingTop: 2, }}>
                <Text style={styles.errorTexts}>
                    {
                        type === "email" && this.state.invalidEmailAddress
                            ? invalidEmail
                            : type === "email"
                                ? emptyEmail
                                : type === "password"
                                    ? emptyPassword
                                    : type === "firstName"
                                        ? firstName
                                        : type === "lastName"
                                            ? lastName
                                            : ''

                    }
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
                <View style={{ height: height * 0.1, marginHorizontal: moderateScale(20) }} >
                    <Text style={{ fontSize: 50, fontWeight: '700', marginVertical: moderateScale(25) }}>SignUp</Text>
                </View>

                <View style={{ height: height * 0.05 }} />
                <View style={styles.fieldView}>
                    <View style={styles.field}>
                        <TextInput
                            label="First Name"
                            value={this.state.firstName}
                            onChangeText={firstName => this.setState({ firstNameError: false, firstName })}
                        />
                        {this.state.firstNameError ? this.errorView("firstName") : null}
                    </View>
                    <View style={styles.field}>
                        <TextInput
                            label="Last Name"
                            value={this.state.lastName}
                            onChangeText={lastName => this.setState({ lastNameError: false, lastName })}
                        />
                        {this.state.lastNameError ? this.errorView("lastName") : null}
                    </View>
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
                            onChangeText={password => this.setState({ passwordError: false, password })}
                        />
                        {this.state.passwordError ? this.errorView("password") : null}
                    </View>
                    <View style={styles.field}>
                        <TextInput
                            label="Contact Number"
                            keyboardType={'numeric'}
                            value={this.state.contact}
                            onChangeText={contact => this.setState({ contact })}
                        />

                    </View>
                </View>
                <View style={styles.buttonView}>
                    <Button text="SignUp" style={{ width: moderateScale(260) }} color={["#50A3C8", "#0A6991"]} onPress={() => this.submit()} />
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
        height: height * 0.65,
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
)(Signup)