import React, { Component } from "react";

import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard
} from "react-native";
import { connect, bindActionCreators } from "react-redux";
import { Actions } from "react-native-router-flux";


const { height, width } = Dimensions.get("window");
// const happpheLogo = require("../../assets/images/blue_logo.png");
import {  icon } from "../assets";

const refineText = (str, l) => {
  if (str) return str.substring(0, l);
};
class SidebarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentDidMount(){
   
  }

  render() {
    return (
      <View style={styles.sidemenumaindiv}>
        <View style={styles.topContainer}>
         

         
        </View>
        <ScrollView showsVerticalScrollIndicator ={false} >
          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
              Actions.dashboard()
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <SimpleIcons color="#484848" name="home" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize:height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                Dashboard
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
              Actions.incident();
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <SimpleIcons color="#484848" name="user-follow" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize:  height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"Add Incident"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
            
              Actions.drawerClose();
              Actions.hazard();
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <SimpleIcons color="#484848" name="user" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize:  height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"Add Hazard"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
            
              Actions.drawerClose();
            
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <Ficon color="#484848" name="ios-alarm-outline" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize: height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"Do checklist"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
             
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <FoundationIcon color="#484848" name="ticket" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize: height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"Do meetings"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
            
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <SimpleIcons color="#484848" name="bell" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize: height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"View procedures"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
            
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <SimpleIcons color="#484848" name="settings" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize:height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"View policies"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
            
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <Ficon color="#484848" name="ios-help-buoy" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize:  height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"View Swms"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.breakitems}
            activeOpacity={1}
            onPress={() => {
              Actions.drawerClose();
             
              Keyboard.dismiss
            }}
          >
            <View style={styles.sideItem}>
              <View style={{ flex: 0.1 }}>
                {/* <SimpleIcons color="#484848" name="logout" size={20} /> */}
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{
                    fontSize: height * 0.025,
                    textAlign: "left",
                    color: "#484848",
                    fontWeight: "normal"
                  }}
                >
                  {"logout"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topContainer: {
    height: height * 0.3,
    backgroundColor: "#4871b7"
  },
  avtarContainer: {
    height: height * 0.17,
    width: width * 0.24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  topTextContainer: {
    height: height * 0.13,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.01,
    flexDirection: "column",
    backgroundColor: "red"
  },
  textView: {
    flex: 1,
    flexDirection: "row",
    marginBottom: height * 0.02
  },

  sidemenumaindiv: {
    flex: 1,
    flexDirection: "column"
  },
  sidemenuitems: {
    padding: 10,
    paddingBottom: 0,
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  imageView: { flex: 0.25, justifyContent: "center", alignItems: "center" },
  breakitems: {
    marginHorizontal: width * 0.08,
    height: height * 0.08,
    flexDirection: "row",
    alignItems: "center"
  },
  sideItem: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf:'center',
    justifyContent: "space-between",
    height: height * 0.08,
    borderBottomColor: "#dadada",
    borderBottomWidth: 1,
    // marginRight: 20,
    width: width * 0.7
  }
});

const mapStateToProps = state => {
 
  return {
   
  };
};

const mapDispatchToProps = dispatch => {
  return {
   
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarComponent);
