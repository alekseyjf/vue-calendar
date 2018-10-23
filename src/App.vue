<template lang="pug">
  #app
    .calendar
      header.calendar__header
        .active-day
          .active-day__num 20
          .active-day__mounth 09
          .active-day__year 2018
        form
          input(type="text")

      main.calendar__main
        day-components()
</template>

<script>

  import DayComponents from './components/day'

  export default {
    components: {
      'day-components': DayComponents
    },
    name: 'app',
    data() {
      return {
        moment: moment,
        msg: 'Welcome to Your Vue App Alex',
        ms: 'vue-loader',
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  * {
    box-sizing: border-box;
  }

  .calendar__header {
    display: flex;
  }

  .active-day {
    display: flex;
  }

  .active-day__num,
  .active-day__mounth,
  .active-day__year {
    display: flex;
    font-size: 16px;
    text-align: left;
  }

  .active-day__num,
  .active-day__mounth {
    width: 25px;
  }

  .active-day__year {
    width: 40px;
  }
</style>
