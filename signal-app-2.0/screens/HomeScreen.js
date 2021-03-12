import React, { useEffect, useLayoutEffect } from 'react'
import { ScrollView, StatusBar } from 'react-native'
import { StyleSheet, Text, View , Platform} from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { AntDesign, SimpleLineIcons} from "@expo/vector-icons"
import { SafeAreaView , TouchableOpacity} from "react-native";
import {Avatar } from "react-native-elements"
import {auth, db} from "../firebase";


const HomeScreen = ({navigation}) => {

    const [chats, setChats] = useState([]);


    const signOutUser = () =>{
       auth.signOut().then(() => {
        navigation.replace("Login");
       }) 
    }

    useEffect(() => {
       const unsubscribe = db.collection('chats').onSnapshot(snapshot => {
           setChats(snapshot.docs.map(doc => ({
               
           })))
       })
    }, [input])



    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Signal",
            headerStyle: {backgroundColor : "black"},
            headertitleStyle : { color: "red"},
            headerTintColor: "red",
            headerLeft: () => (
                <View style={{ marginLeft: 20}}>
                   <TouchableOpacity activeOpacity={0.5}> 
                       <Avatar rounded onPress={ signOutUser} source={{uri: auth?.currentUser?.photoURL}}/>
                   </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width: 70,
                    alignContent:"center",
                    marginRight: 10,
                }}>
                    <TouchableOpacity activeOpacity={0.5}> 
                        <AntDesign name="camerao" size={24} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => navigation.navigate("AddChat")}
                    activeOpacity={0.5}> 
                        <SimpleLineIcons name="pencil" size={21} color="white"/>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation])



    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 1: 0}}>
            <ScrollView>
                 <CustomListItem/>
             </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
 
});
