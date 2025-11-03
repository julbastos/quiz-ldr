import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Text } from 'react-native';
import Home from './screens/home';
import Quiz from './screens/quiz';
import Ranking from './screens/ranking';
import Curiosidades from './screens/curiosidades';
import Sobre from './screens/sobre';
import { tema } from './styles/tema_estilos';


export default function App() {
  const [telaAtual, setTelaAtual] = useState('Home');
  

  
  const aoNavegar = (telaAlvo) => {
    setTelaAtual(telaAlvo);
  };

  const renderizarTela = () => {
    switch (telaAtual) {
      case 'Quiz':
        return <Quiz aoNavegar={aoNavegar} />;
      case 'Ranking':
        return <Ranking aoNavegar={aoNavegar} />;
      case 'Curiosidades':
        return <Curiosidades aoNavegar={aoNavegar} />;
      case 'Sobre':
        return <Sobre aoNavegar={aoNavegar} />;
      case 'Home':
      default:
        return <Home aoNavegar={aoNavegar} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: tema.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={tema.bg} />
      {renderizarTela()}
    </SafeAreaView>
  );
}
