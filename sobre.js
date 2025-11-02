import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { estilos, tema } from '../styles/tema_estilos';
import { ativarVibracao } from '../services/funcoes_service';

export default function Sobre({ aoNavegar }) {
  return (
    <ScrollView 
      style={estilos.fundo}
      contentContainerStyle={stylesLocal.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={stylesLocal.container}>
        {/* Header */}
        <View style={stylesLocal.headerContainer}>
          <Text style={stylesLocal.titulo}>SOBRE O PROJETO</Text>
          <View style={stylesLocal.divisor} />
        </View>

        {/* Card Principal */}
        <View style={stylesLocal.cardPrincipal}>
          {/* Seção: Desenvolvedor */}
          <View style={stylesLocal.secao}>
            <Text style={stylesLocal.secaoTitulo}>Desenvolvedora</Text>
            <Text style={stylesLocal.textoNormal}>
              Tenho <Text style={stylesLocal.destaque}>20 anos</Text> e estou cursando{' '}
              <Text style={stylesLocal.destaque}>Ciência da Computação</Text>.
            </Text>
            <Text style={stylesLocal.textoNormal}>
              Este projeto foi desenvolvido para a disciplina de{' '}
              <Text style={stylesLocal.destaque}>Desenvolvimento de Aplicação Móvel</Text>.
            </Text>
          </View>

          {/* Seção: Tecnologias */}
          <View style={stylesLocal.secao}>
            <Text style={stylesLocal.secaoTitulo}>Tecnologias Utilizadas</Text>
            <View style={stylesLocal.techItem}>
              <Text style={stylesLocal.techBullet}>•</Text>
              <Text style={stylesLocal.textoNormal}>
                <Text style={stylesLocal.destaque}>React Native</Text> - Framework principal
              </Text>
            </View>
            <View style={stylesLocal.techItem}>
              <Text style={stylesLocal.techBullet}>•</Text>
              <Text style={stylesLocal.textoNormal}>
                <Text style={stylesLocal.destaque}>AsyncStorage</Text> - Armazenamento local
              </Text>
            </View>
            <View style={stylesLocal.techItem}>
              <Text style={stylesLocal.techBullet}>•</Text>
              <Text style={stylesLocal.textoNormal}>
                <Text style={stylesLocal.destaque}>Vibração</Text> - Feedback nas interações
              </Text>
            </View>
          </View>

          {/* Seção: Features */}
          <View style={stylesLocal.secao}>
            <Text style={stylesLocal.secaoTitulo}>Funcionalidades</Text>
            <Text style={stylesLocal.textoNormal}>
              • Quiz interativo{'\n'}
              • Sistema de pontuação e ranking{'\n'}
              • Curiosidades sobre a artista{'\n'}
              • Vibração em interações
            </Text>
          </View>
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity 
          style={stylesLocal.botaoVoltar}
          onPress={() => { 
            ativarVibracao(50); 
            aoNavegar('Home'); 
          }}
          activeOpacity={0.8}
        >
          <Text style={stylesLocal.textoBotaoVoltar}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const stylesLocal = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  
  // Header
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
    width: '100%',
  },
  titulo: {
    fontSize: 32,
    fontWeight: '700',
    color: tema.text,
    textAlign: 'center',
    letterSpacing: 3,
    opacity: 0.95,
  },
  divisor: {
    width: 80,
    height: 2,
    backgroundColor: tema.primary,
    marginTop: 10,
    borderRadius: 10,
    opacity: 0.6,
  },

  // Card Principal
  cardPrincipal: {
    width: '100%',
    backgroundColor: tema.card,
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: tema.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  // Seções
  secao: {
    marginBottom: 25,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: tema.primary,
    marginBottom: 12,
    opacity: 0.95,
  },
  textoNormal: {
    fontSize: 14,
    color: tema.textSecundario,
    lineHeight: 22,
    opacity: 0.9,
  },
  destaque: {
    fontWeight: '700',
    color: tema.text,
  },

  // Tecnologias
  techItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  techBullet: {
    fontSize: 20,
    color: tema.primary,
    marginRight: 10,
    marginTop: -2,
  },

  // Botão Voltar
  botaoVoltar: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: tema.primary,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotaoVoltar: {
    color: tema.bg,
    fontSize: 15,
    fontWeight: '700',
  },
});