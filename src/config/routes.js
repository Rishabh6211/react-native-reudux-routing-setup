import React, { Component } from 'react';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import {
    SafeAreaView,
    StatusBar,
    Dimensions
  } from 'react-native';
import { Root } from "native-base";
import {CounterContainer,LoginContainer,Dashboard,Incident,Hazard} from '../containers/'
import {Sidebar} from '../components/'
import {sidebar} from '../assets/'
const { height, width } = Dimensions.get("window");
const RouterComponent = () => {
  return (
   <Root>
    <Router>
      <Scene key="root">
        <Scene key="login"
          component={LoginContainer}
          title="login"
          hideNavBar
        />
       
      
       <Drawer
           hideNavBar
           key="drawer"
           contentComponent={Sidebar}
           drawerImage={sidebar}
           drawerWidth={width * 0.89}
           
       >
           <Scene key="dashboard"
           drawer={true}
           drawerImage={sidebar}
          component={Dashboard}
          title="Dashboard"
          hideNavBar          
        />

        <Scene key="incident"
           drawer={true}
           drawerImage={sidebar}
          component={Incident}
          title="Incident Form"
          hideNavBar        
        />

        <Scene key="hazard"
           drawer={true}
           drawerImage={sidebar}
          component={Hazard}
          title="Incident Form"
          hideNavBar        
        />
        </Drawer>
      </Scene>
    </Router>
    </Root>
   
  );
}

export default RouterComponent;