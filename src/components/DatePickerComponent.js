import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Platform } from "react-native";
import DatePicker from "react-native-datepicker";
const { height, width } = Dimensions.get("window");


import {calendarIcon} from '../assets/';
import { moderateScale } from "react-native-size-matters";
export default class DatePickerComponent extends Component {
  constructor() {
    super();
    this.state = { date: ''};
  }
componentDidMount(){
  if(this.props.date)
  this.setState({date:this.props.date})
  else 
  this.setState({date:''})
}

componentWillReceiveProps(nextProps){
  if(nextProps.date){
    if(nextProps.date != this.props.date){
      this.setState({date:nextProps.date})
    }
  }else{
    this.setState({date:''})
  }
  
}
  render() {

      const {style={width:width*0.8}, onOpenModal=()=>console.log("date modal opened")} =  this.props;
      const customDateStyles = this.props.customDateStyles ||  {
                                  dateIcon: {
                                    height:height*0.03,
                                    width:width*0.05,
                                    marginTop:moderateScale(10),
                                    alignSelf:'flex-end'
                                    
                                  },
                                  dateInput: {
                                    borderWidth:0,
                                    borderBottomColor: '#484848', borderBottomWidth: 0,
                                    alignItems: 'flex-start',
                                    marginTop:moderateScale(10),
                                    
                                    
                                    
                                  },
                                    disabled:{backgroundColor:'#fbfbfb'},
                                    
                                    placeholderText:{color:this.state.date?'#6A7A8C':'#6A7A8C',  fontSize: height*0.02, },
                                    dateText:{color : this.state.date?'#6A7A8C':'#6A7A8C',fontSize: height*0.025, }
                                  }
    return (


        <DatePicker
          locale={'en'}
          style={style}
          date={this.state.date}
          mode={this.props.mode}
          format="YYYY-MM-DD HH:mm"
          placeholder={this.props.placeholder}
          minDate={this.props.minDate}
          disabled={this.props.disabled||false}
          maxDate={this.props.maxDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          iconSource={calendarIcon}
          customStyles={customDateStyles}
          onPressCancel={()=>console.log("called cancel press button")}
          onOpenModal={onOpenModal}
          onDateChange={d => {this.setState({ date: d }); this.props.onDateChange(d);}}
        />
    );
  }
}

const styles = StyleSheet.create({});
