<template>
    <div>
        <WeatherList/>
    </div>
</template>

<script>
    import WeatherList from './component/WeatherList'

    export default {
        components: {
            WeatherList
        }
    }
</script>

<style lang="sass">
    @import "../assets/scss/app"
</style>

