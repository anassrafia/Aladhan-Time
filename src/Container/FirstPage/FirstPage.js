import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './FirstPage.css'

const FirstPage = () => {

    const language = useRef();

    useEffect(() => {
        const formLang = document.getElementById('formLang');
        const formLoc = document.getElementById('formLoc');

        if (localStorage.getItem('formLang') === 'true' && formLang) {
            formLang.remove();
            if (formLoc) {
                formLoc.className = 'formLang d-block w-100';
            }
        }
    }, []);

    const [ipAddress, setipAddress] = useState([]);

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            setipAddress(ipAddress);
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });


    const apiKey = '0344ad3af2c9c3';

    const apiUrl = `https://ipinfo.io/${ipAddress}/json?token=${apiKey}`;

    const [city, setcity] = useState("");

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            setcity(data.city)
        })
        .catch(error => {
            console.error('Error fetching location information:', error);
        });



    const nextLanguage = () => {
        localStorage.setItem('Language', language.current.value);
        localStorage.setItem('formLang', 'true');
        window.parent.location = "";
    }

    const locationCity = useRef();

    const nextLocation = () => {
        localStorage.setItem('Location', locationCity.current.value);
        localStorage.setItem('FormLoc', 'true');
        window.parent.location = "/Home";
    }

    useEffect(() => {
        if (localStorage.getItem('FormLoc') === 'true') {
            window.parent.location = '/Home';
        }
    }, []);

    return (
        <>
            <div className='backImg'>
                <div id='formLang' className='formLang d-block w-100'>
                    <h2 className='msgWelcome'>{localStorage.getItem('Language') === "English" ? "Welcome" : "مرحبا"}</h2>
                    <select ref={language} style={{ background: "rgb(0 0 0 / 61%)" }} className="form-select w-75 text-white m-auto" aria-label="Default select example">
                        <option style={{ background: "rgb(0 0 0 / 61%)" }} className='w-50'>العربية</option>
                        <option style={{ background: "rgb(0 0 0 / 61%)" }} className='w-50'>English</option>
                    </select>

                    <button onClick={nextLanguage} style={{ background: "rgb(0 0 0 / 61%)" }} type="button" className="btn btn-outline-light d-block text-white m-auto mt-2">
                        <i className='fa fa-arrow-left'></i>
                    </button>
                </div>

                {/* this is the place of location */}

                <div id='formLoc' className='formLang d-none w-100'>
                    <h2 className='msgWelcome'>{localStorage.getItem('Language') === "English" ? "Select the location" : "حدد الموقع"}</h2>
                    <input ref={locationCity} type="text" style={{ background: "rgb(0 0 0 / 61%)" }} defaultValue={city} className="form-select w-75 text-white m-auto" placeholder={localStorage.getItem('Language') === "English" ? "Enter the location" : "حدد الموقع"} />

                    <button onClick={nextLocation} style={{ background: "rgb(0 0 0 / 61%)" }} type="button" className="btn btn-outline-light d-block text-white m-auto mt-2">
                        <i className='fa fa-arrow-left'></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default FirstPage
