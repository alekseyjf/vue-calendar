<template lang="pug">
  .form
    input(type="text")
    pre &nbsp; &nbsp; &nbsp;
    button(@click="prevMonth").btn.btn-prev prev
    p {{month}}
    button(@click="nextMonth").btn.btn-next next
    pre &nbsp; &nbsp; &nbsp;
    button(@click="currentDate") current date
    pre &nbsp; &nbsp; &nbsp;
    .active-day {{currentDay}}
    pre {{currentMonth}}
</template>
<script>

  export default {
    name: 'HeaderComponent',
    data() {
      return {
        currentDay: this.moment().format('DD-MM-YY'),
        month: this.moment().format('MMMM'),
        currentMonth: this.moment().month() + 1,
      }
    },
    props: ['toDay', 'months'],
    watch: {
      'toDay' : function (val) {
        this.currentDay = val
      }
    },
    methods: {
      /*cloneObject(obj){
        return JSON.parse(JSON.stringify(obj))
      },*/
      prevMonth(){
        /*this.months[1].month -= 1;
        this.months[1].days = this.moment(this.months[1].month, 'MM').daysInMonth();
        this.months[1].dayPrevMonth = this.moment(this.months[1].month, 'MM').startOf('month').day() - 1;
        this.months[1].dayNextMonth = 7 - this.moment(this.months[1].month, 'MM').endOf('month').day();*/

        this.currentMonth -= 1

        this.$emit('getCurrentMonth', {
          retCurMonth: this.currentMonth
        })
        /*let obj = {
          month: this.months[0].month - 1,
          days: this.moment(this.months[0].month, 'MM').daysInMonth(),
          dayPrevMonth: this.moment(this.months[0].month, 'MM').startOf('month').day() -1,
          dayNextMonth: 7 - this.moment(this.months[0].month, 'MM').endOf('month').day(),
          currentMonth: false
        }*/

      },
      nextMonth(){
        this.currentMonth += 1;
        this.$emit('getCurrentMonth', {
          retCurMonth: this.currentMonth
        })
      },
      currentDate(){
        this.currentDay= this.moment().format('DD-MM-YY');
        this.$emit('getCurrentDay', {
          returnCurrentDay: this.currentDay
        })
      }
    }
  }
</script>
<style>
  .form{
    display: flex;
  }
</style>