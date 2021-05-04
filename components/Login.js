import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeRouter,Link,Route } from 'react-router-native';
import { signin } from '../actions/userActions';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state=>state.userSignin);
    const {loading, userInfo,error} = userSignin;
    const dispatch = useDispatch();
    const submitHandler=()=>{
        dispatch(signin(username,password))
        console.log(error)
        if(!loading){
            props.history.push('/') 
        }
        
        
        
    }
    const changePassword=(text)=>{
        setPassword(text)
    }
    const changeUsername =(text)=>{
        setUsername(text)
    }
    useEffect(() => {
                //props.history.push('/')  
            
        return () => {
            //
        }
    }, [error])
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.texts}>Login Here:</Text>
            <TextInput value={username} onChangeText={changeUsername} placeholder="Username" style={styles.input} />
            <TextInput value={password} onChangeText={changePassword} placeholder="password" style={styles.input} />
            <Button style={styles.authbutton} onPress={submitHandler} title="Login" />
            <Text>Dont have an account? <Link to="/register"><Text style={styles.links}>Create one</Text></Link></Text>
            {loading && <Text>loading...</Text>}
            {error && <Text>Login failed, please check that your login credentials are correct</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:0,
        backgroundColor:'#f0f0f0',
        width:300,
        flexDirection:'row',
        height:30,
        marginVertical:10,
        marginHorizontal:60,
        padding:10


    },
    texts:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        fontWeight:'700'
    },
    loginContainer:{
        backgroundColor:'white',
        width:"75%",
        justifyContent:'center',
        alignItems:'center',
        marginLeft:60,
        paddingVertical:20

    },
    links:{
        color:'#006691'
    },
    authbutton:{
        color:'white',
        backgroundColor:'#fcb800',
        padding:10       
    }
})

export default Login
