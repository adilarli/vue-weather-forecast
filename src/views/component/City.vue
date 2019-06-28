<template>
    <!-- Tıklanan şehir set ediliyor ve active class'ı ekliyoruz-->
    <div class="city" @click="$root.selectedCity=name" v-bind:class="{ active: $root.selectedCity===name }">
        <div class="city_wrapper">
            <div class="city_summary">
                <div class="city_statusImage"  >
                    <img :src="statusImage" alt="">
                </div>
                <span class="city_title">{{name}}</span>
                <div class="city_status">
                    <span class="city_temp" v-if="temp">{{temp}}°</span>
                    <span class="city_windSpeed" v-if="windSpeed > 0">Rüzgar {{windSpeed}} km/s</span>
                </div>
            </div>
            <CityDetail :name="name" v-if="$root.selectedCity===name"/>
        </div>
    </div>
</template>

<script>
    import CityDetail from './CityDetail'

    export default {
        name: 'city',
        data() {
            return {
                temp: null,
                windSpeed: null,
                statusImage: null
            };
        },
        props: {
            name
        },
        components: {
            CityDetail
        },
        created() {
            const self = this;
            self.$root.getDailyWeather(self.name)
            // Günün tahminini çekiyoruz.
               .then(function (data) {
                if (data !== undefined && data.cod === 200) { // Data kontrolü ve api result kontrolü
                    self.temp = Math.round(data.main.temp);   // Günün hava sıcaklığının ondalık kısmını yuvarlıyoruz.
                    self.windSpeed = data.wind.speed;  // Günün rüzgar hızı.
                    self.statusImage = self.$root.prepareImage(data.weather[0].icon); // Günün hava durumu iconunu alıyoruz.
                }

            })
        }
    }
</script>
