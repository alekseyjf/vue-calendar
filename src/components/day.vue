<template lang="pug">
  .calendar
    ul.calendar__list
      li.calendar__item.name-month(v-for="day in dayName") {{day}}

      //b( v-for="itemEvent in eventsObj", v-if="itemEvent._id == i + 1" @click="openPopup(itemEvent._id)" ) {{itemEvent.event}}
      //li.calendar__item.next-month(v-for="itemNext in +lastDayMonth") {{itemNext}}

      template( v-for="itemMonth, i in months" )
        template( v-if="itemMonth.month == curMonth" )
          li.calendar__item.next-month(v-for="itemPrevDay, j in months[0].dayPrevMonth")
          li.calendar__item( v-for="item, k in +itemMonth.days", @click="current(item,k, $event)", :class="{active: flag == k}") {{ item }}
          li.calendar__item.next-month( v-for="itemNextDay in itemMonth.dayNextMonth")
    popup-component(:rect="rect",@objEvents="events")

    pre {{ eventsDate }}

</template>

<script>

  //import moment from 'moment'

  import PopupComponent from "./popup";
  export default {
    components: {PopupComponent},
    data() {
      return {
        rect: {},
        flag : null,
        dayName: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        curMonth: this.moment().month() + 1,
        eventsDate: []
      }
    },
    props: ['months', 'getActiveDay', 'month'],
    watch: {
      'getActiveDay': function (val) {
        this.flag = val.split('-')[0] - 1
      },
      'month': function (val) {
        console.log(val);
        this.curMonth = val
      }
    },
    methods: {
      current: function(item,i,event){

        this.flag = i;
        this.$emit('getActiveDay', {
          day: this.flag + 1
        });

        let _id = this.flag + 1 + '-' + this.curMonth + '-' + this.moment().format('YYYY');
        let geRect = document.querySelector('.calendar').getBoundingClientRect();
        this.rect = {
          _id: _id,
          left: event.clientX - geRect.left,
          top: event.clientY - geRect.top,
        }
        console.log(event.clientX - geRect.left,'x',event.clientY - geRect.top,'y');

      },
      events(val){
        this.eventsDate= val.retObjEvents;
        console.log(this.eventsDate);
      }

    },
    created: function(){
      /*let index = this.months[0].days,
        res = this.months[0].days - this.months[1].dayPrevMonth;

      for(let i = index; i > res; i--){
        this.months[1].dayPrevMonthArr.unshift(i)
      }*/
    }
  }
</script>
<style>
  .calendar{
    position: relative;
  }
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
    height: 70px;
    border: 2px solid #aaa;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    position: relative;
    flex-direction: column;
    transition: .3s;
  }
  .calendar__item.active{
    background-color: #0ff;
  }
  .next-month,
  .prev-month{
    background-color: #eee;
  }


  .active .popup{
    display: block;
  }
  b{
    font-size: 16px
  }
</style>
