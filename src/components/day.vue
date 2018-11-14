<template lang="pug">
  ul.calendar__list
    li.calendar__item.name-month(v-for="day in dayName") {{day}}

    //b( v-for="itemEvent in eventsObj", v-if="itemEvent._id == i + 1" @click="openPopup(itemEvent._id)" ) {{itemEvent.event}}
    //.popup
      button(@click="closePopup()").close
      input(type="text" v-model="obj.event" placeholder="event")
      input(type="text" v-model="obj.date" placeholder="date")
      input(type="text" v-model="obj.name" placeholder="name")

      button( v-if="!flagEdit", @click="writeDate(i)") Готово
      button( v-else, @click="editDate(i)") Редактировать
    //li.calendar__item.next-month(v-for="itemNext in +lastDayMonth") {{itemNext}}

    template( v-for="itemMonth, i in months" )
      template( v-if="itemMonth.currentMonth" )
        li.calendar__item.next-month(v-for="itemPrevDay, j in months[1].dayPrevMonthArr") {{itemPrevDay}}
        li.calendar__item( v-for="item, k in +itemMonth.days", @click="current(item,k)", :class="{active: flag == k}") {{ item }}
        li.calendar__item.next-month( v-for="itemNextDay in itemMonth.dayNextMonth") {{itemNextDay}}


    pre {{ months }}
    button(@click="currentDate") date
</template>

<script>

  //import moment from 'moment'

  export default {
    data() {
      return {
        // moment: moment,
        eventsObj: [],
        flag : null,
        //prevMonth: [],
        prevMonthDay: [],
        isActive: false,
        eventDay: null,
        flagEdit: false,
        dayName: ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],
        toDay: this.moment().format('DD-MM-YY'),
        //prevMonth : this.moment().month() - 1, // первый день месяца
        //lastWeek: this.moment().endOf('week'),
        dayInMonth : this.moment().endOf("month").format('DD'),
        day: this.moment().endOf("month").format('DD'),
        dayInPrevMonth : this.moment("2018/08/07").endOf("month").day(), // последний день месяца
        lastDayMonth: 7 - this.moment().endOf('month').day(),
        obj: {
          _id: '',
          event: '',
          date: '',
          name: ''
        },
        months: [
          { month: this.moment().month(),
            days: this.moment(this.moment().month(), 'MM').daysInMonth(),
            dayPrevMonth: 7 - this.moment(this.moment().month(), 'MM').startOf('month').day(),
            dayNextMonth: 7 - this.moment(this.moment().month(), 'MM').endOf('month').day(),
            dayPrevMonthArr: [],
            currentMonth: false
          },
          { month: this.moment().month() + 1,
            days: this.moment(this.moment().month() + 1, 'MM').daysInMonth(),
            dayPrevMonth: 7 - this.moment(this.moment().month() + 1, 'MM').startOf('month').day(),
            dayNextMonth: 7 - this.moment(this.moment().month() + 1, 'MM').endOf('month').day(),
            dayPrevMonthArr: [],
            currentMonth: true
          },
          { month: this.moment().month() + 2,
            days: this.moment(this.moment().month() + 2, 'MM').daysInMonth(),
            dayPrevMonth: 7 - this.moment(this.moment().month() + 2, 'MM').startOf('month').day(),
            dayNextMonth: 7 - this.moment(this.moment().month() + 2, 'MM').endOf('month').day(),
            dayPrevMonthArr: [],
            currentMonth: false
          }
        ]
      }
    },
    methods: {
      current: function(item,i){

        this.flag = i;
        this.$emit('activeDay', {
          day: this.flag + 1
        })
      },

      cloneObject(obj){
        return JSON.parse(JSON.stringify(obj))
      },

      writeDate: function(index){
        this.flagEdit = false;
        this.obj._id = index + 1;
        this.eventsObj.push(this.cloneObject(this.obj));// создание нового события

        //let eventDay =  this.cloneObject(this.obj).event
        //console.log(eventDay);
        this.eventDay = this.cloneObject(this.obj).event

        this.obj.event = this.obj.date = this.obj.name = '';// очищение полей

      },
      openPopup: function(index){
        console.log(index);

        this.obj.event = '';
        this.obj.date = '';
        this.obj.name = '';

        this.flagEdit = true
        for( let y = 0; y < this.eventsObj.length; y++ ){ // проверка на выбранное событие
          if( this.eventsObj[y]._id == index){
            this.obj.event = this.eventsObj[y].event;
            this.obj.date = this.eventsObj[y].date;
            this.obj.name = this.eventsObj[y].name;

          }
        }
      },
      editDate: function(index){
        for( let y = 0; y < this.eventsObj.length; y++ ) {
          if (this.eventsObj[y]._id == index) {

            this.eventsObj[y].event = this.obj.event;
            this.eventsObj[y].date = this.obj.date;
            this.eventsObj[y].name = this.obj.name;

            this.eventsObj.slice(this.eventsObj[y]._id, this.eventsObj[y]._id+1);

            this.obj.event = '';
            this.obj.date = '';
            this.obj.name = '';

          }
        }
        this.flagEdit = false
        //console.log(this.eventsObj.slice(index, index + 1));
      },

      currentDate(){
        this.$emit('giveDay', {
          toDay: this.toDay
        })
      }

    },
    created: function(){
      let index = this.months[0].days;
      let res = this.months[0].days - this.months[1].dayPrevMonth;
      for(let i = index; i > res; i--){
        this.months[1].dayPrevMonthArr.unshift(i)
      }
      console.log(this.months[1].dayPrevMonthArr);
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

  .popup{
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;

  }
  .close{
    position: absolute;
    display: block;
    height: 15px;
    width: 15px;
    right: 5px;
    top: 5px;
    border: none;
    background-color: #333;
  }
  .active .popup{
    display: block;
  }
  b{
    font-size: 16px
  }
</style>
