import React, {useLayoutEffect, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar} from "react-native-elements";
import { db } from '../firebase';


const CustomListItem = ({ id, chatName, enterChat}) => {
const [chatMessages, setChatMessages] = useState([]);

useEffect(() => {
    const unsubscribe = 
                        db.collection('chats')
                          .doc(id)
                          .collection('messages')
                          .orderBy("timestamp", "desc")
                          .onSnapshot((snapshot) => 
                            setChatMessages(snapshot.docs.map((doc)=> doc.data()))
                            );
                            

    // const unsubscribe = db.collection("chats")
    // .doc(id)
    // .collection("messages")
    // .orderBy("timestamp", "desc")
    // .onSnapshot((snapshot) => setChatMessages(
    //     snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data()
    //     }))
    // ));
//   console.log(chatMessages)
    
    return unsubscribe;
    
},[])
console.log(chatMessages?.[0]?.displayName)
    return (
        <ListItem 
            key={id}
            onPress={() => enterChat(id, chatName)} 
            key={id} 
            bottomDivider>
            <Avatar
            rounded
            source={{
                uri: 
                "https://www.pngitem.com/pimgs/m/168-1680211_netflix-logo-circle-hd-png-download.png"
            }}/>
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight:"800"}}>
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                   {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
