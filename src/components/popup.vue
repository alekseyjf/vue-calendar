<template lang="pug">
  //.popup
      button(@click="closePopup()").close
      input(type="text" v-model="obj.event" placeholder="event")
      input(type="text" v-model="obj.date" placeholder="date")
      input(type="text" v-model="obj.name" placeholder="name")

      button( v-if="!flagEdit", @click="writeDate(i)") Готово
      button( v-else, @click="editDate(i)") Редактировать
</template>
<script>
  export default {
    name: 'PopupComponent',
    data() {
      return {
        obj: {
          _id: '',
          event: '',
          date: '',
          name: ''
        },
      }
    },
    methods: {
      /*cloneObject(obj){
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
      },*/
    }
  }
</script>
<style>
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
</style>