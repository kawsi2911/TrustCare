import Header from "../Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function FamilyRegister(){

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        fullName:"",
        nic:"",
        contactNumber:"",
        email:"",
        gender:"",
        address:"",
        city:""
    });

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleNext = async ()=>{

        try{

            const res = await fetch("http://localhost:5000/api/family/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            });

            const data = await res.json();

            alert(data.message);

            navigate("/servicetaken");

        }catch(err){
            console.log(err);
            alert("Error submitting form");
        }
    };

    return(
        <div>

            <Header/>

            <div className='ServiceSection'>
                <div className='Service_container'>

                    <p className='para'>Service Taker Registration </p>

                    <div className='form'>
                        <div className='form-fill'>

                            <div className='row'>
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your Full Name"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='row'>
                                <label>NIC Number *</label>
                                <input
                                    type="text"
                                    name="nic"
                                    placeholder="Enter the NIC"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='row'>
                                <label>Contact Number *</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    placeholder="+94 77 123 4567"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='row'>
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='row'>
                                <label>Gender *</label>

                                <div className='gender-options'>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        onChange={handleChange}
                                    /> Male

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        onChange={handleChange}
                                    /> Female

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        onChange={handleChange}
                                    /> Other

                                </div>
                            </div>

                            <div className='row'>
                                <label>Full Address *</label>

                                <textarea
                                    name="address"
                                    placeholder="Enter your complete address"
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className='row'>
                                <label>City / Location *</label>

                                <input
                                    type="text"
                                    name="city"
                                    placeholder="eg. Jaffna"
                                    onChange={handleChange}
                                />
                            </div>

                            <button className='next' onClick={handleNext}>
                                Next Step
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default FamilyRegister;