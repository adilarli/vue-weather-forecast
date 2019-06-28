<template>
    <div class="container">
        <City name="İstanbul"/>
        <City name="Antalya"/>
        <City name="İzmir"/>
        <City name="Ankara"/>
        <City name="Muğla"/>
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
