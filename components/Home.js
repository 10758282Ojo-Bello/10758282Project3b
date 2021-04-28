import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeRouter,Link,Route } from 'react-router-native';
import { logout } from '../actions/userActions';
import Cookie from 'js-cookie'

function Home(props) {
    const userSignin = useSelector(state=>state.userSignin);
    const userRegister = useSelector(state => state.userRegister);
    const {userInfo} = userSignin;
    const {userInfo2} = userRegister;
    
    let activeUser;
    
    
    if (userInfo!== {}&& userInfo){
        activeUser = userInfo
    } else if(userInfo2!=={}&&userInfo2){
        activeUser = userInfo2
    }
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        Cookie.get('userInfo')
        props.history.push("/login")
}
    useEffect(() => {
        return () => {
            //
        }
    }, [activeUser])
    return (
        <View style={styles.homecontainer}>
            {
                activeUser?<Text>Welcome {activeUser.name}</Text>:
                <Text><Link underlayColor="#f0f4f7"   to={"/login"}><Text style={styles.navlink}>Login</Text></Link>
                <Link underlayColor="#f0f4f7" to={"/register"}><Text style={styles.navlink}>Register</Text></Link></Text>
            }
            {
                activeUser? <Button title="logout" type="button" onPress={handleLogout} className="button secondary full-width"/>:
                <Text>Log in if you have an account, or register if you dont</Text>
            
        }
        </View>
    )
}
const styles = StyleSheet.create({
    homecontainer:{
        backgroundColor:'white',
        width:"80%",
        justifyContent:'center',
        alignItems:'center',
        marginLeft:60,
        paddingVertical:20,
        marginHorizontal:300
    },
    navlink:{
        padding:20,
        color:'white',
        backgroundColor:'#02a5eb',
        marginLeft:35,
        flexDirection:'row' ,   
        paddingVertical:5,
        borderWidth:2.5,
        borderRadius:5,
        borderColor:'#00628c'

    }
})
export default Home
