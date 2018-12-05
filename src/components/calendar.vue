
<template lang="pug">
  main.main
    header-component(:monthView="monthView" :toDay="day" @getCurrentDay="currentDay" @getCurrentMonth="currentMonth")
    day-component(:monthView="monthView" :curMonth="curMonth" :getActiveDay="day" @getActiveDay="activeDay")
</template>
<script>
  import headerComponent from './headerComponent';
  import dayComponent from '../components/day'

  export default {
    name: 'calendar',
    data() {
      return {
        day: '',
        toDay: this.moment().format('DD-MM-YY'),
        curMonth: this.moment().month() + 1,
        monthView: {
          month: this.moment().month() + 1,
          monthName: this.moment().month(this.moment().month()).format('MMMM'),
          days: this.moment(this.moment().month() + 1, 'MM').daysInMonth(),
          dayPrevMonth: this.moment(this.moment().month() + 1, 'MM').startOf('month').day() - 1,
          dayNextMonth: 7 - this.moment(this.moment().month() + 1, 'MM').endOf('month').day(),
        }
      }
    },
    methods: {
      activeDay(day){ // get active day
        this.day = day.day;
        // console.log(this.day, 'active this.day calendar');
      },
      currentDay(day){// current day
        this.day = day.returnCurrentDay;
        // console.log(this.day, 'current this.day calendar');
      },
      currentMonth(month){
        this.curMonth = month.retCurMonth;
        // console.log(this.thisMonth, 'this.thisMonth calendar');
      }
    },
    components: {
      headerComponent,
      dayComponent
    }
  }
</script>
<style></style>