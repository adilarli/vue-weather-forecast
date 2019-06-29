import Vue from 'vue'
import App from './views/App'

function statusControl(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
}

Vue.config.productionTip = false;

const apiKey='b712b9a9b0785a9842d7c7ba49f37a5f';
const apiLang='tr';
const apiUnits='metric';
const dateNames=['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

new Vue({
    data() {
        return {
            selectedCity: null,
        };
    },
    methods: {
        prepareImage: function (icon) {
            const imageUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            return imageUrl
        },
        getDailyWeather: function (cityName) {

            // Günlük hava durumu tahmini
            return  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${apiLang}&units=${apiUnits}&appid=${apiKey}`)
                .then(statusControl)
                .then(response => response.json())
                .catch(function (ex) {
                    console.log('parsing failed', ex)
                })
        },
        getFiveDaysWeather: function (cityName) {

            // Beş günlük hava durumu tahmini
            return  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&lang=${apiLang}&units=${apiUnits}&appid=${apiKey}`)
                .then(statusControl)
                .then(response => response.json())
                .catch(function (ex) {
                    console.log('parsing failed', ex)
                })
        },
        getDayName: function (date) {

            // Haftanın günlerinin Türkçeye çevirilmesi
            date = new Date(date *1000); // JS TimeStamp convert Ms
            const currentDay = date.getDay();
            return dateNames[currentDay]

        },
        getNextFiveDays: function () {

            // Günün başlangıcının timestamp versiyonu
            var start = new Date();
            start.setHours(0,0,0);

            // Günün sonunun timestamp versiyonu
            var end = new Date();
            end.setHours(23,59,0);


            let nextFiveDays = [];
            // Önümüzdeki beş günün başlangıç ve bitişinin timestamp versiyonları
            for (let i = 1; i <= 5; i++) {
                let day = {start:null, end:null};
                day["start"] = Math.floor(start / 1000) + (86400 * i);
                day["end"] = Math.floor(end / 1000) + (86400 * i);

                nextFiveDays.push(day);
            }
            return nextFiveDays
        }
    },
    render: h => h(App),
}).$mount('#app')
