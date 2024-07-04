import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import firebaseApp from "./firebaseApp"

const provider = new FacebookAuthProvider()
provider.addScope('email')

const auth = getAuth(firebaseApp)
auth.languageCode = 'it'

export default function signInWithFacebook() {
    return signInWithPopup(auth, provider)
}
