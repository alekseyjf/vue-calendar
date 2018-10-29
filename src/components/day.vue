<template lang="pug">
  ul.calendar__list
    li.calendar__item.name-month(v-for="day in dayName") {{day}}
    li.calendar__item.prev-month(v-for="itemPrev in +firstDayMonth -1") {{itemPrev}}
    li.calendar__item( v-for="item, i in +dayInMonth" @click="current(i)" :class="{active: flag == i}") {{item}}
      form-component()
    li.calendar__item.next-month(v-for="itemNext in +lastDayMonth") {{itemNext}}


</template>
<script>
  import form from './form'
  export default {
    components: {
      'formComponent': form
    },
    data() {
      return {
        flag: null,
        prevMonth: [],
        prevMonthDay: [],
        isActive: false,
        month: this.moment().month() + 1,
        dayName: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        firstDayMonth: this.moment().startOf('month').day(), // первый день месяца
        dayInMonth: this.moment().endOf("month").format('DD'),
        lastDayMonth: 7 - this.moment().endOf('month').day(),
      }
    },
    methods: {
      current: function (i) {

        this.flag = i;
        console.log(i+1);
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
    align-items: flex-start;
    justify-content: center;
    font-size: 50px;
    position: relative;
    transition: .3s;
  }

  .calendar__item.active {
    background-color: #ccc;
  }

  .next-month,
  .prev-month {
    background-color: #eee;
  }
  .name-month{
    background-color: #dfd;
  }
</style>
