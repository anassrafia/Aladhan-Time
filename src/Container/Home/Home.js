import { useEffect, useState } from "react";
import './Home.css';
import axios from "axios";
import Footer from './FOOTER/Footer';


const Home = () => {

    useEffect(() => {
        if (localStorage.getItem('FormLoc') !== 'true') {
            window.parent.location = '/';
        }
    }, []);

    const [times, settimes] = useState([]);


    useEffect(() => {
        function formatDate(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        }

        const today = new Date();
        const formattedDate = formatDate(today);


        const locationNow = localStorage.getItem('Location');
        localStorage.setItem('linkAdhan', `https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${locationNow}`);
        axios.get(`https://api.aladhan.com/v1/timingsByAddress/${formattedDate}?address=${locationNow}`)
            .then(adhan => settimes(adhan.data.data.timings))
    }, []);


    useEffect(() => {
        const hadit = [
            'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا',
            'صلُّوا كما رأيتموني أُصلِّي',
            'إذا دخل أحدكم المسجد فلْيركع ركعتين قبل أن يجلس',
            'إذا سجدتَ فضع كفيك، وارفع مِرْفقيك',
            'إني إمامكُم فلا تسبقوني بالركوع والسجود',
            'أول ما يُحاسب به العبد يوم القيامة الصلاة فإن صلحت صلح سائر عمله، وإن فسدت فسد سائر عمله'
        ]

        let indexHadit = Math.floor(Math.random() * 6);
        document.querySelector('.hadit').textContent = hadit[indexHadit];
    }, [])

    return (

        <>
            <div className="HomeApp">
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">{localStorage.getItem('Location')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Fajr</td>
                            <td>{times.Fajr}</td>
                            <td>الفجر</td>
                        </tr>

                        <tr>
                            <td>Chorouq</td>
                            <td>{times.Sunrise}</td>
                            <td>الشروق</td>
                        </tr>

                        <tr>
                            <td>Dhuhr</td>
                            <td>{times.Dhuhr}</td>
                            <td>الضهر</td>
                        </tr>

                        <tr>
                            <td>Asr</td>
                            <td>{times.Asr}</td>
                            <td>العصر</td>
                        </tr>

                        <tr>
                            <td>Maghrib</td>
                            <td>{times.Maghrib}</td>
                            <td>المغرب</td>
                        </tr>

                        <tr>
                            <td>Isha</td>
                            <td>{times.Isha}</td>
                            <td>العشاء</td>
                        </tr>


                        <tr>
                            <td colSpan="3" className="hadit">

                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>

            <Footer/>

        </>
    );
}

export default Home;
