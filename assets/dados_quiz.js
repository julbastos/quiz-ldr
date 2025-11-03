export const DADOS_QUIZ = {
    easy: [
      {
       type: 'text',

       question: 'Qual é o nome verdadeiro de Lana Del Rey?',

       options: ['Lana Wilson', 'May Jailer', 'Elizabeth Grant', 'Lizzy Pop'], 
       answer: 'Elizabeth Grant' },

      { 
        type: 'image',
        question: 'De qual álbum é esta capa? ',
        image: 'https://uploads.tracklist.com.br/file/uploads-tracklist-com-br/2022/01/lanaa.jpg',
        options: ['Lust for Life', 'Honeymoon', 'Born to Die', 'Ultraviolence'], answer: 'Born to Die' 
      },
      { 
        type: 'text',
        question: 'Complete a letra: "I just..."',
        options: ['Like', 'Run', 'Ride', 'Hate you'],
        answer: 'Ride'
      },
    ],
    medium: [
      { 
        type: 'music',
        question: 'Adivinhe a música pela melodia:',
         song: 'Video Games',
         options: ['Born to Die',
         'Video Games',
         'Blue Jeans',
         'Summertime Sadness'],
          answer: 'Video Games' 
      },
      { type: 'text',
        question: 'Qual álbum não foi produzido por Jack Antonoff?',
        options: ['Norman Fucking Rockwell!','Chemtrails Over the Country Club','Ultraviolence','Did you know that there\'s a tunnel...'],
        answer: 'Ultraviolence' 
      },
      
      { type: 'image',
        question: 'Esta imagem é de qual era? ',
        image: 'https://i1.sndcdn.com/artworks-000205836996-mqfn8o-t500x500.jpg',
        options: ['Honeymoon','Ultraviolence','Lust for Life','Paradise'],
        answer: 'Ultraviolence' 
      },
    ],

    hard: [
      { type: 'music',
        question: 'Adivinhe qual é a musica:',
        song: 'Say Yes to Heaven',
        options: ['Paris, Texas','Kinda Outta Luck','Say Yes to Heaven','A&W'],
        answer: 'Say Yes to Heaven' 
      },
      { type: 'text',
        question: 'Qual é o nome do livro de poesia lançado por Lana Del Rey?',
        options: ['Behind the Iron Gates','Violet Bent Backwards Over the Grass','My Crying Doves','The Land of 1,000 Fires'],
        answer: 'Violet Bent Backwards Over the Grass' 
      },
      { type: 'text',
        question: 'Qual foi o primeiro nome artístico de Lana Del Rey antes de "May Jailer"?',
        options: ['Sparkle Jump Rope Queen','Lizzy Grant','Lana Del Ray','Elizabeth Grant and the Phenomena'],
        answer: 'Sparkle Jump Rope Queen' 
      },
    ],

  };
