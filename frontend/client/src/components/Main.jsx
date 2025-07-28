import React from 'react'
import "./Main.css"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
const Main = () => {
const navigate=useNavigate()
const {setIsOpen,isLoggedIn,setIsLoggedIn} = useContext(AuthContext)

const setLogin=()=>{
    if(isLoggedIn){
        navigate('/')
    }else{
        setIsOpen(true)
    }
}
return (
    <div>
        <div className="main-section">
            <div className="main-content">
                <h1 className="main-title">Welcome to Sweet delight Bakery!</h1>
                <p className="main-desc">
                    Indulge in our freshly baked delights. Sign in to explore exclusive treats, special offers, and more!
                </p>
                <button onClick={setLogin} className="login-btn">
                    Login to Your Account
                </button>
            </div>
            <div className="main-visuals">
                <div className="animated-img cake"></div>
                <div  className="animated-img bread"></div>
                <div className="animated-img pastry"></div>
            </div>
            
        </div>
    </div>
)
}

export default Main