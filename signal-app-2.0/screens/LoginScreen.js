import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image} from "react-native-elements";
import { StatusBar} from "expo-status-bar";
import {useState} from "react";
import { KeyboardAvoidingView} from "react-native";
import {auth} from "../firebase";




const loginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) =>{
         
           if(authUser){
               navigation.navigate("Home");
           } 
       });
       return unsubscribe;   
    },[]);

    const signIn =() => {
        auth.signInWithEmailAndPassword(email, password)
        .catch(err => alert(err));
    };

    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <StatusBar style="light"/>
                <Image source={{
                    uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",}}
                    style={{ width:200, height:200 }}/>
            
            <View style={styles.inputContainer}>
                    <Input placeholder="Email" 
                            autoFocus
                            type="email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}/>
                    <Input placeholder="Password" 
                            secureTextEntry 
                            type="password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            onSubmitEditing={signIn}/>
            </View>

            <Button containerStyle={styles.button}
                     onPress={signIn} 
                     title='Login'/>
            <Button containerStyle={styles.button}
                     type="outline"
                     onPress={()=> navigation.navigate("Home")} 
                     title='Register'/>
                    
        </KeyboardAvoidingView> 
    )
}

export default loginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:10, 
        backgroundColor:"white"
    },
    inputContainer: {
        width:300,

     },
    button:{
        width:200,
        marginTop:10,
        
    },

})

