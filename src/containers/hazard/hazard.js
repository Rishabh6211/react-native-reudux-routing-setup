import React, { Component } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    Image,
    Modal,
    AppState,
    Platform,
    Alert
} from "react-native";
import { ActionSheetCustom as ActionSheet } from "react-native-custom-actionsheet";
import { TextInput, Button, CheckBoxes, DatePickerComponent, Header } from '../../components/'
import { RFValue } from "react-native-responsive-fontsize"
import { verticalScale, moderateScale, ScaledSheet, scale } from 'react-native-size-matters'
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { height, width } = Dimensions.get("window");
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dropdown } from 'react-native-material-dropdown';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from 'react-native-push-notification'
import * as AppActions from '../../actions/'
import ImagePicker from 'react-native-image-crop-picker';
import { effectedPerson, effectedSite, effectedIncident, effectedMachiene } from '../../constant/'
import RNFetchBlob from 'rn-fetch-blob'
import moment from 'moment'
import { close, add, delet, upload, human_body } from '../../assets/'

class Hazard extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={styles.container} keyboardShouldPersistTaps="handled" >
                <View style={styles.paddingView} />
                <View style={styles.body}>
                    <View style={styles.navbarView}>
                        <Header />
                    </View>

                    <View style={styles.headerView}>
                        <View style={styles.headerViewPadding} />
                        <View style={styles.headerTextView}>
                            <Text style={styles.headerText}>Add Hazard</Text>
                            <Text style={styles.dateText}>{date1}</Text>
                        </View>
                    </View>

                </View>
                 <KeyboardAwareScrollView style={styles.formView} keyboardShouldPersistTaps="handled">
                    <View style={styles.formMargin}>
                        <View style={styles.choosePersonTextInput}>
                            <View style={styles.choosePersonTextInputView}>
                                <Dropdown
                                    label='Choose Person'
                                    data={Persons}
                                    baseColor="#6A7A8C"
                                    textColor="#6A7A8C"
                                    onChangeText={(val) => this.setState({ person: val, personErr: false })}
                                />
                            </View>
                            <TouchableOpacity style={styles.addPersonView} onPress={() => this.state.person ? this.setState({ modalVisible: true }) : Alert.alert('Please select person')}>
                                <Image source={add} />
                            </TouchableOpacity>

                        </View>
                        <Dropdown
                            label='Affected Person'
                            data={data}
                            baseColor="#6A7A8C"
                            textColor="#6A7A8C"
                            onChangeText={(val) => this.setState({ person: val, personErr: false })}
                        />
                        {personErr ? this.errorView('person') : null}
                        <Dropdown
                            label='Site'
                            data={site}
                            baseColor="#6A7A8C"
                            textColor="#6A7A8C"
                            onChangeText={(val) => this.setState({ site: val, siteErr: false })}
                        />
                        {siteErr ? this.errorView('site') : null}
                        <View style={styles.incidentTypeview}>
                            <View style={styles.incidentType}>
                                <Dropdown
                                    label='Incident Type'
                                    data={incident}
                                    baseColor="#6A7A8C"
                                    textColor="#6A7A8C"
                                    onChangeText={(val) => this.setState({ incident: val, incidentErr: false })}
                                />
                            </View>
                            <TouchableOpacity style={styles.incidentTypeAction} onPress={() => this.setState({ incidentTypeModal: true })}>
                                <Image source={add} />
                            </TouchableOpacity>
                            <View style={styles.incidentTypeAction}>
                                <Image source={delet} />
                            </View>
                        </View>
                        {incidentErr ? this.errorView('incident') : null}
                        <View style={styles.incidentTypeview}>
                            <View style={styles.choosePersonTextInputView}>
                                <Dropdown
                                    label='Activity'
                                    data={activity}
                                    baseColor="#6A7A8C"
                                    textColor="#6A7A8C"
                                    onChangeText={(val) => this.setState({ activity: val })}
                                />
                            </View>
                            <TouchableOpacity style={styles.addPersonView} onPress={() => this.setState({ activityModal: true })}>
                                <Image source={add} />
                            </TouchableOpacity>
                        </View>
                        <Dropdown
                            label='Machiene'
                            data={machiene}
                            baseColor="#6A7A8C"
                            textColor="#6A7A8C"
                            onChangeText={(val) => this.setState({ machiene: val, machieneErr: false })}
                        />
                        {machieneErr ? this.errorView('machiene') : null}
                   
                        <TextInput label="Location of incident" value={this.state.location} onChangeText={(val) => this.setState({ location: val })} />
                        <TextInput label="First aid by" value={this.state.aid} onChangeText={(val) => this.setState({ aid: val })} />
                        <TextInput label="Medical aid by" value={this.state.medical} onChangeText={(val) => this.setState({ medical: val })} />
                     
                       
                        <Dropdown
                            label='IIF Responsible person'
                            data={machiene}
                            baseColor="#6A7A8C"
                            textColor="#6A7A8C"
                        />
                        <View style={styles.datePickerView}>

                            {/* <Text style={{fontSize:RFValue(16),color:"#6A7A8C" ,marginTop:moderateScale(20)}}>Report date and time</Text> */}
                            <DatePickerComponent
                                placeholder={
                                    this.state.dob
                                        ? this.state.dob
                                        : "Report date & time"
                                }
                                mode='datetime'
                                date={this.state.dob}
                                minDate={minDate}
                                maxDate={maxDate}
                                style={{ width: width * 0.9 }}
                                onDateChange={date =>

                                    this.setState({
                                        dob: date,
                                        dobRequired: false,
                                        dobLabel: date
                                    })
                                }
                            />

                        </View>
                        <View style={styles.datePickerView}>
                            <DatePickerComponent
                                placeholder={
                                    this.state.dob1
                                        ? this.state.dob1
                                        : "Due Date"
                                }
                                mode='datetime'
                                date={this.state.dob1}
                                minDate={minDate}
                                maxDate={maxDate}
                                style={{ width: width * 0.9 }}
                                onDateChange={date =>

                                    this.setState({
                                        dob1: date,
                                        dobRequired1: false,
                                        dobLabel1: date
                                    })
                                }
                            />
                        </View>
                        <View style={styles.datePickerPadding} />
                        <TouchableOpacity style={styles.uploadIcon} onPress={() => this.actionSheet.show()}>
                            <Image source={upload} />
                        </TouchableOpacity>
                        <View style={styles.submitButton} />
                        <Button text="Save & Proceed" color={["#50A3C8", "#0A6991"]} onPress={() => this.onSubmit()} />
                        <View style={styles.cancelButton} />
                        <Button text="Cancel" onPress={() => Actions.pop()} color={['#8A8A8A', '#8A8A8A']} />
                        <View style={styles.buttonPadding} />
                    </View>
                </KeyboardAwareScrollView> 
                <ActionSheet
                    ref={ref => (this.actionSheet = ref)}
                    title={"Choose Image From"}
                    options={[
                        "Cancel",
                        {
                            component: (
                                <TouchableOpacity
                                    onPress={() => {

                                        this.openCamera();
                                    }}

                                >
                                    <Text >
                                        {"Camera"}
                                    </Text>
                                </TouchableOpacity>
                            ),
                            height: moderateScale(50)
                        },
                        {
                            component: (
                                <TouchableOpacity
                                    onPress={() => {

                                        this.openGallery()
                                    }}
                                    style={styles.actionWrapper}
                                >
                                    <Text style={styles.actionText}>
                                        {"Gallery"}
                                    </Text>
                                </TouchableOpacity>
                            ),
                            height: moderateScale(50)
                        }
                    ]}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={4}
                />

 

                          
            </View>
        )
    }

}

const mapStateToProps = state => {
    console.log('state---', state)
    return {

    };
};
const mapDispatchToProps = dispatch => ({
  
});

const styles = ScaledSheet.create({
    container: {
        height: height,
        backgroundColor: "#FBFBFB"
    },
    body: {
        height: height * 0.22,

    },
    errorTexts: {
        color: "#cc0000",
        fontSize: moderateScale(13),

    },
    checkboxView: {
        flex: 0.5,
        marginVertical: verticalScale(17),
        flexDirection: 'row'
    },
    checkboxTextView: {
        flex: 0.5
    },
    checkboxText: {
        color: '#6A7A8C'
    },
    checkbox: {
        flex: 0.3
    },
    headerText: {
        color: "#8A8A8A",
        fontSize: RFValue(18),
        fontWeight: 'bold'
    },
    dateText: {
        color: "#8A8A8A",
        fontSize: RFValue(14),
        // fontWeight:'bold'
    },
    paddingView: {
        height: height * 0.05,
        backgroundColor: '#fff'
    },
    navbarView: {
        flex: 0.3
    },
    headerView: {
        flex: 0.5,
        flexDirection: 'row'
    },
    headerViewPadding: {
        flex: 0.5
    },
    headerTextView: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formView: {
        height: height * 2,
        backgroundColor: "#fff"
    },
    formMargin: {
        marginHorizontal: moderateScale(15)
    },
    choosePersonTextInput: {
        flexDirection: 'row'
    },
    choosePersonTextInputView: {
        flex: 0.8
    },
    addPersonView: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incidentTypeview: {
        flexDirection: 'row'
    },
    incidentType: {
        flex: 0.7
    },
    incidentTypeAction: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkboxSection: {
        height: height * 0.15
    },
    checkboxpadding: {
        flex: 0.2
    },
    datePickerView: {

        height: height * 0.08,
        borderBottomWidth: 0.5,
        flexDirection: 'row'
    },
    datePickerPadding: {
        height: height * 0.04
    },
    uploadIcon: {
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitButton: {
        height: height * 0.06
    },
    cancelButton: {
        height: height * 0.03
    },
    buttonPadding: {
        height: height * 0.2
    },
    modalView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    modalPadding: {
        flex: 0.2
    },
    modalBody: {
        flex: 0.8,
        backgroundColor: '#fff',
        borderRadius: moderateScale(20)
    },
    modalTitleView: {
        flex: 0.1,
        borderBottomWidth: 1,
        borderBottomColor: "#6A7A8C",
        marginTop: moderateScale(20),
        marginHorizontal: moderateScale(20),
        flexDirection: 'row'
    },
    modalTitleSection: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        color: "#6A7A8C",
        fontSize: RFValue(21)
    },
    textPadding: {
        flex: 0.5
    },
    closeIconView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalFormView: {
        flex: 0.9,
        marginHorizontal: moderateScale(20)
    },
    modalDatePickerView: {
        width: width * 0.9,
        borderBottomWidth: 0.5,
        height: height * 0.07,
        borderBottomColor: "#6A7A8C"
    },
    human_bodyView: {
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    injuryDropDown: {
        height: height * 0.1,
        flexDirection: 'row',
        marginHorizontal: moderateScale(10)
    },
    injuryIconView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    breakDownAgency: {
        height: height * 0.1,
        flexDirection: 'row',
        marginHorizontal: moderateScale(10)
    },
    contractModalPadding: {
        flex: 0.4
    },
    contractModalBody: {
        flex: 0.6,
        backgroundColor: '#fff',
        borderRadius: moderateScale(20)
    },
    


});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hazard)