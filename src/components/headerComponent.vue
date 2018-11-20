<template lang="pug">
  .form
    input(type="text")
    pre &nbsp; &nbsp; &nbsp;
    button(@click="prevMonth").btn.btn-prev prev
    p.header__month {{month}}
    button(@click="nextMonth").btn.btn-next next
    pre &nbsp; &nbsp; &nbsp;
    button(@click="currentDate") current date
    pre &nbsp; &nbsp; &nbsp;
    .active-day {{currentDay}}
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


        this.currentMonth -= 1
        this.month = this.moment().month(this.currentMonth - 1).format('MMMM');
        this.$emit('getCurrentMonth', {
          retCurMonth: this.currentMonth
        });
        this.months[0].month -= 1;
        this.months[0].monthName= this.moment().month(this.currentMonth - 1).format('MMMM');
        this.months[0].days = this.moment(this.currentMonth, 'MM').daysInMonth();
        this.months[0].dayPrevMonth = this.moment(this.currentMonth, 'MM').startOf('month').day() - 1 == -1 ? 6 : this.moment(this.currentMonth, 'MM').startOf('month').day() - 1;
        this.months[0].dayNextMonth = 7 - this.moment(this.currentMonth, 'MM').endOf('month').day() == 7 ? 0 : 7 - this.moment(this.currentMonth, 'MM').endOf('month').day();

        let arr = this.currentDay.split('-')
        arr[1] = this.currentMonth;
        this.currentDay = arr.join('-')
      },
      nextMonth(){


        this.currentMonth += 1;
        this.month = this.moment().month(this.currentMonth - 1).format('MMMM');
        this.$emit('getCurrentMonth', {
          retCurMonth: this.currentMonth
        });
        this.months[0].month += 1;
        this.months[0].days = this.moment(this.currentMonth, 'MM').daysInMonth();
        this.months[0].monthName= this.moment().month(this.currentMonth - 1).format('MMMM');
        this.months[0].dayPrevMonth = this.moment(this.currentMonth, 'MM').startOf('month').day() - 1 == -1 ? 6 : this.moment(this.currentMonth, 'MM').startOf('month').day() - 1;
        this.months[0].dayNextMonth = 7 - this.moment(this.currentMonth, 'MM').endOf('month').day() == 7 ? 0 : 7 - this.moment(this.currentMonth, 'MM').endOf('month').day();


        let arr = this.currentDay.split('-')
        arr[1] = this.currentMonth;
        this.currentDay = arr.join('-')
      },
      currentDate(){
        this.currentDay= this.moment().format('DD-MM-YY');
        this.currentMonth= this.moment().month() + 1;


        this.months[0].month = this.currentMonth;
        this.months[0].monthName= this.moment().month(this.currentMonth - 1).format('MMMM');
        this.months[0].days = this.moment(this.currentMonth, 'MM').daysInMonth();
        this.months[0].dayPrevMonth = this.moment(this.currentMonth, 'MM').startOf('month').day() - 1 == -1 ? 6 : this.moment(this.currentMonth, 'MM').startOf('month').day() - 1;
        this.months[0].dayNextMonth = 7 - this.moment(this.currentMonth, 'MM').endOf('month').day() == 7 ? 0 : 7 - this.moment(this.currentMonth, 'MM').endOf('month').day();

        this.month = this.moment().month(this.currentMonth - 1).format('MMMM');

        this.$emit('getCurrentMonth', {
          retCurMonth: this.currentMonth
        });

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
  .header__month{
    width: 120px;
  }
</style>