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
const date1 = moment().format('MMMM Do YYYY');
const minDate = new Date();
const maxDate = "2020-06-01";
let Persons = [{
    value: 'Employee',
}, {
    value: 'Client',
}, {
    value: 'Visitor',
},
{
    value: 'Contractor',
},
{
    value: 'Volunteer'
}
];
let data = [{
    value: 'Person1',
}, {
    value: 'Person2',
}, {
    value: 'Person3',
}];

let site = [{
    value: 'site1',
}, {
    value: 'site2',
}, {
    value: 'site3',
}];

let incident = [{
    value: 'Incident1',
}, {
    value: 'Incident2',
}, {
    value: 'Incident3',
}];

let activity = [{
    value: 'activity1',
}, {
    value: 'activity2',
}, {
    value: 'activity3',
}];

let machiene = [{
    value: 'machiene1',
}, {
    value: 'machiene2',
}, {
    value: 'machiene3',
}];
class Incident extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: false,
            contractor: false,
            volunteer: false,
            visitor: false,
            client: false,
            date: "",
            dob: null,
            dobRequired: false,
            dobLabel: 'Report date & time',
            date1: "",
            dob1: null,
            dobRequired1: false,
            dobLabel1: 'Due Date',
            modalVisible: false,
            appState: AppState.currentState,
            person: "",
            site: "",
            incident: "",
            activity: "",
            machiene: "",
            location: "",
            locationInfo: "",
            aid: '',
            medical: '',
            daid: '',
            personErr: false,
            siteErr: false,
            incidentErr: false,
            activityErr: false,
            machieneErr: false,
            locationErr: false,
            imagePath: '',
            firstAidBox: false,
            medicalBox: false,
            ambulanceBox: false,
            hospitalBox: false,
            body: false,
            incidentTypeModal: false,
            activityModal: false,
            injuryModal: false



        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
        if (Platform.OS === 'ios') {
            PushNotificationIOS.requestPermissions();
        }

    }


    openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false
        }).then(image => {
            console.log('image', image);
            this.setState({ 'imagePath': image })
        });
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            console.log(image);
        });
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState === 'background') {
            Platform.OS === 'android' ?
                PushNotification.localNotificationSchedule({
                    //... You can use all the options from localNotifications
                    message: "Please fill the form", // (required)
                    date: new Date(Date.now() + 30 * 1000)
                }) :
                console.log("ssdgsg")

            //   PushNotificationIOS.presentLocalNotification({
            //     alertBody: 'Please fill the form',

            //     applicationIconBadgeNumber: 1
            //   });
            console.log('App has come to the background!', nextAppState);
        }

    };

    onSubmit = () => {
        this.setState({ body: true })
        let { person, site, incident, machiene, location, locationInfo, aid, medical, daid, imagePath } = this.state
        if (person) {
            if (site) {
                if (incident) {
                    if (machiene) {
                        if (location) {
                            let body = {
                                'person': person,
                                'site': site,
                                'incident': incident,
                                'machiene': machiene,
                                'location': location,
                                'locationinfo': locationInfo,
                                'aid': aid,
                                'medical': medical,
                                'daid': daid,
                                'imagePath': imagePath
                            }
                            this.props.incidentForm(body)

                        }
                        else {
                            this.setState({ locationErr: true })
                        }
                    }
                } else {
                    this.setState({ incidentErr: true })
                }
            } else {
                this.setState({ siteErr: true })
            }
        } else {
            this.setState({ personErr: true })
        }
    }

    errorView = type => {
        return (
            <View style={{ paddingTop: 2 }}>
                <Text style={styles.errorTexts}>
                    {type === "person"
                        ? effectedPerson
                        : type === "site"
                            ? effectedSite
                            : type === "incident"
                                ? effectedIncident
                                : type === "machiene"
                                    ? effectedMachiene
                                    : ''}
                </Text>
            </View>
        );
    };

    choosePerson = type => {
        console.log("persdffesd", type)
        if (type === 'Employee' || type === 'Volunteer') {
            return (<Modal
                animationType="slide"
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => { }}
            >
                <View
                    style={styles.modalView}
                >
                    <View style={styles.modalPadding} />
                    <View style={styles.modalBody}>
                        <View style={styles.modalTitleView}>
                            <View style={styles.modalTitleSection}>
                                <Text style={styles.modalText}>{type === 'Employee' ? 'Add Employee' : 'Add Volunteer'}</Text>
                            </View>
                            <View style={styles.textPadding} />
                            <TouchableOpacity style={styles.closeIconView} onPress={() => this.setState({ modalVisible: false, abc: false })}>
                                <Image source={close} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalFormView}>
                            <TextInput label="Firstname" />
                            <TextInput label="Lastname" />
                            <Dropdown
                                label='Position'
                                data={machiene}
                                baseColor="#6A7A8C"
                                textColor="#6A7A8C"
                            />
                            <Dropdown
                                label='Site'
                                data={machiene}
                                baseColor="#6A7A8C"
                                textColor="#6A7A8C"
                            />
                            <DatePickerComponent
                                placeholder={
                                    this.state.dob1
                                        ? this.state.dob1
                                        : "Date of birth"
                                }
                                mode='datetime'
                                date={this.state.dob1}
                                minDate={minDate}
                                maxDate={maxDate}
                                style={styles.modalDatePickerView}
                                onDateChange={date =>
                                    this.setState({
                                        dob1: date,
                                        dobRequired1: false,
                                        dobLabel1: date
                                    })
                                }
                            />
                            <View style={styles.checkboxpadding} />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button text="Submit" color={["#50A3C8", "#0A6991"]} style={{ width: moderateScale(200) }} />
                                {/* <Button text="Cancel" style={{ backgroundColor: "#209e37" }} onPress={() => this.setState({ modalVisible: false })} /> */}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>)
        }
        if (type === 'Contractor') {
            return (<Modal
                animationType="slide"
                visible={this.state.modalVisible}
                transparent={true}
                onRequestClose={() => { }}
            >
                <View
                    style={styles.modalView}
                >
                    <View style={styles.contractModalPadding} />
                    <View style={styles.contractModalBody}>
                        <View style={styles.modalTitleView}>
                            <View style={styles.modalTitleSection}>
                                <Text style={styles.modalText}>Add Contractor</Text>
                            </View>
                            <View style={styles.textPadding} />
                            <TouchableOpacity style={styles.closeIconView} onPress={() => this.setState({ modalVisible: false, abc: false })}>
                                <Image source={close} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalFormView}>
                            <TextInput label="Contractor Name" />
                            <TextInput label="Company Name" />
                            <TextInput label="Company Email" />
                            <View style={styles.checkboxpadding} />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Button text="Submit" color={["#50A3C8", "#0A6991"]} style={{ width: moderateScale(200) }} />
                                {/* <Button text="Cancel" style={{ backgroundColor: "#209e37" }} onPress={() => this.setState({ modalVisible: false })} /> */}
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>)
        }


    }

    render() {
        const { show, date, mode, personErr, siteErr, machieneErr, incidentErr } = this.state;
        const minDate = new Date();
        const maxDate = "2020-06-01";

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
                            <Text style={styles.headerText}>Add incident</Text>
                            <Text style={styles.dateText}>{date1}</Text>
                        </View>
                    </View>

                </View>
                {!this.state.body ? <KeyboardAwareScrollView style={styles.formView} keyboardShouldPersistTaps="handled">
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
                        <View style={styles.checkboxSection}>
                            <View style={styles.checkboxView}>
                                <View style={styles.checkboxTextView}>
                                    <Text style={styles.checkboxText}>
                                        First aid provided?
                                </Text>
                                </View>
                                <View style={styles.checkboxpadding} />
                                <View style={styles.checkbox}>
                                    <CheckBoxes color="green" check={this.state.firstAidBox} text="yes" press={() => this.setState({ firstAidBox: !this.state.firstAidBox })} />
                                </View>
                            </View>
                            <View style={styles.checkboxView}>
                                <View style={styles.checkboxTextView}>
                                    <Text style={styles.checkboxText}>
                                        Medical?
                                </Text>
                                </View>
                                <View style={styles.checkboxpadding} />
                                <View style={styles.checkbox}>
                                    <CheckBoxes color="green" check={this.state.medicalBox} press={() => this.setState({ medicalBox: !this.state.medicalBox })} text="yes" />
                                </View>
                            </View>
                        </View>
                        <TextInput label="Location of incident" value={this.state.location} onChangeText={(val) => this.setState({ location: val })} />
                        <TextInput label="First aid by" value={this.state.aid} onChangeText={(val) => this.setState({ aid: val })} />
                        <TextInput label="Medical aid by" value={this.state.medical} onChangeText={(val) => this.setState({ medical: val })} />
                        <View style={styles.checkboxSection}>
                            <View style={styles.checkboxView}>
                                <View style={styles.checkboxTextView}>
                                    <Text style={styles.checkboxText}>
                                        Ambulance?
                                </Text>
                                </View>
                                <View style={styles.checkboxpadding} />
                                <View style={styles.checkbox}>
                                    <CheckBoxes color="green" check={this.state.ambulanceBox} press={() => this.setState({ ambulanceBox: !this.state.ambulanceBox })} text="yes" />
                                </View>
                            </View>
                            <View style={styles.checkboxView}>
                                <View style={styles.checkboxTextView}>
                                    <Text style={styles.checkboxText}>
                                        Hospital?
                                </Text>
                                </View>
                                <View style={styles.checkboxpadding} />
                                <View style={styles.checkbox}>
                                    <CheckBoxes color="green" check={this.state.hospitalBox} press={() => this.setState({ hospitalBox: !this.state.hospitalBox })} text="yes" />
                                </View>
                            </View>
                        </View>
                        <TextInput label="Location information" multiline={true} value={this.state.locationInfo} numberOfLines={4} onChangeText={(val) => this.setState({ locationInfo: val })} />
                        <TextInput label="Describe first aid" multiline={true} value={this.state.daid} numberOfLines={4} onChangeText={(val) => this.setState({ daid: val })} />
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
                </KeyboardAwareScrollView> :
                    <KeyboardAwareScrollView style={{ height: height, backgroundColor: "#fff" }}>
                        <View style={styles.human_bodyView}>
                            <Image source={human_body} />
                        </View>
                        {/* <View style={{height:height*0.1,borderBottomWidth:0.5,marginHorizontal:moderateScale(10),borderBottomColor:'#6A7A8C'}}>
                        </View> */}

                        <View style={styles.injuryDropDown}>
                            <View style={{ flex: 0.8 }}>
                                <Dropdown
                                    label='Injuary Mechanism'
                                    data={incident}
                                    baseColor="#6A7A8C"
                                    textColor="#6A7A8C"
                                />
                            </View>
                            <TouchableOpacity style={styles.injuryIconView} onPress={() => this.setState({ injuryModal: true })}>
                                <Image source={add} />
                            </TouchableOpacity>
                            <View style={styles.injuryIconView}>
                                <Image source={delet} />
                            </View>
                        </View>
                        <View style={styles.breakDownAgency}>
                            <View style={{ flex: 0.8 }}>
                                <Dropdown
                                    label='Breakdown agency'
                                    data={incident}
                                    baseColor="#6A7A8C"
                                    textColor="#6A7A8C"
                                />
                            </View>
                            <View style={styles.injuryIconView}>
                                <Image source={add} />
                            </View>
                            <View style={styles.injuryIconView}>
                                <Image source={delet} />
                            </View>
                        </View>
                        <View style={{ height: height * 0.05 }}></View>
                        <View style={{ height: height * 0.1 }}>
                            <Button text="Submit" style={{ width: '50%' }} color={["#50A3C8", "#0A6991"]} onPress={() => this.setState({ body: false })} />

                        </View>
                        <View style={{ height: height * 0.1 }}>
                            <Button text="cancel" style={{ width: '50%' }} color={['#8A8A8A', '#8A8A8A']} onPress={() => this.setState({ body: false })} />

                        </View>
                    </KeyboardAwareScrollView>
                }
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

                {this.choosePerson(this.state.person)}

                {/* Add incident type model */}
                <Modal
                    animationType="slide"
                    visible={this.state.incidentTypeModal}
                    transparent={true}
                    onRequestClose={() => { }}
                >
                    <View
                        style={styles.modalView}
                    >
                        <View style={{ flex: 0.6 }} />
                        <View style={{ flex: 0.4, backgroundColor: '#fff', borderRadius: moderateScale(20) }}>
                            <View style={{ flex: 0.3, borderBottomWidth: 1, borderBottomColor: "#6A7A8C", marginTop: moderateScale(20), marginHorizontal: moderateScale(20), flexDirection: 'row' }}>
                                <View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#6A7A8C", fontSize: RFValue(21) }}>Add Incident Type</Text>
                                </View>
                                <View style={{ flex: 0.3 }} />
                                <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ incidentTypeModal: false })}>
                                    <Image source={close} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(30) }}>
                                <TextInput label="Incident Type" />
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={{ flex: 0.2 }}>
                                <Button text="Submit" color={["#50A3C8", "#0A6991"]} style={{ width: moderateScale(150) }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Add Activity Modal */}
                <Modal
                    animationType="slide"
                    visible={this.state.activityModal}
                    transparent={true}
                    onRequestClose={() => { }}
                >
                    <View
                        style={styles.modalView}
                    >
                        <View style={styles.modalPadding} />
                        <View style={styles.modalBody}>
                            <View style={styles.modalTitleView}>
                                <View style={styles.modalTitleSection}>
                                    <Text style={styles.modalText}>Add Activity</Text>
                                </View>
                                <View style={styles.textPadding} />
                                <TouchableOpacity style={styles.closeIconView} onPress={() => this.setState({ activityModal: false })}>
                                    <Image source={close} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalFormView}>
                                <TextInput label="Activity" />
                                <Dropdown
                                    label='Site'
                                    data={site}
                                    baseColor="#6A7A8C"
                                    textColor="#6A7A8C"
                                />
                                <DatePickerComponent
                                    placeholder={
                                        this.state.dob1
                                            ? this.state.dob1
                                            : "Review Date"
                                    }
                                    mode='datetime'
                                    date={this.state.dob1}
                                    minDate={minDate}
                                    maxDate={maxDate}
                                    style={styles.modalDatePickerView}
                                    onDateChange={date =>

                                        this.setState({
                                            dob1: date,
                                            dobRequired1: false,
                                            dobLabel1: date
                                        })
                                    }
                                />
                                <TextInput label="Qualification" />
                                <TextInput label="Description" />
                                <View style={styles.checkboxpadding} />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Button text="Submit" color={["#50A3C8", "#0A6991"]} style={{ width: moderateScale(200) }} />
                                    {/* <Button text="Cancel" style={{ backgroundColor: "#209e37" }} onPress={() => this.setState({ modalVisible: false })} /> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Injury modal */}
                <Modal
                    animationType="slide"
                    visible={this.state.injuryModal}
                    transparent={true}
                    onRequestClose={() => { }}
                >
                    <View
                        style={styles.modalView}
                    >
                        <View style={{ flex: 0.5 }} />
                        <View style={{ flex: 0.5, backgroundColor: '#fff', borderRadius: moderateScale(20) }}>
                            <View style={{ flex: 0.3, borderBottomWidth: 1, borderBottomColor: "#6A7A8C", marginTop: moderateScale(20), marginHorizontal: moderateScale(20), flexDirection: 'row' }}>
                                <View style={{ flex: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: "#6A7A8C", fontSize: RFValue(21) }}>Add New Mechanism Of Injury </Text>
                                </View>
                                <View style={{ flex: 0.2 }} />
                                <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }} onPress={() => this.setState({ injuryModal: false })}>
                                    <Image source={close} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center', marginHorizontal: moderateScale(30) }}>
                                <TextInput label="Name" />
                                <TextInput label="Code" />
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={{ flex: 0.2 }}>
                                <Button text="Submit" color={["#50A3C8", "#0A6991"]} style={{ width: moderateScale(150) }} />
                            </View>
                        </View>
                    </View>
                </Modal>
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
    incidentForm: data => dispatch(AppActions.incident(data))
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
)(Incident)