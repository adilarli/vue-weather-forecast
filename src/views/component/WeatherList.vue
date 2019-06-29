<template>
    <div class="container">
        <City name="Stockholm"/>
        <City name="Amsterdam"/>
        <City name="Paris"/>
        <City name="Oslo"/>
        <City name="Londra"/>
    </div>
</template>

<script>
    import City from './City'

    export default {
        name: 'WeatherList',
        components: {
            City
        }
    }
</script>
