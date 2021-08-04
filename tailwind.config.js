module.exports = {
  mode: "jit",
  purge: [
    './src/index.html',
    './src/*.js',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      blue:{
        100: '#858697',
        200: '#707286',
        300: '#5C5E75',
        400: '#474A63',
        500: '#333652',
        600: '#2E314A',
        700: '#292C42',
        800: '#25273C',
        900: '#212336'
      },
      yellow:{
        100: '#FCE380',
        200: '#FCDE6B',
        300: '#FBD956',
        400: '#FBD541',
        500: '#FAD02C',
        600: '#E1BB28',
        700: '#CAA824',
        800: '#B69820',
        900: '#A4881D'
      },
      teal:{
        100: '#BCCEDD',
        200: '#B1C6D7',
        300: '#A6BDD1',
        400: '#9BB5CC',
        500: '#90ADC6',
        600: '#829CB2',
        700: '#758CA0',
        800: '#697E90',
        900: '#5E7282'
      },
      gray:{
        100: '#F2F2F4',
        200: '#F0F0F2',
        300: '#EDEEF0',
        400: '#EBECEE',
        500: '#E9EAEC',
        600: '#D2D3D4',
        700: '#BDBEBF',
        800: '#AAABAC',
        900: '#999A9B'
      }
    },
     fontFamily: {
       'sans': ['Karla'],
       'serif': ['STIX Two Text']
      },
    extend: {},
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
}
