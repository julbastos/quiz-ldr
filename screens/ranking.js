import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { tema } from '../styles/tema_estilos';
import { ativarVibracao } from '../services/funcoes_service';

export default function Ranking({ aoNavegar }) {
  const [rankings, setRankings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false); // Estado para o modal de confirmação
  const CHAVE_RANKING = '@LanaDelReyQuizRanking';

  // Função para carregar o ranking (agora chamada sob demanda)
  const carregarRanking = async () => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem(CHAVE_RANKING);
      
      if (dadosArmazenados) {
        const lista = JSON.parse(dadosArmazenados);
        
        // Ordena por pontuação (maior para menor)
        lista.sort((a, b) => b.pontuacao - a.pontuacao);
        setRankings(lista);
      } else {
        setRankings([]);
      }
    } catch (erro) {
      console.error("Erro ao carregar ranking:", erro);
    }
  };

  useEffect(() => {
    carregarRanking();
  }, []); 

  const executarReset = async () => {
    try {
      await AsyncStorage.removeItem(CHAVE_RANKING);
      setRankings([]);
      setShowConfirm(false);
    } catch (erro) {
      console.error("Erro ao resetar ranking:", erro);
      setShowConfirm(false); 
    }
  };

  const resetarRanking = () => {
    ativarVibracao();
    setShowConfirm(true);
  };


  const renderizarItem = ({ item, index }) => (
    <View style={[
      styles.itemContainer,
      index === 0 && styles.itemPrimeiro,
      index === 1 && styles.itemSegundo,
      index === 2 && styles.itemTerceiro
    ]}>
      <View style={styles.itemEsquerda}>
        <Text style={styles.posicao}>#{index + 1}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.nome}>
            {item.nomeUsuario || 'Anônimo'}
          </Text>
          <Text style={styles.dificuldade}>
            {item.dificuldade === 'easy' ? 'Fácil' : item.dificuldade === 'medium' ? 'Médio' : 'Difícil'}
          </Text>
        </View>
      </View>
      <Text style={styles.pontuacao}>
        {item.pontuacao} pts
      </Text>
    </View>
  );

  const ConfirmationModal = () => (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitulo}>Confirmar Reset</Text>
        <Text style={styles.modalMensagem}>
          Tem certeza que deseja apagar todo o ranking?
        </Text>
        <View style={styles.modalBotoes}>
          <TouchableOpacity 
            style={[styles.modalBotao, styles.modalBotaoCancelar]} 
            onPress={() => setShowConfirm(false)}
          >
            <Text style={[styles.modalTextoBotao, { color: tema.text }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modalBotao, styles.modalBotaoResetar]} 
            onPress={executarReset}
          >
            <Text style={[styles.modalTextoBotao, { color: tema.bg }]}>Resetar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titulo}>RANKING</Text>
        <Text style={styles.subtitulo}>Pontuações mais altas.</Text>
        <View style={styles.divisor} />
      </View>
      
      {rankings.length === 0 ? (
        <View style={styles.vazioContainer}>
          <Text style={[styles.mensagemVazia, { color: tema.text }]}>
            Nenhuma pontuação registrada ainda.
          </Text>
          <Text style={[styles.mensagemVaziaSecundaria, { color: tema.textSecundario }]}>
          </Text>
        </View>
      ) : (
        <FlatList
          data={rankings}
          renderItem={renderizarItem}
          keyExtractor={(_, index) => index.toString()}
          style={styles.lista}
          contentContainerStyle={styles.listaContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.botoesContainer}>
        {/* Botão de Reset Condicional */}
        {rankings.length > 0 && (
          <TouchableOpacity 
            style={[styles.botaoReset, { borderColor: tema.error }]} 
            onPress={resetarRanking}
            activeOpacity={0.8}
          >
            <Text style={[styles.textoBotaoReset, { color: tema.error }]}>Resetar Ranking</Text>
          </TouchableOpacity>
        )}
        
        {/* Botão Voltar */}
        <TouchableOpacity 
     
          style={[styles.botaoVoltar, { backgroundColor: tema.primary, width: '40%' }]} 
          onPress={() => aoNavegar('Home')}
          activeOpacity={0.8}
        >
          <Text style={[styles.textoBotaoVoltar, { color: tema.bg }]}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
      
      {/* Renderiza o Modal de Confirmação se showConfirm for true */}
      {showConfirm && <ConfirmationModal />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tema.bg,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  titulo: {
    fontSize: 36,
    fontWeight: '700',
    color: tema.text, 
    textAlign: 'center',
    letterSpacing: 4,
    opacity: 0.95,
  },
  subtitulo: {
    fontSize: 14,
    color: tema.textSecundario,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.85,
  },
  divisor: {
    width: 80,
    height: 2,
    backgroundColor: tema.primary, 
    marginTop: 10,
    borderRadius: 10,
    opacity: 0.6,
  },
  lista: {
    flex: 1,
  },
  listaContent: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: tema.card,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: tema.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemPrimeiro: {
    backgroundColor: tema.cardClaro,
    borderColor: '#FFD700', 
    borderWidth: 2,
  },
  itemSegundo: {
    backgroundColor: tema.cardClaro,
    borderColor: '#C0C0C0', 
    borderWidth: 1.5,
  },
  itemTerceiro: {
    backgroundColor: tema.cardClaro,
    borderColor: '#CD7F32', 
    borderWidth: 1.5,
  },
  itemEsquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  posicao: {
    fontSize: 20,
    fontWeight: 'bold',
    color: tema.neon,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  nome: {
    fontSize: 17,
    color: tema.text,
    fontWeight: '600',
    marginBottom: 3,
  },
  dificuldade: {
    fontSize: 12,
    color: tema.textSecundario,
    fontStyle: 'italic',
  },
  pontuacao: {
    fontSize: 18,
    fontWeight: '700',
    color: tema.primary,
  },
  vazioContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  mensagemVazia: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  mensagemVaziaSecundaria: {
    textAlign: 'center',
    fontSize: 14,
    fontStyle: 'italic',
  },
  botoesContainer: {
    marginTop: 15,
    gap: 8, 
    width: '100%',
    alignItems: 'center',
  },
  botaoReset: {
    backgroundColor: 'transparent',
    paddingVertical: 10, 
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    width: '80%', 
  },
  textoBotaoReset: {
    fontSize: 13, 
    fontWeight: '600',
  },
  botaoVoltar: {
    paddingVertical: 10, 
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotaoVoltar: {
    fontSize: 13, 
    fontWeight: '700',
  },
  
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContainer: {
    backgroundColor: tema.card,
    borderRadius: 15,
    padding: 25,
    width: '85%',
    maxWidth: 400,
    elevation: 20,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: tema.neon,
    marginBottom: 10,
  },
  modalMensagem: {
    fontSize: 15,
    color: tema.text,
    marginBottom: 25,
  },
  modalBotoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  modalBotao: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  modalBotaoCancelar: {
    backgroundColor: tema.textSecundario,
  },
  modalBotaoResetar: {
    backgroundColor: tema.error,
  },
  modalTextoBotao: {
    fontSize: 15,
    fontWeight: '600',
    color: tema.bg,
  }
});
