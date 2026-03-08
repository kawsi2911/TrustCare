import Header from "../Header/Header.jsx";
import { useNavigate } from "react-router-dom";
import "./familyRegister.css";
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

    const [errors, setErrors] = useState({});

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault = {};

        let newErros = {};

        if(!formData.fullName.trim()){
            newErros.fullName = "Full Name is Required";
        }

        if(!formData.nic.trim()){
            newErros.nic = "NIC is Required";
        }

        if(!formData.contactNumber.trim()){
            newErros.contactNumber = "Contact Number is Required";
        }

        if(!formData.email.trim()){
            newErros.email = "Email is Required";
        }

        if(!formData.gender.trim()){
            newErros.gender = "Gender is Selected";
        }

        if(!formData.address.trim()){
            newErros.address = "Address is Required";
        }

        if(!formData.city.trim()){
            newErros.city = "City is Required";
        }

        setErrors(newErros);

        if(Object.keys(newErros).length === 0){
            console.log("Form Submitted", formData);
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
                                
                                {errors.fullName && (
                                    <div className="error-box">{errors.fullName}</div>
                                )}
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

                            <button className='next' onClick={handleChange}>
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