<template lang="pug">
  #app
    .calendar
      header.calendar__header
        .active-day {{day.toDay}}
        form
          input(type="text")

      main.calendar__main
        ul.calendar__list
          day-components(@giveDay="currentDay")
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
        msg: 'Welcome to Your Vue App Alex',
        ms: 'vue-loader',
        day: ''
      }
    },
    methods: {
      currentDay(date){
        this.day = date
      }
    },
    comenents: {
      day: {
        tamplate: '#day'
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
