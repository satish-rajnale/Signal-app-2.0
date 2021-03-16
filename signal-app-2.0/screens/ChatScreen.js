import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { SafeAreaView , TouchableOpacity} from "react-native";
import * as firebase from "firebase";

import { Ionicons , FontAwesome} from '@expo/vector-icons'; 
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { db, auth } from '../firebase';

const ChatScreen = ({navigation, route}) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);



   useLayoutEffect(() => {
       navigation.setOptions({
           title:"Chat",
           headerBackTitleVisible: false,
           headerTitleAlign: "left",
           headerTitle: () => (
               <View 
               style={{
                   flexDirection:"row",
                   alignItems:"center",
               }}>
                   <Avatar
                        rounded
                        source={{
                            uri:"https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
                        }}/>
                        <Text style={{color:"white", marginLeft:10, fontWeight:"700"}}>{route.params.chatName}</Text>
               </View>
           ),
           headerRight: () =>{
               <View 
               style={{
                   flexDirection:"row",
                   justifyContent:"space-between",
                   width:80,
                   marginRight:20,
               }}>
                   <TouchableOpacity>
                       <FontAwesome name="video-camera" size={24} color="white"/>
                   </TouchableOpacity>
                   <TouchableOpacity>
                       <Ionicons name="md-checkmark-circle" size={24} color="white"/>
                   </TouchableOpacity>
               </View>
           }
       })
   }, [navigation])
   
   const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection("messages").add({
        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL
   
    });

    setInput("");
   }

   useLayoutEffect(()=>{
    const unsubscribe = db.collection("chats")
                            .doc(route.params.id)
                            .collection("messages")
                            .orderBy("timestamp", "desc")
                            .onSnapshot((snapshot) => setMessages(
                                snapshot.docs.map((doc) => ({
                                    id: doc.id,
                                    data: doc.data()
                                }))
                            ));
                        return unsubscribe;
   }, [route])


    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor:"white"
        }}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView  
                behavior={Platform.OS === "ios" ? "padding" : 1} 
                style={styles.container}
                keyboardVerticalOffset={90}>
                    <TouchableWithoutFeedback>
                   
                    <ScrollView contentContainerStyle={{paddingTop:15}}>
                        {
                            messages.map(({id, data}) => (
                                data.email === auth.currentUser.email? 
                                    (
                                        <View key={id} style={styles.receiver}>
                                            <Avatar
                                            position="absolute"
                                        //web element
                                            containerStyle={{
                                                position : "absolute",
                                                bottom : -15,
                                                right : -5
                                            }}
                                            bottom={-15}
                                            right={-5}
                                            rounded
                                            size={30}
                                            source={{
                                                uri: data.photoURL,
                                            }}/>
                                            <Text style={styles.receiverText}>{data.message}</Text>
                                            
                                        </View>
                                    ):(
                                        <View  key={id} style={styles.sender}> 
                                            <Avatar/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>

                                        </View>
                                    )
                            ))
                        }
                    </ScrollView>
                    </TouchableWithoutFeedback>
                    <>
                    <View style={styles.footer}>
                        <TextInput 
                            onChangeText={(text)=> setInput(text)}
                            placeholder="signal message"
                            onSubmitEditing={sendMessage}
                            value={input}
                            style={styles.textInput}/>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={sendMessage}
                        >
                            <Ionicons name="send" size ={24} color="2868E6"/>
                        </TouchableOpacity>

                    </View>
                    </>
                   
            </KeyboardAvoidingView>

         
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
container:{
    flex:1,
},
receiver:{
    padding:15,
    backgroundColor:"#ECECEC",
    alignSelf:"flex-end",
    borderRadius:20,
    marginRight:15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative",

},
sender:{
    padding:15,
    backgroundColor:"#2868E6",
    alignSelf:"flex-start",
    borderRadius:20,
    margin:15,
    maxWidth:"80%",
    position:"relative",
   
},
receiverText:{
    color:"black",
    fontWeight:"500",
    marginLeft:15
},
senderText:{
    color:"white",
    fontWeight:"500",
    marginLeft:10,
   
},
senderName:{
    left:10,
    paddingRight:10,
    fontSize:10,
    color:"white",
},

footer:{
    flexDirection:"row",
    alignItems:"center",
    width:"100%",
    padding:15
},
textInput:{
    bottom: 0,
    height:40,
    flex:1,
    marginRight:15,
    // borderColor:"transparent",
    backgroundColor:"#ECECEC",
    borderWidth: 1,
    padding:10,
    color:"grey",
    borderRadius:30

},


})
