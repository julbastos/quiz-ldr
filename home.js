import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';

export default function Home({ navigation }) {
  const handlePress = (screen) => {
    Vibration.vibrate(80); // vibração rápida
    navigation.navigate(screen); // navega para a tela certa
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lana Del Rey Quiz 💋</Text>
      <Text style={styles.subtitle}>Descubra o quanto você sabe sobre a Lana Del Rey!</Text>

      <TouchableOpacity style={styles.button} onPress={() => handlePress('Quiz')}>
        <Text style={styles.buttonText}>Jogar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePress('Ranking')}>
        <Text style={styles.buttonText}>Ranking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePress('Curiosidades')}>
        <Text style={styles.buttonText}>Curiosidades</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePress('Sobre')}>
        <Text style={styles.buttonText}>Sobre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#f8bbd0', 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#880e4f', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#ad1457', 
    textAlign: 'center', 
    marginBottom: 30 
  },
  button: { 
    backgroundColor: '#d81b60', 
    paddingVertical: 12, 
    borderRadius: 10, 
    marginVertical: 5,
    width: '70%',       
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});
