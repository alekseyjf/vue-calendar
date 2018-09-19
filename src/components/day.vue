<template lang="pug">
  ul.calendar__list
    li.calendar__item.prev-month(v-for="itemPrev in +firstDayMonth -1") {{itemPrev}}
    li.calendar__item( v-for="item, i in +dayInMonth" @click="current(item,i)" :class="{active: flag == i}") {{item}}
    <!--li.calendar__item( v-for="item in D1Nlast")-->

    li.calendar__item {{ firstDayMonth }}
    li.calendar__item {{ lastDayPrevMonth }}

    //li.prev-m(v-for="index in D1Nfirst")
    //li(v-for="day in mounth" v-on:click="current").calendar__item
      //span.calendar__day {{day}}

  //(v-for="dfirst in D1Nfirst")
</template>
<script>
  let moment = require('moment');
  export default {
    data() {
      return {
        moment: moment,
        flag : null,
        prevMonth: [],
        prevMonthDay: [],
        isActive: false,

        firstDayMonth : moment().startOf('month').day(), // первый день месяца
        lastDayMonth : moment().endOf("month").day(), // последний день месяца
        dayInMonth : moment().endOf("month").format('DD'),
        day: moment().endOf("month").format('DD'),
        dayInPrevMonth : moment("2018/08/07").endOf("month").day(), // последний день месяца

        // D1 : new Date(),
        // D1lastPrev : new Date(new Date().getFullYear(),new Date().getMonth(),0).getDate(),
        // D1last : new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate(), // последний день месяца
        // D1Nlast : new Date(new Date().getFullYear(),new Date().getMonth(),new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate()).getDay(), // день недели последнего дня месяца
        // D1Nfirst : new Date(new Date().getFullYear(),new Date().getMonth(),1).getDay() - 1, // день недели первого дня месяца
      }
    },
    methods: {
      current: function(item,i){

        this.flag = i;


        //let date = new Date(year, month)
            //mounth = date.getMonth();
        //console.log(el);

        // получить номер дня недели, от 0(пн) до 6(вс)
        // let totals,
        //     day = date.getDay();
        //console.log(day);
        /*if (day == 0) totals = 7;
           totals = day + 1;*/

        //console.log(day);
        //this.isActive = !this.isActive;
      },
      currentDay: function(){

      }
    },
    created: function(){
      /*let startDay = this.D1lastPrev - (this.D1Nfirst - 1),
          lastDay = this.D1lastPrev + 1;
      for(let i = startDay; i < lastDay; i++){
        this.prevMonthDay.push(i)
      }*/
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
  }
  .prev-month{
    background-color: #eee;
  }
</style>
