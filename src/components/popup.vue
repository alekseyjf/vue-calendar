<template lang="pug">
  .popup(v-show="flagActive" :style="{top: getRect.top + 'px', left: getRect.left + 'px'}")
    button(@click="closePopup").close
    input(type="text" v-model="obj.event" placeholder="event")
    input(type="text" v-model="obj.date" placeholder="date")
    input(type="text" v-model="obj.name" placeholder="name")

    button(@click="writeDate") Готово
    button() Редактировать
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
        getRect: {},
        flagActive: false,
        eventsObj: []
      }
    },
    props: ['rect'],
    watch: {
      'rect': function(val){
        console.log(val);
        this.getRect = val;
        this.flagActive = true
      }
    },
    methods: {
      cloneObject(obj){
        return JSON.parse(JSON.stringify(obj))
      },
      closePopup(){
        this.flagActive=false;
        this.obj.event = this.obj.date = this.obj.name = '';
      },
      writeDate(){
        this.obj._id = this.getRect._id;
        this.eventsObj.push(this.cloneObject(this.obj));// создание нового события

        //let eventDay =  this.cloneObject(this.obj).event
        //console.log(eventDay);
        this.eventDay = this.cloneObject(this.obj).event

        this.flagActive=false;
        this.obj._id = this.obj.event = this.obj.date = this.obj.name = '';// очищение полей
        this.$emit('objEvents', {
          retObjEvents: this.eventsObj
        });
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
    }
  }
</script>
<style>
  .popup {
    /*display: none;*/
    position: absolute;
    left: 50%;
    top: 100%;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    width: 300px;
    padding: 20px 0;
    transform: translate(-50%, -100%);
  }

  .popup *{
    display: block;
    margin: 0 auto 10px;
  }

  .close {
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