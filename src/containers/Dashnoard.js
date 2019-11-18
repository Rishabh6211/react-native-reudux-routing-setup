import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,

  ScrollView,
  Platform
} from "react-native";
import { connect, bindActionCreators } from "react-redux";
const { height, width } = Dimensions.get("window");
import { ScaledSheet,moderateScale,verticalScale } from 'react-native-size-matters'
import {RFValue } from 'react-native-responsive-fontsize'
import {icon,sidebar,shield,shoppinglist,hazard,safety,wrench, incidenticon, calendar, policy,sync,rightArrow} from '../assets/'
import {Actions} from 'react-native-router-flux'
import moment from 'moment'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {Header} from '../components/'
const date = moment().format('MMMM Do YYYY');
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connect: false,
      
    };
 
  }

  componentDidMount(){
   
   
    
   
  }



  render() {
    let menu = [
      { id: 1, name: 'Add Incident', Icon:incidenticon, action:()=>{Actions.incident()} },
      { id: 2, name: 'Add Hazard',Icon:hazard, action:()=>{Actions.hazard()} },
      { id: 3, name: 'Do Checklist',Icon:shoppinglist , action:()=>{alert("In progress")}},
      { id: 4, name: 'Do Meeting',Icon:calendar, action:()=>{alert("In progress")} },
      { id: 5, name: 'View procedures',Icon:wrench, action:()=>{alert("In progress")} },
      { id: 6, name: 'View SDS',Icon:shield, action:()=>{alert("In progress")} },
      { id: 7, name: 'View Policies',Icon:policy, action:()=>{alert("In progress")} },
      { id: 8, name: 'View SMWS',Icon:safety, action:()=>{alert("In progress")} }
    ]

   
    return (
      <View style={styles.container}>
         <View style={{flex:0.06,backgroundColor:'#fff'}}/>
        <View style={styles.body}>
         <View style={{flex:0.3}}>
         <Header text="Sync" source={sync}/>
          </View>

          <View style={{flex:0.6,flexDirection:'row'}}>
            <View style={{flex:0.5}}/>
            <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.headerText}>Last Sync</Text>
              <Text style={styles.dateText}>{date}</Text>
              </View>
          </View>
        </View>
        <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
        
          <FlatList
            showsVerticalScrollIndicator={false}
            data={menu}
            renderItem={({ item }) => 
            <TouchableOpacity style={styles.menuList} onPress={item.action}>
              <View style={styles.iconView}><Image source={item.Icon} style={{alignSelf:'center'}} resizeMode='contain'/></View>
              <View style={styles.textView}><Text style={styles.text}>{item.name}</Text></View>
              
              <View style={styles.arrowView}>
                <Image source={rightArrow}/>
              </View>
            </TouchableOpacity>
          }
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log("this.state", state)
  return {

  };
};
const mapDispatchToProps = dispatch => ({

});

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
  body: {
    flex: 0.3,
    // marginHorizontal:moderateScale(20),
    // backgroundColor: "#fff"
  },
  menu: {
   flex:0.7,
  //  marginHorizontal:moderateScale(40),
    backgroundColor: '#fff'
  },
  menuList:{
   height:moderateScale(70),
  //  marginBottom:moderateScale(20),
    borderBottomWidth:0.2,
    borderBottomColor:"#75787d",
    borderColor:'#0080ff',
    justifyContent: 'center',
    alignItems: 'center' ,
    flexDirection:'row'
    // backgroundColor: 'green'
    
  },
  text:{
    color:"#8A8A8A",
    fontSize:RFValue(18),
    fontWeight:'500'
  },
  headerText:{
    color:"#8A8A8A",
    fontSize:RFValue(18),
    fontWeight:'bold'
  },
  dateText:{
    color:"#808080",
    fontSize:RFValue(16),
    fontWeight:'500'
  },
 
  textView:{
    flex:0.5,
    marginHorizontal:moderateScale(30)
    // alignSelf:'center'
    // justifyContent:'center',
    // alignItems:'center'
  },
  iconView:{
    flex:0.2,
    
  },
  arrowView:{
    flex:0.2,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }


});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
