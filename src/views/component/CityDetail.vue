<template>
    <div class="fiveDay" v-if="forecast != null">
        <div class="fiveDay_day" :key="i" v-for="(item, i) in forecast" v-if="item.day">
            <div class="fiveDay_date">{{item.day}}</div>
            <div class="fiveDay_weather"><img :src=$root.prepareImage(item.icon)></div>
            <div class="fiveDay_max">{{item.tempMax}}°</div>
            <div class="fiveDay_min">{{item.tempMin}}°</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CityDetail',
        data() {
            return {
                forecast: []
            };
        },
        props: {
            name: null
        },
        created() {
            const self = this;
            self.$root.getFiveDaysWeather(self.name)
                .then(function (data) {

                    const nextFiveDays = self.$root.getNextFiveDays(); // Beş günün timestamplerini çekiyoruz.
                    nextFiveDays.forEach(function (value) {

                        let thisDay = {day: null, tempMin: null, tempMax: null};

                        // Günün tahminlerini filtreliyoruz.
                        const result = data.list.filter(item => {
                            return item.dt > value.start && item.dt < value.end;
                        });

                        result.forEach(function (value, i) {
                            // Sonuçlar içerisinden günün en düşük ve en yüksek değerlerini buluyoruz.
                            let _tempMax = value.main.temp_max;
                            let _tempMin = value.main.temp_min;

                            if (thisDay["tempMin"] === null || thisDay["tempMin"] > _tempMin) {
                                thisDay["tempMin"] = Math.round(_tempMin);
                            }

                            if (thisDay["tempMax"] === null || thisDay["tempMax"] < _tempMax) {
                                thisDay["tempMax"] = Math.round(_tempMax);
                            }


                            if (result.length >= 3) {
                                // Tüm günün tahmini var mı kontrol ediyoruz.
                                if (i === 2) {
                                    // Günün orta değerinin hava tahmin iconunu alıyoruz.
                                    thisDay["icon"] = value.weather[0].icon;
                                }
                            } else {
                                thisDay["icon"] = value.weather[0].icon;
                            }

                            if (i === 0) {
                                // Günün ismini alıyoruz.
                                thisDay["day"] = self.$root.getDayName(value.dt);
                            }
                        });
                        setTimeout(function () {
                            // Yükleniyor animasyonun hatalı gibi görünmemesi için yarım saniye gecikme ile gösteriyoruz.
                            self.forecast.push(thisDay);

                        }, 500)
                    });
                })
        }
    }
</script>
