import { React, useRef, useState } from 'react'
import logo from '../../../images/LOGOWHITE.png'
import './Footer.css'

const Footer = () => {

    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const closeSettings = () => {
        setShowSettings(!showSettings);
    };

    const city = localStorage.getItem("Location");

    const newCity = useRef();
    const newlanguage = useRef();

    const changeCity = () => {
        localStorage.setItem("Location", newCity.current.value);
        window.parent.location = '';
    }

    const changeLang = () => {
        localStorage.setItem("Language", newlanguage.current.value);
        window.parent.location = '';
    }



    return (
        <footer style={{ position: "absolute", bottom: "0", background: "#2f4c94b8" }} className='d-flex flex-nowrap justify-content-between align-items-center border-top'>
            <div className='col-md-4 d-flex align-items-center'>
                <img src={logo} className='w-25' alt='aladhan time' />
            </div>

            <h1 onClick={toggleSettings} className='m-4 text-white'><i className='fa fa-cog'></i></h1>

            <div className={`settings ${showSettings ? 'visible' : ''}`}>
                <h2><i onClick={closeSettings} className='fa fa-close text-white p-3'></i></h2>

                <div className='col-md-4 m-auto w-75 d-flex align-items-center'>
                    <input ref={newCity} type='text' defaultValue={city} className="form-select w-75 text-black m-auto" placeholder={localStorage.getItem('Language') === "English" ? "Enter the location" : "حدد الموقع"} />
                    <button onClick={changeCity} className='btn m-auto text-white w-25 btn-outline-light'><i className='fa fa-plus'></i></button>
                </div>

                <div className='col-md-4 m-auto w-75 mt-3 d-flex align-items-center'>
                    <select ref={newlanguage} style={{ background: "rgb(0 0 0 / 61%)" }} className="form-select w-75 text-white m-auto" aria-label="Default select example">
                        <option style={{ background: "rgb(0 0 0 / 61%)" }} className='w-50'>العربية</option>
                        <option style={{ background: "rgb(0 0 0 / 61%)" }} className='w-50'>English</option>
                    </select>
                    <button onClick={changeLang} className='btn m-auto text-white w-25 btn-outline-light'><i className='fa fa-plus'></i></button>
                </div>
            </div>

        </footer>
    )
}

export default Footer