import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { tema } from '../styles/tema_estilos';
import { ativarVibracao } from '../services/funcoes_service';
import listaCuriosidades from '../assets/dados_curiosidades';

export default function Curiosidades({ aoNavegar }) {

  const handleVoltar = () => {
    ativarVibracao();
    aoNavegar('Home');
  };

  return (
    <ScrollView 
      style={styles.fundo}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titulo}>CURIOSIDADES</Text>
          <Text style={styles.tituloSecundario}>Lana Del Rey</Text>
          <View style={styles.divisor} />
          <Text style={styles.subtitulo}>
            Fatos sobre a artista
          </Text>
        </View>

        {/* Lista de Curiosidades */}
        <View style={styles.listaContainer}>
          {listaCuriosidades.map((curiosidade, index) => (
            <View key={curiosidade.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.numeroContainer}>
                  <Text style={styles.cardNumero}>{index + 1}</Text>
                </View>
                <Text style={styles.cardTitulo}>{curiosidade.titulo}</Text>
              </View>
              <Text style={styles.cardTexto}>{curiosidade.texto}</Text>
            </View>
          ))}
        </View>

        {/* Botão Voltar */}
        <TouchableOpacity 
          style={styles.botaoVoltar} 
          onPress={handleVoltar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: tema.bg,
  },
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
    fontSize: 38,
    fontWeight: '700',
    color: tema.text,
    textAlign: 'center',
    letterSpacing: 4,
    opacity: 0.95,
  },
  tituloSecundario: {
    fontSize: 28,
    fontWeight: '600',
    color: tema.primary,
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: -5,
    opacity: 0.9,
  },
  divisor: {
    width: 100,
    height: 2,
    backgroundColor: tema.primary,
    marginVertical: 12,
    borderRadius: 10,
    opacity: 0.6,
  },
  subtitulo: {
    fontSize: 15,
    color: tema.textSecundario,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 22,
    opacity: 0.85,
  },

  // Lista
  listaContainer: {
    width: '100%',
    marginBottom: 20,
  },

  // Cards
  card: {
    backgroundColor: tema.card,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: tema.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  numeroContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: tema.cardClaro,
    borderWidth: 1.5,
    borderColor: tema.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardNumero: {
    fontSize: 16,
    fontWeight: '700',
    color: tema.primary,
    opacity: 0.95,
  },
  cardTitulo: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: tema.text,
    lineHeight: 24,
    opacity: 0.95,
  },
  cardTexto: {
    fontSize: 14,
    color: tema.textSecundario,
    lineHeight: 22,
    opacity: 0.9,
  },

  // Botão Voltar
  botaoVoltar: {
    marginTop: 10,
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