import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ProceedLogin = () => {
    if (validation()) {
      fetch(`http://localhost:3000/users?email=${email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          return res.json();
        })
        .then((resp) => {
          if (resp.length === 0) {
            Alert.alert('Error', 'Please enter a valid user');
          } else {
            let found = false;
            resp.forEach(user => {
              if (user.password === password) {
                navigation.navigate('HomePage');
                found = true;
              }
            });
            if (!found) {
              Alert.alert('Error', 'Please enter valid credentials');
            }
          }
        })
        .catch((err) => {
          Alert.alert('Login failed', err.message);
        });
    }
  };

  const validation = () => {
    let result = true;
    if (!email) {
      result = false;
      Alert.alert("Validation Error", "Please enter your email");
    }
    if (!password) {
      result = false;
      Alert.alert("Validation Error", "Please enter your password");
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: "https://your-image-link.jpg" }} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Submit" onPress={ProceedLogin} />
        <TouchableOpacity onPress={() => navigation.navigate('RegistrationPage')}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 250,
    borderRadius: 10,
  },
  formContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});