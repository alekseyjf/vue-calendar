<template lang="pug">
  .form
    .left
      button(@click="prevMonth").btn.btn-prev prev
      p.header__month {{month}}
      button(@click="nextMonth").btn.btn-next next
      pre &nbsp; &nbsp; &nbsp;
      button(@click="currentDate") current date
      pre &nbsp; &nbsp; &nbsp;
      .active-day {{monthView.flag}}

    .right
      input(type="text", @input="findEvent($event)")
      ul.found__list(v-if="foundEvent.length > 0")
        li.found__item(v-for="item in foundEvent") {{item.name}}
</template>
<script>

  export default {
    name: 'HeaderComponent',
    data() {
      return {
        currentDay: this.moment().format('DD-MM-YY'),
        month: this.moment().format('MMMM'),
        currentMonth: this.moment().month() + 1,
        foundEvent: []
      }
    },
    props: {
      monthView: Object,
      events: Array
    },
    methods: {
      /*cloneObject(obj){
        return JSON.parse(JSON.stringify(obj))
      },*/
      prevMonth(){



        /* запись в объект */
        this.monthView.month -= 1;
        this.monthView.monthName= this.moment().month(this.monthView.month - 1).format('MMMM');
        this.monthView.days = this.moment(this.monthView.month, 'MM').daysInMonth();
        this.monthView.dayPrevMonth = this.moment(this.monthView.month, 'MM').startOf('month').day() - 1 == -1 ? 6 : this.moment(this.monthView.month, 'MM').startOf('month').day() - 1;
        this.monthView.dayNextMonth = 7 - this.moment(this.monthView.month, 'MM').endOf('month').day() == 7 ? 0 : 7 - this.moment(this.monthView.month, 'MM').endOf('month').day();
        /* запись в объект */

        /* вывод полного названия текущего месяца календаря */
        this.month = this.moment().month(this.monthView.month - 1).format('MMMM');
        /* вывод полного названия текущего месяца календаря */

        /* получение месяца из полной даты*/
        let arr = this.monthView.flag.split('-');
        arr[1] = this.monthView.month;
        this.monthView.flag = arr.join('-');
        /* получение месяца из полной даты*/

        this.$emit('getCurrentMonth', {
          retCurMonth: this.monthView.month
          /* передача выбраного месяца */
        });

      },
      nextMonth(){

        /* запись в объект */
        this.monthView.month += 1;
        this.monthView.days = this.moment(this.monthView.month, 'MM').daysInMonth();
        this.monthView.monthName= this.moment().month(this.monthView.month - 1).format('MMMM');
        this.monthView.dayPrevMonth = this.moment(this.monthView.month, 'MM').startOf('month').day() - 1 == -1 ? 6 : this.moment(this.monthView.month, 'MM').startOf('month').day() - 1;
        this.monthView.dayNextMonth = 7 - this.moment(this.monthView.month, 'MM').endOf('month').day() == 7 ? 0 : 7 - this.moment(this.monthView.month, 'MM').endOf('month').day();
        /* запись в объект */

        /* вывод полного названия текущего месяца календаря */
        this.month = this.moment().month(this.monthView.month - 1).format('MMMM');
        /* вывод полного названия текущего месяца календаря */

        /* получение месяца из полной даты*/
        let arr = this.monthView.flag.split('-')
        arr[1] = this.monthView.month;
        this.monthView.flag = arr.join('-')
        /* получение месяца из полной даты*/

        this.$emit('getCurrentMonth', {
          retCurMonth: this.monthView.month
          /* передача выбраного месяца */
        });
      },
      currentDate() {
        /* получение текущей даты */
        this.monthView.flag= this.moment().format('DD-MM-YY');
        this.currentMonth= this.moment().month() + 1;
        /* получение текущей даты */

        /* запись в объект */
        this.monthView.month = this.currentMonth;
        this.monthView.monthName= this.moment().month(this.currentMonth - 1).format('MMMM');
        this.monthView.days = this.moment(this.currentMonth, 'MM').daysInMonth();
        this.monthView.dayPrevMonth = this.moment(this.currentMonth, 'MM').startOf('month').day() - 1 == -1 ? 6 : this.moment(this.currentMonth, 'MM').startOf('month').day() - 1;
        this.monthView.dayNextMonth = 7 - this.moment(this.currentMonth, 'MM').endOf('month').day() == 7 ? 0 : 7 - this.moment(this.currentMonth, 'MM').endOf('month').day();
        /* запись в объект */

        /* вывод полного названия текущего месяца календаря */
        this.month = this.moment().month(this.monthView.month - 1).format('MMMM');
        /* вывод полного названия текущего месяца календаря */

        //console.log(this.currentMonth, 'this.currentMonth header');
        this.$emit('getCurrentMonth', {
          retCurMonth: this.currentMonth
          /* передача выбраного месяца */
        });

        this.$emit('getCurrentDay', {
          returnCurrentDay: this.currentDay
          /* передача текущего дня и месяца */
        })
      },
      checkFound(str) {
        var lowerStr = str.toLowerCase();

        return !!(~lowerStr.indexOf('viagra') || ~lowerStr.indexOf('xxx'));
      },
      findEvent($event){
        if($event.target.value.length > 1){
          let eventLover,
              targetValue = $event.target.value.toLowerCase();
          this.foundEvent = this.events.filter((event)=>{
            //eventLover = event.event.toLowerCase();
            eventLover = event.event.toLowerCase().slice(0, $event.target.value.length);

            /*for(let i=0; i < targetValue.length; i++){
              if(eventLover[i] == $event.target.value[i]){
                return event
              }
            }*/

            //return ~$event.target.value.indexOf(event.event)

            if(eventLover == $event.target.value) return event
          });

          console.log(this.foundEvent);

        } else {
          this.foundEvent = []
        }

        /**/
      }
    }
  }
</script>
<style>
  .form{
    display: flex;
    justify-content: space-between;
  }
  .left{
  display: flex;
  }
  .right{
    position: relative;
  }
  .found__list{
    list-style: none;
    position: absolute;
    top: 100%;
    width: 100%;
    border: 1px solid grey;
    background-color: #fff;
    z-index: 1;
    padding: 0;
    text-align: left;
  }
  .found__item{
    padding: 4px 16px;
  }
  .found__item:not(:last-child){
    border-bottom: 1px solid grey;
  }
  .header__month{
    width: 120px;
  }
</style>