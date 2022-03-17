import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity , Modal} from 'react-native';
import { color } from 'react-native-web';

const ipcim="localhost";

export default class Tipusok extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      dataSource:[],
      isVisible: false,
      konyvdata:[],
    
    }
  }

  szavazat=(szam)=>{
    alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch('http://localhost:8080/szavazatfelvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    //alert("hello")
    
    return fetch('http://localhost:8080/konyv')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
          konyvdata: [],
        }, function(){

        });
       // alert(JSON.stringify(this.state.dataSource))
      })
      .catch((error) =>{
        console.error(error);
      });
      
  }

  displayModal(show){
    this.setState({isVisible: show})
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20,backgroundColor:"#40E0D0"}}>
       
      < Modal
            animationType = {"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              
            }}>
          <View style = {{backgroundColor:"#40E0D0"}} /* Modal Törzse */>

          <Text >{this.state.konyvdata.konyv_nev}</Text>

        
          </View>
          <View style = {styles.container2}>
              <Text //Bezáró Gomb
                style={styles.closeText}
                onPress={() => {
                  this.displayModal(!this.state.isVisible);}}>Bezárás
              </Text>
            </View>
          </Modal>

        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
          <Text style={{color:"purple",fontSize:28,textAlign:"center",marginTop:5,marginBottom:5}}   >{item.konyv_nev} </Text>
         
        
           
          <TouchableOpacity 
              onPress={() => {
              this.displayModal(true); 
              this.setState({konyvdata:item})

              }}>
          <Image  source={{uri:'http://localhost:8080/'+item.konyv_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />    
          </TouchableOpacity>

          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.szavazat(item.konyv_id)}
      >
        <Text style={{color:"grey",fontWeight:"bold",fontSize:20}}  >Erre szavazok</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({konyv_id}, index) => konyv_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
  },
  closeText: {
    fontSize: 24,
    color: 'purple',
    marginTop:'auto',
  },
  container2: {
    fontSize: 24,
    color: '#00479e',
    marginTop:'auto',
    alignSelf:'center',
    marginBottom:50,
    backgroundColor: 'white'
  },
  modal: {
    fontSize: 24,
    color: '#00479e',
    marginTop:100,
    textAlign: 'center',
    backgroundColor:'#40E0D0'
  },
  button: {
    display: 'flex',
    height: 60,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0fb0fb',
    shadowColor: '#fff',
    shadowOpacity: 0.5,
    padding:20,
    shadowOffset: { 
    height: 10, 
    width: 0 
    },
    shadowRadius: 25,
  },
});