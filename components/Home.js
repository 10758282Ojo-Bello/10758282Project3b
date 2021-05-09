import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Button, FlatList, Pressable, Modal, Alert, TouchableOpacity  } from 'react-native';
import Clipboard from 'expo-clipboard'
import { Link } from 'react-router-native';
import { logout } from '../actions/userActions';
import { listPasswords, storePassword, deletePassword} from '../actions/passwordActions';

function Home(props) {
    const userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
    const [counter,setCounter]=useState(0)
    const [title, setTitle] = useState('')
    const [password, setPassword] = useState('')
    const [updateTitle, setUpdateTitle] = useState('')
    const [updatePassword, setUpdatePassword] = useState('')
    const [search, setSearch] = useState('')
    const [id, setId]=useState('')
    const passwordList=useSelector((state)=> state.passwordList)
    const [modalVisible, setModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [activePassword, setActivePassword]=useState({})
    const [copiedText, setCopiedText] = useState('')

    let userId,activeUser;
if (userInfo!== {}&& userInfo){
    userId = userInfo._id
}


    
    
    if (userInfo!== {}&& userInfo){
        activeUser = userInfo
    } 
    const {passwords, loading,error} = passwordList;
    const copyToClipboard = () => {
        alert("Password has been copied to clipboard")
        Clipboard.setString(updatePassword)
      }
    const submitHandler =async (e) => {
        e.preventDefault();
        const dispatchTitle = title;
        const dispatchPassword = password;
        
        await dispatch(storePassword(dispatchTitle,activeUser,dispatchPassword))
        setTitle('');
        setPassword('');
        setCounter(counter+1);
        setModalVisible(!modalVisible)
        
        
      }
      const autoGenPass = () =>{
        const randomstring = Math.random().toString(36).slice(-11);
        setPassword(randomstring);
      }
      const editHandler=async (e)=>{
        e.preventDefault();
        const dispatchTitle = updateTitle;
        const dispatchPassword = updatePassword;
        await dispatch(storePassword(dispatchTitle,activeUser,dispatchPassword,id));
        setUpdateTitle('');
        setUpdatePassword('');
        setId("")
        setCounter(counter+1);
        setUpdateModalVisible(!updateModalVisible)
      }
      const changeSearch =(text)=>{
        setSearch(text)
    }
    const changePassword =(text)=>{
        setPassword(text)
    }
    const changeTitle =(text)=>{
        setTitle(text)
    }
    const changeUpdatePassword =(text)=>{
        setUpdatePassword(text)
    }
    const changeUpdateTitle =(text)=>{
        setUpdateTitle(text)
    }
      const deleteHandler = async(password) => {
        await dispatch(deletePassword(activePassword, activeUser));
        setCounter(counter+1);
        setUpdateModalVisible(false);
      }
      const openEditModal=(id, passTitle, passPassword, activePass)=> {
          setUpdateModalVisible(!updateModalVisible)
          setId(id);
          setUpdateTitle(passTitle);
          setUpdatePassword(passPassword)
          setActivePassword(activePass)
      }
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/login")
}
    useEffect(() => {
        dispatch(listPasswords(activeUser))
        setCounter(0);
        return () => {
            //
        }
    }, [modalVisible, updateModalVisible])
    return (
        <View>
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
            {
                activeUser?<View>
                    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={()=>{
                        Alert.alert("Modal has been closed");
                        setModalVisible(!modalVisible);
                    }}>
                        
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}> Store a New Password</Text>
                                <TextInput style={styles.input} value={title} onChangeText={changeTitle} placeholder="What is this password/pin for?" />
                                <TextInput style={styles.input} value={password} onChangeText={changePassword} placeholder="Enter the password to store" />
                                
                                <Pressable style={[styles.button, styles.buttonClose]}
                                onPress={submitHandler} >
                                    <Text style={styles.textStyle}>Store Password</Text>

                                </Pressable>
                                <Pressable 
                                    style={[styles.button, styles.buttonClose]} onPress={autoGenPass}
                                ><Text style={styles.textStyle}>Generate a strong password</Text></Pressable>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                                >
                                <Text style={styles.textStyle}>Go Back</Text>
                                </Pressable>
                            </View>
                            </View>

                    </Modal>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>Store A new Password</Text>
                    </Pressable>

                    
                </View>:
                <Text></Text>
            }

{
                activeUser?<View>
                    <Modal animationType="slide" transparent={true} visible={updateModalVisible} onRequestClose={()=>{
                        Alert.alert("Modal has been closed");
                        setUpdateModalVisible(!modalVisible);
                    }}>
                        
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}> Edit a Password</Text>
                                <TextInput style={styles.input} value={updateTitle} onChangeText={changeUpdateTitle} placeholder="What is this password/pin for?" />
                                <TextInput style={styles.input} value={updatePassword} onChangeText={changeUpdatePassword} placeholder="Enter the password to store" />
                                
                                <Pressable style={[styles.button, styles.buttonClose]}
                                onPress={editHandler} >
                                    <Text style={styles.textStyle}>Update</Text>

                                </Pressable>
                                <Pressable  style={[styles.button, styles.buttonClose]} onPress={copyToClipboard}>
                                    <Text>Copy to Clipboard</Text>
                                </Pressable>
                                <Pressable style={[styles.button, styles.buttonClose]} onPress={()=>deleteHandler()}>
                                    <Text>Delete Password</Text>
                                </Pressable>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setUpdateModalVisible(!updateModalVisible)}
                                >
                                <Text style={styles.textStyle}>Go Back</Text>
                                </Pressable>
                            </View>
                            </View>

                    </Modal>
                    {/* <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.textStyle}>Store A new Password</Text>
                    </Pressable> */}

                    
                </View>:
                <Text></Text>
            }
        
        
        <View style={styles.passwords}>

            {
                activeUser? <View>
                                <Text style={styles.headerText}>These are your stored passwords</Text>
                                <TextInput value={search} onChangeText={changeSearch} placeholder="Search" style={styles.input} />
                    </View>:<Text></Text>
            }

            {
                    activeUser? <FlatList  data={passwords} renderItem={item =>(
                        search?<Text style={styles.passwordView}>
                            {
                                
                               item.item.title.includes(search) && (
                               <TouchableOpacity style={styles.password}  onLongPress={() =>openEditModal(item.item._id,item.item.title,item.item.password)}>
                                  
                                     <Text>For: {item.item.title}</Text>
                                     <Text>Password: {item.item.password}</Text>
                                    </TouchableOpacity>
                               )                                      
                            } </Text>
                            
                        :<TouchableOpacity style={styles.password} onLongPress={() =>openEditModal(item.item._id,item.item.title,item.item.password,item.item)} >
                        <Text>For: {item.item.title}</Text>
                                    <Text>Password: {item.item.password}</Text>
                        </TouchableOpacity>
                        
                    )} keyExtractor={item => item._id}
                />:<Text></Text>}
                </View>
                <Text>Thank your for choosing us</Text>
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
        marginHorizontal:300,
        color:'black'
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

    },
    passwords:{
        marginTop:10,
        height:"70%",
        paddingTop:100,
        color:"black",
        paddingHorizontal:100
    },
    password:{
        margin:10,
        backgroundColor:"white",
        padding:10,
    },
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
    headerText:{
        marginHorizontal:80,
        fontSize:17,
        fontWeight:"700",
        color:"black",
        backgroundColor:"#f0f0f0",
        padding:10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop:10
      },
      buttonOpen: {
        backgroundColor: "#fcb800",
      },
      buttonClose: {
        backgroundColor: "#fcb800",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      passwordView:{
          width:600,
          marginLeft:"25%",
          justifyContent:"center",
          alignItems:"center"
      }
})
export default Home
