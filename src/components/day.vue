<template lang="pug">
  ul.calendar__list
    li.calendar__item.prev-month(v-for="itemPrev in +firstDayMonth -1") {{itemPrev}}
    li.calendar__item( v-for="item, i in +dayInMonth" @click="current(i)" :class="{active: flag == i}") {{item}}

    li.calendar__item {{ firstDayMonth }}
    li.calendar__item {{ lastDayMonth }}

</template>
<script>

  export default {
    data() {
      return {
        flag: null,
        prevMonth: [],
        prevMonthDay: [],
        isActive: false,

        firstDayMonth: this.moment().startOf('month').day(), // первый день месяца
        lastDayMonth: this.moment().endOf("month").day(), // последний день месяца
        dayInMonth: this.moment().endOf("month").format('DD'),
        day: this.moment().endOf("month").format('DD'),
        dayInPrevMonth: this.moment("2018/08/07").endOf("month").day(), // последний день предыдущего месяца


      }
    },
    methods: {
      current: function (i) {

        this.flag = i;

      },
      currentDay: function () {

      }
    },
    created: function () {

    }
  }
</script>
<style>
  .calendar__list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    width: 100%;
  }

  .calendar__item {
    flex: 0 1 calc(100% / 7);
    width: calc(100% / 7);
    height: 150px;
    border: 2px solid #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 50px;
    transition: .3s;
  }

  .calendar__item.active {
    background-color: #ccc;
  }

  .prev-month {
    background-color: #eee;
  }
</style>
