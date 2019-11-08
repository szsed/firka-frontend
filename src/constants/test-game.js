export const testUser = {
  id: 11,
  username: 'batman',
  display_name: 'Bruce Wayne',
  victories: 3,
  avatar: 'asd.jpg',
}

export const testGame = {
  id: 'kjshfdkjhdsfjkdsf',
  name: 'Test Game Name',
  players: [
    {
      ...testUser,
      word: 'kutyálmajom',
      drawing: null,
      guesses: [],
      score: 0,
    },
    {
      ...testUser,
      word: 'strucc',
      drawing: null,
      guesses: [],
      score: 0,
    },
    {
      ...testUser,
      word: 'pumpa',
      drawing: null,
      guesses: [],
      score: 0,
    },
  ],
  status: 'lobby',
};

export const testGameList = [
  testGame,
  testGame,
  testGame,
];
