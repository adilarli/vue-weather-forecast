# Weather Forecast App - Vue, Webpack, Gulp

Vue based weather forecast app.

## Installation

``` bash

$ git clone https://github.com/adilarli/vue-weather-forecast.git
$ cd vue-weather-forecast/

# install dependencies
$ npm i

# development
$ npm run dev

# build
$ npm run build

```
## Development
- `npm run dev`: Webpack
- `npm run build`: Webpack + Gulp  build project ./dist


## Directory Structure

```
.
├── LICENSE
├── README.md
├── src
│   ├── assets
│   │   └── scss
│   │       ├── app.scss
│   │       ├── _mixins.scss
│   │       ├── _normalize.scss
│   │       └── _variable.scss
│   ├── views
│   │   ├──components
│   │   │   ├── City.vue
│   │   │   ├── CityDetail.vue
│   │   │   └──  WeatherList.vue
│   │   └── App.vue
│   ├── index.html
│   └── index.js
├── config
│   └── webpack.config.js
├── .babelrc
├── .gitignore
└── package.json
```

# License

MIT
