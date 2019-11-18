import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  Linking,
  Alert
} from "react-native";
import { connect, bindActionCreators } from "react-redux";
import { counter } from '../actions/'
import RNFetchBlob, { RNFetchBlobFile } from 'rn-fetch-blob'
import moment from 'moment'
import FileViewer from 'react-native-file-viewer';
import NetInfo from "@react-native-community/netinfo";
const { height, width } = Dimensions.get("window");
var PathFile;
const android = RNFetchBlob.android

const arrayData = [ 
  {
    id: 1659856565,
    name: 'Sample_Pdf',
    url: 'http://www.pdf995.com/samples/pdf.pdf'
  },
  {
    id: 1759842658,
    name: 'Sample_Pdf1',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 7896582414,
    name: 'Sample_Pdf3',
    url: 'https://gahp.net/wp-content/uploads/2017/09/sample.pdf'
  }

]

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connect:false
    };
    console.log("heterere")
  }

  submit = (count, values) => {
    console.log("valuess", count, values)
    this.props.Count(count, values)
  };

  netConnection = () =>{

    NetInfo.addEventListener(state => {
      this.setState({connect:state.isConnected})
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  
  }

  dataStorage = async (id,url) => {
    this.netConnection();
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'App Storage Permission',
        message:
          'This App needs access to your storage ' +
          'so you can store files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      let dirs = RNFetchBlob.fs.dirs
      let filePath =  dirs.SDCardDir + `/sampleApp/${id}.pdf`
      RNFetchBlob.fs.readFile(filePath)
        .then((data) => {
        if(data.length>0){
          FileViewer.open(filePath)
        }
      }).catch(err =>{
        Alert.alert(
          'Files',
          'File is not available please download',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {this.fileDownload(id,url)}},
          ],
          {cancelable: false},
        );
      })
      

    }
  }
   
  iosFileDownload = (id,url) => {
    this.netConnection();
    let dirs = RNFetchBlob.fs.dirs
    console.log("Dire",dirs)
      let filePath =  dirs.SDCardDir + `/sampleApp/${id}.pdf`
      RNFetchBlob.fs.readFile(filePath)
        .then((data) => {
        if(data.length>0){
          FileViewer.open(filePath)
        }
      }).catch(err =>{
        Alert.alert(
          'Files',
          'File is not available please download',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {this.fileDownload(id,url)}},
          ],
          {cancelable: false},
        );
      })
  }

  fileDownload =(id,url)=> {
    if(this.state.connect === true){
      let dirs = RNFetchBlob.fs.dirs
    RNFetchBlob
        .config({
          addAndroidDownloads: {
            // Show notification when response data transmitted
            useDownloadManager: true,
            notification: true,
            // Title of download notification
            title: `${id}.pdf`,
            // File description (not notification description)
            description: 'An Pdf file.',
            mime: 'application/pdf',
            // Make the file scannable  by media scanner
            mediaScannable: true,
            path: dirs.SDCardDir + `/sampleApp/${id}.pdf`
          },
          // response data will be saved to this path if it has access right.

          // path: dirs.SDCardDir + '/OWHS/data.pdf'
        })
        .fetch('GET', url, {
          //some headers ..
        })
        .then((res) => {
          // the path should be dirs.DocumentDir + 'path-to-file.anything'
          console.log('The file saved to ', res.path())
          alert("File is successfully download")
        }).catch(err=>{
          alert("There is an issue to download the file")
        })
    }
    else {
      alert("Please check your internet connection")
    }
    
  }

  readFile = () => {

    let dirs = RNFetchBlob.fs.dirs
    filePath = dirs.SDCardDir + '/OWHS/data.pdf'
    console.log("filePath-----", filePath)
    FileViewer.open(filePath)
  }





  

  render() {

    return (
      <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 23, alignSelf: 'center' }}>Online/Offline Document</Text>
        <FlatList
          data={arrayData}
          renderItem={({ item }) => 
            <TouchableOpacity onPress={()=>Platform.OS=='android'? this.dataStorage(item.id,item.url):this.iosFileDownload(item.id,item.url)} style={{borderBottomWidth:1}}>
              <Text style={{fontSize:20,color:"#327fa8"}}>
                {item.name}
              </Text>
            </TouchableOpacity>
          }
        />
        {/* <TouchableOpacity onPress={() => this.submit(this.props.count, 'INCREMENT')}><Text>+</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.submit(this.props.count, 'DECREMENT')}><Text>-</Text></TouchableOpacity> */}
        {/* <Button title="fileInput" onPress={() => this.dataStorage()} /> */}
        {/* <Button title="ViewData" onPress={() => this.readFile()} /> */}
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log("this.state", state)
  return {
    count: state.counterReducer ? state.counterReducer.count : 0
  };
};

const mapDispatchToProps = dispatch => ({
  Count: (count, str) => dispatch(counter(count, str)),
});

const styles = StyleSheet.create({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
