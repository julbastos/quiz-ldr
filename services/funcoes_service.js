import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from "react-native";
import { Audio } from "expo-av";

const CHAVE_RANKING = "@LanaDelReyQuizRanking";

// Objeto para armazenar a instância do áudio atual
let soundObject = null;
let onMusicaTerminouCallback = null;

// Mapeamento das músicas para os arquivos MP3
const MUSICAS_MAP = {
  "Video Games": require("../media/musicas/Video_Games.mp3"),
  "Say Yes to Heaven": require("../media/musicas/Say_Yes_To_Heaven.mp3"),
};

// Função para ativar vibração
export const ativarVibracao = (duracao = 50) => {
  try {
    Vibration.vibrate(duracao);
  } catch (erro) {
    console.log("Vibração não disponível:", erro);
  }
};

// Função para tocar som (você pode implementar com bibliotecas como expo-av)
export const tocarSom = (tipo) => {
  // Implementar com biblioteca de áudio se necessário
  console.log(`Som ${tipo} tocado`);
};

// Função para tocar melodia de música
export const tocarMelodiaMusica = async (musica, onTerminar = null) => {
  try {
    // Se já existe um som tocando, para e descarrega
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
    }

    // Armazena o callback
    onMusicaTerminouCallback = onTerminar;

    // Verifica se a música existe no mapeamento
    const arquivoMusica = MUSICAS_MAP[musica];
    if (!arquivoMusica) {
      console.log(`Música "${musica}" não encontrada`);
      return;
    }

    // Configura o modo de áudio
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    // Cria e carrega o som
    const { sound } = await Audio.Sound.createAsync(arquivoMusica, {
      shouldPlay: true,
      isLooping: false,
      volume: 0.8,
    });

    soundObject = sound;

    // Configura callback para quando a música terminar
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
        soundObject = null;

        // Chama o callback se existir
        if (onMusicaTerminouCallback) {
          onMusicaTerminouCallback();
          onMusicaTerminouCallback = null;
        }
      }
    });

    console.log(`Tocando: ${musica}`);
  } catch (erro) {
    console.error("Erro ao tocar música:", erro);
  }
};

// Função para parar a música atual
export const pararMusica = async () => {
  try {
    if (soundObject) {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
      soundObject = null;
      onMusicaTerminouCallback = null;
      console.log("Música parada");
    }
  } catch (erro) {
    console.error("Erro ao parar música:", erro);
  }
};

// Função CORRIGIDA para salvar pontuação no AsyncStorage
export const salvarPontuacaoLocalmente = async (
  nomeUsuario,
  pontuacao,
  dificuldade
) => {
  try {
    // 1. Buscar o ranking atual
    const dadosExistentes = await AsyncStorage.getItem(CHAVE_RANKING);

    // 2. Criar array de rankings (vazio se não existir nada)
    let rankings = [];
    if (dadosExistentes) {
      rankings = JSON.parse(dadosExistentes);
    }

    // 3. Criar novo registro de pontuação
    const novaPontuacao = {
      nomeUsuario: nomeUsuario.trim(),
      pontuacao: pontuacao,
      dificuldade: dificuldade,
      data: new Date().toISOString(),
    };

    // 4. Adicionar a nova pontuação ao array
    rankings.push(novaPontuacao);

    // 5. Ordenar por pontuação (maior para menor)
    rankings.sort((a, b) => b.pontuacao - a.pontuacao);

    // 6. Opcional: Limitar a 50 melhores pontuações
    if (rankings.length > 50) {
      rankings = rankings.slice(0, 50);
    }

    // 7. Salvar de volta no AsyncStorage
    await AsyncStorage.setItem(CHAVE_RANKING, JSON.stringify(rankings));

    console.log("Pontuação salva com sucesso!");
    console.log("Nova pontuação:", novaPontuacao);
    console.log("Total de registros:", rankings.length);

    return true;
  } catch (erro) {
    console.error("Erro ao salvar pontuação:", erro);
    return false;
  }
};

// Função auxiliar para debugar o ranking
export const debugRanking = async () => {
  try {
    const dados = await AsyncStorage.getItem(CHAVE_RANKING);
    console.log("=== DEBUG RANKING ===");
    console.log("Dados brutos:", dados);
    if (dados) {
      const rankings = JSON.parse(dados);
      console.log("Rankings parseados:", rankings);
      console.log("Total de registros:", rankings.length);
    } else {
      console.log("Nenhum dado encontrado");
    }
  } catch (erro) {
    console.error("Erro no debug:", erro);
  }
};
