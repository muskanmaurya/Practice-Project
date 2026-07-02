import {createContext, useContext, useEffect , useState, type ReactNode} from 'react';
import type { AppContextType, LocationData, User } from '../types.ts';
import axios from 'axios';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps{  //we need to create an interface for the props of the AppProvider component, which will include a children prop of type ReactNode. This allows us to pass any valid React element as a child to the AppProvider component.
    children: ReactNode;
}

export const AppProvider = ({children}: AppProviderProps)=>{  
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const [location, setLocation] = useState<LocationData | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [city, setCity] = useState("Fetching location....");

    async function fetchUser(){
        try{

            const token = localStorage.getItem("token");
            
            const {data} = await axios.get(`http://localhost:8000/api/auth/me`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            setUser(data);
            setIsAuth(true);
            
        }catch(error){
            console.log(error);
            // setUser(null);
            // setIsAuth(false);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
    }, [])

    return <AppContext.Provider value={{user, isAuth, loading, setIsAuth, setLoading, setUser}}>{children}</AppContext.Provider>

}

export const useAppData = (): AppContextType  =>{
    const context = useContext(AppContext);
    if(!context){
        throw new Error("useAppData must be used within an AppProvider");
    }
    return context;
}