
<template lang="pug">
  .calendar
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
        thisMonth: '',
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
      activeDay(day){
        this.day = day.day + '-' + this.moment().format('MM-YY');
      },
      currentDay(day){
        this.day = day.returnCurrentDay
      },
      currentMonth(month){
        this.thisMonth = month.retCurMonth;
      }
    },
    components: {
      headerComponent,
      dayComponent
    }
  }
</script>
<style></style>