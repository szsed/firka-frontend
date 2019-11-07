export const testUser = {
  id: 'batman',
  name: 'Bruce Wayne',
  img: 'asd.jpg'
}

export const testGame = {
  name: 'Test Game Name',
  players: [
    {
      ...testUser,
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
