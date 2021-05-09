import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { NativeRouter,Link,Route } from 'react-router-native';
import {Provider} from 'react-redux'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import store from './store';

const image = { uri: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" };
export default function App() {
  
  return (
    <Provider store={store}>
      <NativeRouter>
          <View style={styles.container}>
          <ImageBackground source={image} style={styles.image}>
            
            <View style={styles.content}>
              <StatusBar style="auto" />
              <Text style={styles.textVertMarg}>Hello from 10758282 </Text>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </View>         
            
            
          </ImageBackground>
          </View>
      </NativeRouter>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  content:{
    marginTop:100
  },
  container: {
    backgroundColor: '#fff',
    alignItems:'center',
    flexDirection:'column',
    width:'100%',
    height:'100%',

  },
  textVertMarg:{
    marginVertical:20,
    color:'white',
    fontSize:30,
    alignItems:'center',
    justifyContent:'center',

    fontWeight:"700",
    marginLeft:110
  },
  image: {
    flex: 1  ,
    resizeMode: "cover",
    // justifyContent: "center",
  }
});
