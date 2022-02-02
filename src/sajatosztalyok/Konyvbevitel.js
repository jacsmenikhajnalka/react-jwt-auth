import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native';

export default class Bevitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

       konyv_nev: '',
       kony_kep:'',
        

    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")
       
    let bemenet={
      bevitel1:this.state.konyv_nev,
     
      bevitel2:this.state.konyv_kep,

      bevitel3:this.state.konyv_tipus
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
     this.props.frissit() 

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
          style={{height: 40,width:'50%',alignSelf:'center',backgroundColor:'lightgreen',borderColor:'black',color:"black"}}
          placeholder="Add meg a nevét:"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />

        <Text style={{paddingTop: 10, fontSize: 22,color:'black',textAlign:'center'}}>
              Könyv kép:
          </Text>
        <TextInput
          placeholderTextColor="black"
          style={{height: 120, width:'50%',alignSelf:'center',backgroundColor:'lightgreen',marginBottom:5,textAlignVertical:'top',color:"black"}}
          placeholder="Add meg az író nevét:"
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
        />
         <TouchableOpacity
          onPress={async ()=>this.felvitel()}>
          <View style={styles.gomb}>
            <Text style={styles.gombSzoveg}>Felvitel</Text>
          </View>
        </TouchableOpacity>
        
      </View>
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