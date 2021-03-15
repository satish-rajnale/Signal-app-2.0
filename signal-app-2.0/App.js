import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen';


const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle:{backgroundColor: "black"
  },
  headerTitleStyle:{color:"white"},
  headerTintColor:"white",
  headerTitleAlign: 'center'
}
export default function App() {
  return (

    <NavigationContainer >
      <Stack.Navigator  screenOptions={globalScreenOptions} >
      <Stack.Screen  style={styles.container} name="Login"component={LoginScreen} />
      <Stack.Screen  style={styles.container} name="Register"component={RegisterScreen} />
      <Stack.Screen  style={styles.container} name="Home"component={HomeScreen} />
      <Stack.Screen  style={styles.container} name="AddChat"component={AddChatScreen} />
      <Stack.Screen  style={styles.container} name="Chat"component={ChatScreen} />

      </Stack.Navigator>
     
    
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
