import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Button, View, TextInput,Image } from 'react-native';
import tailwind from 'tailwind-rn';


export default function App() {

    

  const [username, setUsername] = useState("SoufianLabed");
  const [user, setUser] = useState({});

  const [fields, setFields] = useState([]);




  

  async function search() {
    
    try {
      
    
      const response = await fetch(`http://localhost:1044/users/${username}`)
      let user = await response.json();
      
        setUser(user);
        setFields(Object.keys(user))

        console.log(user.avatar_url)
         
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
          style={tailwind('placeholder:italic placeholder:text-gray-400 block border border-gray-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm')}
          onChangeText={setUsername}
          value={username}
        />
        <Button
          onPress={search}
          title="Rechercher"
          style={styles.button}
        />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.h2}>Les informations de l'utilisateur :</Text>


          <Image
            style={styles.logo}
            source={{
              uri: user.avatar_url
            }}
          />
          <Text style={styles.title}>{user.login}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Text style={styles.h3}>Soufian Labed - Efrei Paris</Text>
      </View>

 
  
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row_user:{
    borderColor: 'black',
    borderWidth : '4px'
  },
  button: {
    backgroundColor: "#008F68",
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
    marginTop: 8,
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
