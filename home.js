import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { tema, estilos } from '../styles/tema_estilos';
import { ativarVibracao } from '../services/funcoes_service';

export default function Home({ aoNavegar }) {
  const handleNavegar = (tela) => {
    ativarVibracao();
    aoNavegar(tela);
  };

  return (
    <ScrollView 
      style={estilos.fundo} 
      contentContainerStyle={estilos.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header com ícone e títulos */}
      <View style={estilos.headerContainer}>
        <Text style={estilos.tituloPrincipal}>LANA DEL REY</Text>
        <Text style={estilos.tituloSecundario}>QUIZ</Text>
        <View style={estilos.divisorNeon} />
        <Text style={estilos.subtitulo}>
          Teste seu conhecimento sobre a Lana del Rey
        </Text>
      </View>

      {/* Banner Image com overlay elegante */}
      <View style={estilos.bannerContainer}>
        <Image 
          source={{ uri: 'https://akamai.sscdn.co/uploadfile/letras/fotos/2/1/3/b/213b739c1418a77f39d4719787d6a03d.jpg' }}
          style={estilos.bannerImagem}
          resizeMode="cover"
        />
        <View style={estilos.bannerOverlay}>
        </View>
      </View>

      {/* Card com botões principais */}
      <View style={estilos.cardPrincipal}>
        {/* Botão Iniciar Quiz */}
        <TouchableOpacity 
          style={estilos.botaoPrimario} 
          onPress={() => handleNavegar('Quiz')}
          activeOpacity={0.8}
        >
          <View style={estilos.botaoConteudo}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.textoBotaoPrimario}>Iniciar Quiz</Text>
              <Text style={estilos.botaoSubtexto}>Prove seu conhecimento</Text>
            </View>
          </View>
        </TouchableOpacity>
        
        {/* Botão Ranking */}
        <TouchableOpacity 
          style={estilos.botaoSecundario} 
          onPress={() => handleNavegar('Ranking')}
          activeOpacity={0.8}
        >
          <View style={estilos.botaoConteudo}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.textoBotaoSecundario}>Ranking do Quiz</Text>
              <Text style={estilos.botaoSubtextoSecundario}>Veja os melhores</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Grid de botões secundários */}
      <View style={estilos.gridBotoes}>
        <TouchableOpacity 
          style={estilos.botaoGrid} 
          onPress={() => handleNavegar('Curiosidades')}
          activeOpacity={0.8}
        >
          <Text style={estilos.botaoGridTexto}>Curiosidades</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={estilos.botaoGrid} 
          onPress={() => handleNavegar('Sobre')}
          activeOpacity={0.8}
        >
          <Text style={estilos.botaoGridTexto}>Sobre</Text>
        </TouchableOpacity>
      </View>

      
    </ScrollView>
  );
}