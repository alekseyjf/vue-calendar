<template lang="pug">
  .calendar
    ul.calendar__list
      li.calendar__item.name-month(v-for="day in dayName") {{day}}

      li.calendar__item.next-month(v-for="itemPrevDay, j in monthView.dayPrevMonth")
      li.calendar__item( v-for="(item, index) in +monthView.days", @click="current(item,index, $event)", :class="{active: monthView.flag.split('-')[0]- 1 == index}") {{ item }}
        button(v-for="itemEvent in events", v-if="itemEvent.date.split('-')[0] == index + 1 && itemEvent.date.split('-')[1] == monthView.month", @click.stop="editOrRemove(itemEvent._id)") {{itemEvent.event}}
      li.calendar__item.next-month( v-for="itemNextDay in monthView.dayNextMonth")
    popup-component(v-if="openPopup", :objPopup="objPopup", :editData="editData", @closePopup="closePopup", :events="events")

    pre {{ events }}
    pre {{ monthView }}

</template>

<script>

  //import moment from 'moment'

  import PopupComponent from "./popup";
  export default {
    components: {PopupComponent},
    data() {
      return {
        objPopup: {},
        flag : null,
        dayName: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        eventsDate: [],
        editData: null,
        objEdit: null,
        openPopup: false,
          events: []
      }
    },
    props:{
      //months: Array,
      monthView: Object,
      //getActiveDay: String,
      curMonth: Number,
    },
    watch: {
      /*'getActiveDay': function (val) {
        console.log(val);
        this.flag = val.split('-')[0] - 1
        console.log('this.flag', this.flag);
      }*/
    },
    computed: {

    },
    methods: {
      /*curActiveDay(){
        this.flag = this.getActiveDay
      }*/
      closePopup(val){
        this.openPopup= val.close;
        this.$emit('setEvents', {
          events: this.events
        })
      },
      current: function(item,i,event){
        this.editData = null;
        /* работа с датами*/
        this.flag = i;
        /* передача данніх положения мішки на єкране в момент клика */
        let date = this.flag + 1 + '-' + this.curMonth + '-' + this.moment().format('YY'),
            _id = this.moment().unix(),
            geRect = document.querySelector('.calendar').getBoundingClientRect();

        this.$emit('getActiveDay', {
          day: date
        });

        /* работа с датами*/

        /* передача расположения мышки в момент клика */
        this.objPopup = {
          date: date,
          _id: _id,
          left: event.clientX - geRect.left,
          top: event.clientY - geRect.top,
        };
        /* передача расположения мышки в момент клика */

        this.openPopup = true;
        // переключение кнопки редактирования в попапе
      },
      editOrRemove(id){
        this.editData = id;
        this.openPopup = true;
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
    min-height: 70px;
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
