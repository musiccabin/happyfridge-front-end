import * as firebase from 'firebase'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDTT-jqR8WC5SESmfercWiPTMRZtFbZ_pU',
  authDomain: 'happy-fridge-bb712.firebaseapp.com',
  projectId: 'happy-fridge-bb712',
  storageBucket: 'happy-fridge-bb712.appspot.com',
  messagingSenderId: '330042999844',
  appId: '1:330042999844:web:e4ebb47e2ddb4cb35cc4b1',
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

export { auth }
