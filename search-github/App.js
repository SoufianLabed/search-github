import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput,Image } from 'react-native';
import tailwind from 'tailwind-rn';
import moment from 'moment';
import Loader from "react-loader-spinner";


export default function App() {

    

  const [username, setUsername] = useState("");
  const [user, setUser] = useState({});

  const [fields, setFields] = useState([]);




  

  async function search() {
    
    try {
      
      setUser({})
      setFields([])
      const response = await fetch(`http://localhost:1087/users/${username}`)
      let user = await response.json();

        const Date_creation = moment(user.created_at).format('DD/MM/YYYY')
        user.formatteDate = Date_creation
      
        setUser(user);
        console.log(user)
        setFields(Object.keys(user)) 

        
        
         
    } catch (error) {
      console.log(error.message);
    }
  }
 


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.h1}>Search Gitlab</Text>
        <Text style={styles.h2}>Renseigner un utilisateur :</Text>
        <TextInput 
          style={{color:"#6384B3",borderWidth:"3px",borderRadius:"30px",height:"30px",margin:"20px",textAlign:"center",fontSize:"18px",borderColor:"white",fontWeight:"bold"}}
          onChangeText={setUsername}
          value={username}
        />
        <Button
          onPress={search}
          title="Rechercher"
          style={styles.button}
        />
      </View>

      {fields.length > 1 ? (
      <View style={styles.middleContainer}>

   
        <Text style={styles.h2}>Les informations de l'utilisateur :</Text>
          <Image
            style={styles.logo}
            source={{
              uri: user.avatar_url
            }}
          />
          <Text style={styles.title}>{user.name } alias {user.login}</Text>

          {user.bio ?  <Text style={styles.title}>Biographie : {user.bio}</Text> : <View></View>}

          <Text style={styles.title}>Crée le {user.formatteDate}</Text>     

      </View>): (
        <View>  
         
        </View>
      )
        }
      <View style={styles.buttonContainer}>
        <Text style={styles.h3}>Soufian Labed - Efrei Paris</Text>
      </View>

 
  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row_user:{
    borderColor: 'black',
    borderWidth : '4px'
  },
  button: {
    backgroundColor: "#fff",
    marginTop: 5,
  },
  h1: {
    color: '#008F68',
    fontSize: 40,
  },
  h2: {
    color: '#FAE042',
    alignItems: "center",
    fontSize: 18,
  },
  h3: {
    color: '#008F68',
    fontSize: 10,
  },
  title: {
    color: '#008F68',
    fontSize: 20,
  },
  logo:{
    width:'200px',
    height:'200px'
  },
  topContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    width: '90%',
    margin: 20,
    padding: 10,
  },
  
});
