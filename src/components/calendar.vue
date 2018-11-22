
<template lang="pug">
  main.main
    header-component(:months="months" :toDay="day" @getCurrentDay="currentDay" @getCurrentMonth="currentMonth")
    day-component(:months="months" :month="thisMonth" :getActiveDay="day" @getActiveDay="activeDay")
</template>
<script>
  import headerComponent from './headerComponent';
  import dayComponent from '../components/day'

  export default {
    name: 'calendar',
    data() {
      return {
        day: '',
        thisMonth: null,
        toDay: this.moment().format('DD-MM-YY'),
        months: [
          /*{ month: this.moment().month(),
            days: this.moment(this.moment().month(), 'MM').daysInMonth(),
            dayPrevMonth: this.moment(this.moment().month(), 'MM').startOf('month').day() -1,
            dayNextMonth: 7 - this.moment(this.moment().month(), 'MM').endOf('month').day(),
          },*/
          { month: this.moment().month() + 1,
            monthName: this.moment().month(this.moment().month()).format('MMMM'),
            days: this.moment(this.moment().month() + 1, 'MM').daysInMonth(),
            dayPrevMonth: this.moment(this.moment().month() + 1, 'MM').startOf('month').day() - 1,
            dayNextMonth: 7 - this.moment(this.moment().month() + 1, 'MM').endOf('month').day(),
          },
          /*{ month: this.moment().month() + 2,
            days: this.moment(this.moment().month() + 2, 'MM').daysInMonth(),
            dayPrevMonth: this.moment(this.moment().month() + 2, 'MM').startOf('month').day() - 1,
            dayNextMonth: 7 - this.moment(this.moment().month() + 2, 'MM').endOf('month').day(),
          }*/
        ]
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
        this.thisMonth = month.retCurMonth;
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