import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeRouter,Link,Route } from 'react-router-native';
import { register } from '../actions/userActions';


function Register(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const userRegister = useSelector(state=>state.userRegister);
    const {loading, userInfo2,error} = userRegister;

    const dispatch = useDispatch();

    const redirect = "/login"
    const submitHandler=()=>{
        if(password===rePassword){
            if(email.includes('@')){
                dispatch(register(name,username,password,email,));
                props.history.push('/')
            }else{
                alert("That is not a valid e mail address")
            }
             
        }else{
            alert("The passwords do not match")
        }
        
        
    }
    const changePassword=(text)=>{
        setPassword(text)
    }
    const changerePassword=(text)=>{
        setRePassword(text)
    }
    const changeUsername =(text)=>{
        setUsername(text)
    }
    const changeEmail=(text)=>{
        setEmail(text)
    }
    const changeName =(text)=>{
        setName(text)
    }

    useEffect(() => {
        if(userInfo2){
            //
        }else {
            //
        }
        return( )=>{
            //
        } 
    },[]
    );
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.texts}>Create an Account:</Text>
            <TextInput value={email} onChangeText={changeEmail} placeholder="E-mail" style={styles.input} />
            <TextInput value={username} onChangeText={changeUsername} placeholder="Username" style={styles.input} />
            <TextInput value={name} onChangeText={changeName} placeholder="Full Name" style={styles.input} />
            <TextInput value={password} onChangeText={changePassword} placeholder="password" style={styles.input} />
            <TextInput value={rePassword} onChangeText={changerePassword} placeholder="password" style={styles.input} />
            <Button style={styles.authbutton} onPress={submitHandler} title="Create Account" />
            <Text>Have an account already? <Link to="/login"><Text style={styles.links}>sign in</Text></Link></Text>
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

export default Register
