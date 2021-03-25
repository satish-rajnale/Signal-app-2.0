import React, { useLayoutEffect } from 'react'
import { StatusBar} from "expo-status-bar";
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView} from "react-native";
import { Button, Input, Image} from "react-native-elements";
import {useState} from "react";
import {auth} from "../firebase";

const RegisterScreen = ({ navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
       navigation.setOptions({
           headerBackTitle: "Back to Login",
       });
    }, [navigation]);


    const register =() =>{
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://www.pngkit.com/png/full/213-2133496_premier-league-and-fa-cup-premier-league-logo.png"
                })
            })
            .catch((error) => alert(error.message))
    };


    return (
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <StatusBar style="light"/>
            <Text h3 style={{ fontSize: 20 ,marginBottom:50}}>Create a Signal Account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" 
                        autofocus 
                        type="text"
                        value={name}
                        onChangeText={(text) => setName(text)}/>
                <Input placeholder="Email" 
                            autoFocus
                            type="email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}/>
                <Input placeholder="Password" 
                            secureTextEntry 
                            type="password"
                            value={password}
                            onChangeText={(text) => setPassword(text)}/>
                <Input placeholder="Profile Picture Url (Optional)" 
                            autoFocus
                            type="text"
                            value={imageUrl}
                            onChangeText={(text) => setImageUrl(text)}
                            onSubmitEditing={register}/>
            </View>

            <Button containerStyle={styles.button}
                    raised
                     onPress={register} 
                     title='Register'
                    />
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

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
