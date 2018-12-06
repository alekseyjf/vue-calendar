<template lang="pug">
  #app
    calendar-component
      //header.calendar__header




      //main.calendar__main
        day-component(@giveDay="currentDay" @activeDay="activeDay")
</template>

<script>
  import calendarComponent from './components/calendar';
  import dayComponent from './components/day'

  export default {

    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue App Alex',
        ms: 'vue-loader',
        day: '',
        month: this.moment().format('MMMM')
      }
    },
    methods: {
      /*currentDay(date){
        this.day = date.toDay
      },
      prevMonth(){
        console.log(1);
      }*/
    },
    components: {
      'day-component': dayComponent,
      'calendar-component': calendarComponent
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

  .btn{
    margin: 0 8px;
  }

  .calendar__header {
    display: flex;
    align-items: center;
  }

  .active-day {
    display: flex;
  }

</style>
