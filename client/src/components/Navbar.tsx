import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useAppData } from "../context/AppContext";
import { useState, useEffect } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { BiMapPin, BiSearch } from "react-icons/bi";

const Navbar = () => {
    const{isAuth} = useAppData(); //this is a custom hook that returns the context value of the AppContext. It is used to check if the user is authenticated or not.
    const currLocation = useLocation();  //this is a hook that returns the current location object. It is used to check if the user is on the home page or not.
    //we only want searcch params in our homepage only. So we will check if the user is on the home page or not. If the user is on the home page, we will show the search bar. If the user is not on the home page, we will hide the search bar.
    const isHomePage = currLocation.pathname === "/";  //this is a boolean that checks if the user is on the home page or not. It is used to conditionally render the search bar.

    const [searchParams, setSearchParams] = useSearchParams(); //this is a hook that returns the current search params object and a function to update it. It is used to get and set the search query in the URL.
    
    const [search, setSearch] = useState(searchParams.get("search") || "")//this is a state that holds the current search query. It is initialized with the value of the search param in the URL or an empty string if there is no search param.

    useEffect(()=>{  //this is a hook that runs when the component mounts and when the search state changes. It is used to update the search param in the URL when the user types in the search bar.
      const timer = setTimeout(()=>{  //this is a timer that delays the execution of the function by 400 milliseconds. It is used to prevent excessive updates to the search param in the URL when the user types in the search bar.
        //this is a conditional statement that checks if the search state is not empty. If it is not empty, it sets the search param in the URL to the value of the search state. If it is empty, it removes the search param from the URL.
        if(search){  
            setSearchParams({search})
        }else {
            setSearchParams({search: ""})
        }
      }, 400)
      return  () => clearTimeout(timer) //this is a cleanup function that clears the timer when the component unmounts or when the search state changes. It is used to prevent memory leaks and unnecessary updates to the search param in the URL.
    },[search]) //this is the dependency array that tells the hook to run when the search state changes. It is used to update the search param in the URL when the user types in the search bar.

  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4">
        <div className="mx-auto flex items-center max-w-7xl justify-betweenpx-4 py-3">
            <Link to={'/'} className="text-2xl font-bold text-[#E23744]">FeastDash</Link>
            <div className="flex items-center gap-4">
                <Link to={'/cart'} className='relative'>
                <CgShoppingCart className="text-2xl h-6 w-6 text-gray-700 hover:text-[#E23744]" />
                <span className="absolute -top-2 -right-2 bg-[#E23744] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span></Link>
                {
                    isAuth? <Link to={'/account'} className="text-gray-700 hover:text-[#E23744]">Account</Link> : <Link to={'/login'} className="text-gray-700 hover:text-[#E23744]">Login</Link>
                }
            </div>
        </div>
        {/* searchbar */}
        {
            isHomePage && (<div className="mx-auto flex max-w-7xl items-center rounded-lg border shadow-sm">
                <div className="flex items-center gap-2 px-3 border-r text-gray-700">
                    <BiMapPin className="h-5 w-5 text-[#E23744]" />
                    <span className="text-gray-700 text-sm truncate max-w-35">City</span>
                </div>
                <div className="flex flex-1 items-center gap-2 px-3">
                    <BiSearch className="h-5 w-5 text-gray-700" />
                    <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="w-full outline-none text-sm text-gray-700" value={search} onChange={(e)=>setSearch(e.target.value)} />
                </div>
            </div>)
        }
        
    </div>
  )
}

export default Navbar