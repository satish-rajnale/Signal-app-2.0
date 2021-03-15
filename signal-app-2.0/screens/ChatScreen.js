import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { SafeAreaView , TouchableOpacity} from "react-native";


const ChatScreen = ({navigation, route}) => {
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
               <View>
                   <TouchableOpacity>
                       <FontAwesome name="video-camera" size={24} color="white"/>
                   </TouchableOpacity>
                   <TouchableOpacity>
                       <Ionicons name="call" size={24} color="white"/>
                   </TouchableOpacity>
               </View>
           }
       })
   }, [navigation])
   
   
    return (
        <View>
            <Text>{route.params.chatName}</Text>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
