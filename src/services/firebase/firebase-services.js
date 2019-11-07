import firestoreDB from "./firebase-setup";

export const createGameListListener = () => {
  return firestoreDB.where('status', '==', 'lobby').onSnapshot(querySnapshot => {
    console.log(querySnapshot.docs)
    console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  });
}

export const createCurrentGameListener = gameId => {
  return firestoreDB.doc(gameId).onSnapshot(doc => {
    console.log(doc.metadata.hasPendingWrites ? "Local" : "Server", doc.id, doc.data())
  });
}

export const addGameToFirestore = gameData => {
  firestoreDB.add(gameData);
}

export const sendImageToFirestore = imgData => {

}


// firestoreDB.doc('Un0CHdNeWqgy9pBUMzrq').onSnapshot(doc => {
//   console.log(doc.metadata.hasPendingWrites ? "Local" : "Server", doc.id, doc.data())
// });

// const handleAdd = () => firestoreDB.add({
//   cica: 'yes',
//   hello: 'world'
// }).then(thing => console.log('HI', thing));

// const handleSet = () => firestoreDB.doc('Un0CHdNeWqgy9pBUMzrq').set({
//   cica: 'no',
//   hello: 'world'
// }).then(thing => console.log('HI', thing));