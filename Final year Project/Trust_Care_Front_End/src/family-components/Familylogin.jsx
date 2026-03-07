import React from 'react';
import Header from '../Header/Header.jsx';
import { useNavigate } from "react-router-dom"; 
import { Link } from "react-router-dom";


function Familylogin(){

    const navigate = useNavigate();

    return(
        <>
            <Header/>
        
            <div className='ServiceProviderSection'>
                <div className='ServiceContainer'>

                      <div className = 'forms'>
                        <div className = 'forms-fill'>

                            <div className='Heading-row'>
                                <p className='Heading'> Service Taken Login</p>
                                <span className='Subbody'>Find Trusted Caregivers for Your Loved Ones</span>
                            </div>

                            <div className = 'row'>
                                <label htmlFor = 'username'> User Name : <span className = 'star'>*</span></label>
                                <input type = 'text' id = 'username' name = 'username' placeholder = 'Enter your username' />
                            </div>

                            <div className = 'row'>
                                <label htmlFor = 'passwords'> Password : <label className = 'star'> * </label> </label>
                                <input type = 'password' id = 'passwords' name = 'passwords' placeholder = 'Enter your password' />
                            </div>

                            <div className = 'row'>
                                <input type = 'checkbox' id = 'check' name = 'check'/> <p className="checked">Remeber Me</p>
                            </div>

                            <button className = 'next' onClick={()=>navigate("/familyhome")} > Login </button>

                            <p className='forgotpassword'><a href = ''> Forgot Password ? </a> </p>
                            <p className='account'> Dont have a account ? <Link to="/familyregister"> Register as Service Taker</Link></p>
                            
                        </div>
                    </div>

                </div>
            </div>
        
        </>
    )

}

export default Familylogin;