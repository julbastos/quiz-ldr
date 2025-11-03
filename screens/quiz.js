import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { estilos, tema } from "../styles/tema_estilos";
import { DADOS_QUIZ } from "../assets/dados_quiz";
import {
  ativarVibracao,
  tocarMelodiaMusica,
  tocarSom,
  salvarPontuacaoLocalmente,
  pararMusica,
} from "../services/funcoes_service";

export default function Quiz({ aoNavegar }) {
  const [dificuldade, setDificuldade] = useState(null);
  const [perguntas, setPerguntas] = useState([]);
  const [indicePerguntaAtual, setIndicePerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [estaEnviando, setEstaEnviando] = useState(false);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [musicaTocando, setMusicaTocando] = useState(null);

  // Limpa o áudio quando o componente é desmontado
  useEffect(() => {
    return () => {
      pararMusica();
    };
  }, []);

  // Inicia o quiz
  const iniciarQuiz = (nivel) => {
    ativarVibracao(50);
    setDificuldade(nivel);
    
    // Garantir que DADOS_QUIZ[nivel] existe
    const perguntasDoNivel = DADOS_QUIZ[nivel] || [];
    setPerguntas(perguntasDoNivel);
    
    setIndicePerguntaAtual(0);
    setPontuacao(0);
    setQuizFinalizado(false);
    setFeedback("");
    setOpcaoSelecionada(null);
  };

  const aoTocarMusica = async (nomeMusica) => {
    setMusicaTocando(nomeMusica); // Ainda usamos o nome para o estado
    // Passa callback para fechar o modal quando a música terminar
    await tocarMelodiaMusica(nomeMusica, () => {
      setMusicaTocando(null);
    });
  };

  const aoPararMusica = async () => {
    await pararMusica();
    setMusicaTocando(null);
  };

  // Responde uma pergunta
  const aoResponder = (opcao) => {
    if (feedback) return;

    ativarVibracao(20);
    setOpcaoSelecionada(opcao);

    // Para a música se estiver tocando
    if (musicaTocando) {
      aoPararMusica();
    }

    const perguntaAtual = perguntas[indicePerguntaAtual];

    if (opcao === perguntaAtual.answer) {
      setPontuacao((prev) => prev + 1);
      setFeedback("correct");
      tocarSom("correct");
    } else {
      setFeedback("wrong");
      tocarSom("wrong");
    }

    setTimeout(() => {
      setFeedback("");
      setOpcaoSelecionada(null);
      if (indicePerguntaAtual < perguntas.length - 1) {
        setIndicePerguntaAtual((prev) => prev + 1);
      } else {
        setQuizFinalizado(true);
      }
    }, 1500);
  };

  // Salva o score no AsyncStorage
  const aoSalvarPontuacao = async () => {
    if (!nomeUsuario.trim()) return;
    setEstaEnviando(true);
    ativarVibracao(100);

    const sucesso = await salvarPontuacaoLocalmente(
      nomeUsuario,
      pontuacao,
      dificuldade
    );

    setEstaEnviando(false);
    if (sucesso) {
      aoNavegar("Ranking");
    } else {
      Alert.alert("Erro", "Erro ao salvar pontuação.");
    }
  };

  // --- TELA: Seleção de Dificuldade ---
  if (!dificuldade) {
    return (
      <View style={stylesLocal.container}>
        <View style={stylesLocal.cardSelecao}>
          <Text style={stylesLocal.tituloSelecao}>Escolha o Nível</Text>
          <Text style={stylesLocal.subtituloSelecao}>
            Qual é o seu nível de fã?
          </Text>
          <View style={stylesLocal.divisorSelecao} />

          <TouchableOpacity
            style={[stylesLocal.botaoDificuldade, stylesLocal.botaoFacil]}
            onPress={() => iniciarQuiz("easy")} // Nível "easy"
            activeOpacity={0.8}
          >
            <View style={stylesLocal.nivelInfo}>
              <Text style={stylesLocal.textoDificuldade}>Fácil</Text>
              <Text style={stylesLocal.subtextoDificuldade}>
                3 perguntas básicas
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[stylesLocal.botaoDificuldade, stylesLocal.botaoMedio]}
            onPress={() => iniciarQuiz("medium")} // Nível "medium"
            activeOpacity={0.8}
          >
            <View style={stylesLocal.nivelInfo}>
              <Text style={stylesLocal.textoDificuldade}>Médio</Text>
              <Text style={stylesLocal.subtextoDificuldade}>
                3 perguntas intermediárias
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[stylesLocal.botaoDificuldade, stylesLocal.botaoDificil]}
            onPress={() => iniciarQuiz("hard")} // Nível "hard"
            activeOpacity={0.8}
          >
            <View style={stylesLocal.nivelInfo}>
              <Text style={stylesLocal.textoDificuldade}>Difícil</Text>
              <Text style={stylesLocal.subtextoDificuldade}>
                3 perguntas desafiadoras
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesLocal.botaoVoltar}
            onPress={() => aoNavegar("Home")}
            activeOpacity={0.8}
          >
            <Text style={stylesLocal.textoVoltar}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- TELA: Fim do Quiz ---
  if (quizFinalizado) {
    const totalPerguntas = perguntas.length > 0 ? perguntas.length : 1; // Evita divisão por zero
    const porcentagem = Math.round((pontuacao / totalPerguntas) * 100);
    let mensagem = "";

    if (porcentagem === 100) {
      mensagem = "Você realmente sabe tudo"; 
    } else if (porcentagem >= 70) {
      mensagem = "Muito bem! Você conhece bastante!";
    } else if (porcentagem >= 50) {
      mensagem = "Nada mal!";
    } else {
      mensagem = "Precisa ouvir mais musicas!";
    }

    return (
      <View style={stylesLocal.container}>
        <View style={stylesLocal.cardFim}>
          <Text style={stylesLocal.tituloFim}>Quiz Finalizado!</Text>
          <View style={stylesLocal.resultadoContainer}>
            <Text style={stylesLocal.pontuacaoFinal}>{pontuacao}</Text>
            <Text style={stylesLocal.separadorFinal}>/</Text>
            <Text style={stylesLocal.totalFinal}>{perguntas.length}</Text>
          </View>
          <Text style={stylesLocal.porcentagemTexto}>
            {porcentagem}% de acertos
          </Text>
          <Text style={stylesLocal.mensagemFinal}>{mensagem}</Text>

          <View style={stylesLocal.divisorFim} />

          <TextInput
            placeholder="Digite seu nome"
            placeholderTextColor={tema.textFraco}
            style={stylesLocal.inputNome}
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
          />

          <TouchableOpacity
            style={[
              stylesLocal.botaoSalvar,
              { opacity: estaEnviando || !nomeUsuario.trim() ? 0.5 : 1 },
            ]}
            onPress={aoSalvarPontuacao}
            disabled={estaEnviando || !nomeUsuario.trim()}
            activeOpacity={0.8}
          >
            {estaEnviando ? (
              <ActivityIndicator color={tema.bg} />
            ) : (
              <Text style={stylesLocal.textoSalvar}>Salvar no Ranking</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={stylesLocal.botaoVoltarFim}
            onPress={() => aoNavegar("Home")}
            activeOpacity={0.8}
          >
            <Text style={stylesLocal.textoVoltarFim}>← Voltar para Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // --- TELA: Carregando (Se as perguntas ainda não carregaram) ---
  if (perguntas.length === 0 || !perguntas[indicePerguntaAtual]) {
    return (
      <View style={stylesLocal.container}>
        <ActivityIndicator size="large" color={tema.primary} />
        <Text style={{ color: tema.text, marginTop: 10 }}>Carregando Quiz...</Text>
      </View>
    );
  }

  const perguntaAtual = perguntas[indicePerguntaAtual];
  const { type, question, options, image, song } = perguntaAtual;

  return (
    <ScrollView
      style={stylesLocal.scrollContainer}
      contentContainerStyle={stylesLocal.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          stylesLocal.cardQuiz,
          feedback === "correct" && stylesLocal.cardCorreto,
          feedback === "wrong" && stylesLocal.cardErrado,
        ]}
      >
        {/* Header */}
        <View style={stylesLocal.headerQuiz}>
          <Text style={stylesLocal.progressoTexto}>
            Pergunta {indicePerguntaAtual + 1}/{perguntas.length}
          </Text>
          <Text style={stylesLocal.pontosTexto}>{pontuacao} pts</Text>
        </View>

        {/* Pergunta */}
        <Text style={stylesLocal.perguntaTexto}>{question}</Text>

        {/* Imagem */}
        {type === "image" && (
          <Image source={{ uri: image }} style={stylesLocal.imagemQuiz} />
        )}

        {/* Botão de Música */}
        {type === "music" && (
          <TouchableOpacity
            style={stylesLocal.botaoMelodia}
            onPress={() => aoTocarMusica(song)}
            activeOpacity={0.8}
            disabled={!!musicaTocando}
          >
            <Text style={stylesLocal.textoMelodia}>
              {musicaTocando ? "Tocando..." : "Tocar Música"}
            </Text>
          </TouchableOpacity>
        )}

        {/* Modal de Música Tocando (CORRIGIDO) */}
        <Modal
          visible={!!musicaTocando}
          transparent={true}
          animationType="fade"
          onRequestClose={aoPararMusica}
        >
          <View style={stylesLocal.modalOverlay}>
            <View style={stylesLocal.modalConteudo}>
              <View style={stylesLocal.modalHeader}>
                {/* Ícone removido, texto alterado */}
                <Text style={stylesLocal.modalStatus}>Tocando...</Text>
              </View>

              {/* REMOVIDO: O texto que mostrava o nome da música */}
              {/* <Text style={stylesLocal.modalNomeMusica}>{musicaTocando}</Text> */}

              <Text style={stylesLocal.modalAjuda}>
                Preste atenção para adivinhar o título da música!
              </Text>

              <TouchableOpacity
                style={stylesLocal.botaoFecharModal}
                onPress={aoPararMusica}
                activeOpacity={0.8}
              >
                <Text style={stylesLocal.textoFecharModal}>Parar Música</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Opções */}
        <View style={stylesLocal.opcoesContainer}>
          {options.map((opcao, indice) => {
            const estaSelecionada = opcaoSelecionada === opcao;
            const estaCorreta = opcao === perguntaAtual.answer;
            const mostrarFeedback = !!feedback;

            let estiloOpcao = stylesLocal.opcaoBase;
            let textoIcone = "";

            if (mostrarFeedback) {
              if (estaCorreta) {
                estiloOpcao = stylesLocal.opcaoCorreta;
                textoIcone = "✓";
              } else if (estaSelecionada && !estaCorreta) {
                estiloOpcao = stylesLocal.opcaoErrada;
                textoIcone = "✗";
              } else {
                estiloOpcao = stylesLocal.opcaoDesabilitada;
              }
            }

            return (
              <TouchableOpacity
                key={indice}
                style={estiloOpcao}
                onPress={() => aoResponder(opcao)}
                disabled={!!feedback}
                activeOpacity={0.8}
              >
                <Text style={stylesLocal.textoOpcao}>{opcao}</Text>
                {textoIcone && (
                  <Text style={stylesLocal.iconeResposta}>{textoIcone}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tema.bg,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: tema.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  // SELEÇÃO DE DIFICULDADE
  cardSelecao: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: tema.card,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: tema.border,
  },

  tituloSelecao: {
    fontSize: 32,
    fontWeight: "700",
    color: tema.text,
    textAlign: "center",
    opacity: 0.95,
  },
  subtituloSelecao: {
    fontSize: 14,
    color: tema.textSecundario,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 5,
    opacity: 0.85,
  },
  divisorSelecao: {
    width: 80,
    height: 2,
    backgroundColor: tema.primary,
    marginVertical: 20,
    opacity: 0.6,
  },
  botaoDificuldade: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  botaoFacil: {
    backgroundColor: "rgba(136, 181, 163, 0.15)",
    borderColor: tema.success,
  },
  botaoMedio: {
    backgroundColor: "rgba(212, 186, 138, 0.15)",
    borderColor: tema.warning,
  },
  botaoDificil: {
    backgroundColor: "rgba(201, 138, 138, 0.15)",
    borderColor: tema.error,
  },
  iconeNivel: { // Estilo não utilizado no JSX fornecido, mas mantido
    fontSize: 28,
    marginRight: 15,
  },
  nivelInfo: {
    flex: 1,
  },
  textoDificuldade: {
    fontSize: 18,
    fontWeight: "700",
    color: tema.text,
    opacity: 0.95,
  },
  subtextoDificuldade: {
    fontSize: 12,
    color: tema.textSecundario,
    marginTop: 2,
    opacity: 0.8,
  },
  botaoVoltar: {
    marginTop: 15,
    paddingVertical: 10,
  },
  textoVoltar: {
    color: tema.textSecundario,
    fontSize: 14,
    opacity: 0.8,
  },

  // FIM DO QUIZ
  cardFim: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: tema.card,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: tema.border,
  },

  tituloFim: {
    fontSize: 28,
    fontWeight: "700",
    color: tema.primary,
    marginBottom: 20,
    opacity: 0.95,
  },
  resultadoContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 8,
  },
  pontuacaoFinal: {
    fontSize: 48,
    fontWeight: "800",
    color: tema.text,
  },
  separadorFinal: {
    fontSize: 36,
    color: tema.textSecundario,
    marginHorizontal: 8,
  },
  totalFinal: {
    fontSize: 32,
    color: tema.textSecundario,
  },
  porcentagemTexto: {
    fontSize: 18,
    color: tema.primary,
    fontWeight: "600",
    marginBottom: 10,
    opacity: 0.9,
  },
  mensagemFinal: {
    fontSize: 15,
    color: tema.textSecundario,
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.85,
  },
  divisorFim: {
    width: 100,
    height: 2,
    backgroundColor: tema.primary,
    marginVertical: 20,
    opacity: 0.5,
  },
  inputNome: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    backgroundColor: tema.cardClaro,
    borderWidth: 1,
    borderColor: tema.border,
    color: tema.text,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 15,
  },
  botaoSalvar: {
    width: "100%",
    backgroundColor: tema.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  textoSalvar: {
    color: tema.bg,
    fontSize: 16,
    fontWeight: "700",
  },
  botaoVoltarFim: {
    paddingVertical: 12,
  },
  textoVoltarFim: {
    color: tema.textSecundario,
    fontSize: 14,
    opacity: 0.8,
  },

  cardQuiz: {
    width: "100%",
    backgroundColor: tema.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: tema.border,
  },
  cardCorreto: {
    borderColor: tema.success,
    shadowColor: tema.success,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  cardErrado: {
    borderColor: tema.error,
    shadowColor: tema.error,
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  headerQuiz: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  progressoTexto: {
    fontSize: 13,
    color: tema.primary,
    fontWeight: "600",
    opacity: 0.9,
  },
  pontosTexto: {
    fontSize: 13,
    color: tema.textSecundario,
    fontWeight: "600",
    opacity: 0.8,
  },
  perguntaTexto: {
    fontSize: 19,
    fontWeight: "700",
    color: tema.text,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 26,
    opacity: 0.95,
  },
  imagemQuiz: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: tema.border,
  },
  botaoMelodia: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tema.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "center",
  },

  textoMelodia: {
    color: tema.bg,
    fontSize: 15,
    fontWeight: "700",
  },
  opcoesContainer: {
    width: "100%",
    gap: 10,
  },
  opcaoBase: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: tema.primary,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textoOpcao: {
    color: tema.text,
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    opacity: 0.95,
  },
  opcaoCorreta: {
    backgroundColor: "rgba(136, 181, 163, 0.3)",
    borderColor: tema.success,
    borderWidth: 2,
  },
  opcaoErrada: {
    backgroundColor: "rgba(201, 138, 138, 0.3)",
    borderColor: tema.error,
    borderWidth: 2,
  },
  opcaoDesabilitada: {
    backgroundColor: "transparent",
    borderColor: tema.border,
    opacity: 0.4,
  },
  iconeResposta: {
    fontSize: 18,
    fontWeight: "700",
    color: tema.text,
    marginLeft: 10,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalConteudo: {
    backgroundColor: tema.card,
    borderRadius: 24,
    padding: 30,
    width: "90%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  
 

  modalStatus: {
    fontSize: 20,
    fontWeight: "700",
    color: tema.primary,
    marginBottom: 10,
  },

  modalAjuda: {
    fontSize: 15,
    color: tema.textSecundario,
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
    opacity: 0.9,
    fontStyle: "italic",
  },
  
 
  
  botaoFecharModal: {
    width: "100%",
    backgroundColor: tema.error,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  textoFecharModal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
