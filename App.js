/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  TextInput,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {

  // login items
  const [email, setEmail] = useState() ;
  const [password, setPassword] = useState() ;
  const [token, setToken] = useState() ;
  const [showLogin, setShowLogin] = useState(true) ;

  // todos 

  const [todosList, setTodosList] = useState([]) ;
  const [taskName, setTaskName] = useState() ;

  


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const handleAddTask = async()=>{
    // check if email is verified or not
    try {
      const response = await fetch(
        'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/todo', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: taskName,
            authToken: authToken
        
          }),
        }

      );
      const json = await response.json();


      // check result and route
     if(json.id && json.name == taskName){
       // success

     }
     else{
      // handle error
     }

      



    } catch (error) {
      console.error(error);
    }


  }
  const handleLogin = async()=>{
    // check if email is verified or not
    try {
      const response = await fetch(
        'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          }),
        }

      );
      const json = await response.json();

      console.log(json.authToken) ;
      // check result and route
      if(json.user.emailVerifiedAt != null && json.authToken){
        console.log("rere");
          setToken(json.authToken) ;
          setShowLogin(false) ;

      }
      else{
        console.log("there");
        // redirect to email verify screen
      }

      



    } catch (error) {
      console.error(error);
    }


  }

  const loginPage = () =>{
    return (

          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
  
            
            <TextInput placeholder='email' value={email} onChangeText={email => setEmail(email)}></TextInput>
            <TextInput placeholder='password' secureTextEntry={true} value={password} onChangeText={password => setPassword(password)}></TextInput>
  
            <Button title='Log In' onPress={ ()=> handleLogin() } />
  
          </View>

    );


  }

  const fetchTodo = async()=>{
    // check if email is verified or not
    try {
      const response = await fetch(
        'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/login', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
         
        }

      );
      const json = await response.json();

     

      



    } catch (error) {
      console.error(error);
    }


  }
  const handleComplete = async()=>{
    // check if email is verified or not
    try {
      const response = await fetch(
        'https://6gksn8nxyh.execute-api.us-east-1.amazonaws.com/prod/login', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
         
        }

      );
      const json = await response.json();

     

      



    } catch (error) {
      console.error(error);
    }


  }


  const todoPage = () =>{
    return (

          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <ScrollView>
              {
              todosList.map((todo, index)=>
              {
                return 
                <View key={index}>
                    <Text>{todo.name}</Text>

                    { todo.completedAt ? <Text>Complete</Text>: <Button onPress={()=> handleComplete()}>Mark as Complete</Button>}

                </View>
              }
              
              
              )}



            </ScrollView>
            
            <TextInput placeholder='Add To Do' value={taskName} onChangeText={taskName => setTaskName(taskName)}></TextInput>
          
            <Button title='Log In' onPress={ ()=> handleAddTask() } />
  
          </View>
       
    );



  }

  const verifyEmailPage = ()=>{

  }


   return (
    <SafeAreaView style={backgroundStyle}>
    <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {
          showLogin ? loginPage() : todoPage() 

        }

        
       

      </View>
    </ScrollView>
  </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
