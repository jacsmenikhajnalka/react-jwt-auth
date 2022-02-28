import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native';
import FileUpload from "./upload"

export default class Konyvbevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

       konyv_nev: '',
       konyv_tipus:'',
       konyv_kep:'',

        

    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")
       
    let bemenet={
      bevitel1:this.state.konyv_nev,
     bevitel2:this.state.konyv_tipus,
      bevitel3:this.state.konyv_kep,
     
    }

    fetch('http://localhost:8080/felvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
    )
    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)
     

})
    
}


  render() {

    return (
    <View style = {{backgroundColor:'lightgreen',width:'80%',borderRadius:20,alignSelf:'center'}}>
      <View style={{padding: 10}}>
          <Text style={{padding: 10, fontSize: 22,color:'black',textAlign:'center'}}>
             Könyv név:
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'white',borderColor:'black',color:"black"}}
          placeholder="Add meg a nevét:"
          onChangeText={(konyv_nev) => this.setState({konyv_nev})}
          value={this.state.konyv_nev}
        />
         <Text style={{padding: 10, fontSize: 22,color:'black',textAlign:'center'}}>
             Könyv tipus
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'white',borderColor:'black',color:"black"}}
          placeholder="Add meg a tipus nevét:"
          onChangeText={(konyv_tipus) => this.setState({konyv_tipus})}
          value={this.state.konyv_tipus}
        />


        <Text style={{paddingTop: 10, fontSize: 22,color:'black',textAlign:'center'}}>
              Könyv kép:
          </Text>
        
        
         
        
      </View>

      <FileUpload konyv_nev={this.state.konyv_nev} konyv_tipus={this.state.konyv_tipus} konyv_kep={this.state.konyv_kep}></FileUpload>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    gombSzoveg:{
            textAlign:'center',
            color:'black',
            marginTop:'auto',
            marginBottom:'auto',
            fontSize:25
    },
    gomb:{
            height:45,
            backgroundColor:'lightgreen',
            width:'45%',
            alignSelf:'center',
            borderRadius:10
    },
});