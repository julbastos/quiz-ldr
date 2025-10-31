import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas
import Home from './screens/home';
import Quiz from './screens/quiz';
import Ranking from './screens/ranking';
import Curiosidades from './screens/curiosidades';
import Sobre from './screens/sobre';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Lana Del Rey Quiz 💋' }} 
        />
        <Stack.Screen name="Quiz" component={Quiz} options={{ title: 'Quiz' }} />
        <Stack.Screen name="Ranking" component={Ranking} options={{ title: 'Ranking' }} />
        <Stack.Screen name="Curiosidades" component={Curiosidades} options={{ title: 'Curiosidades' }} />
        <Stack.Screen name="Sobre" component={Sobre} options={{ title: 'Sobre' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
