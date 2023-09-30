import { onAuthStateChanged } from "@firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  showModalForm: boolean;
  setShowModalForm?: any;
  handleInfoUser: ({name, email, uid}: UserProps) => void;
  user: UserProps | null;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider({children}: AuthProviderProps ){
  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [ showModalForm, setShowModalForm ] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user){
        ///Tem user logado...
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email
        })
        setLoadingAuth(false)
      }else{
        //nao tem user logado...
        setUser(null)
        setLoadingAuth(false)
      }
    })

    return () => {
      unsub()
    }
  },[])

  function handleInfoUser({name, email, uid}: UserProps){
    setUser({
      name,
      email,
      uid,
    })
  }


  return (
    <AuthContext.Provider
    value={{
      signed: !!user,
      loadingAuth,
      handleInfoUser,
      user,
      showModalForm,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
