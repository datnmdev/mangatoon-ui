import { getAuth } from "firebase/auth"
import firebaseApp from "./firebaseApp"

const auth = getAuth(firebaseApp)

export default function signOut() {
    return auth.signOut()
}
