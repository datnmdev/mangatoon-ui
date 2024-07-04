import { getAuth, signInWithPopup } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import firebaseApp from "./firebaseApp"

const provider = new GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('https://www.googleapis.com/auth/user.birthday.read')
provider.addScope('https://www.googleapis.com/auth/user.gender.read')

const auth = getAuth(firebaseApp)
auth.languageCode = 'it'

export default function signInWithGoogle() {
    return signInWithPopup(auth, provider)
}