<template lang="pug">
  .popup(v-show="flagActive" :style="{top: getRect.top + 'px', left: getRect.left + 'px'}")
    button(@click="closePopup").close
    input(type="text" v-model="obj.event" placeholder="event")
    input(type="text" v-model="obj.date" placeholder="date" readonly)
    input(type="text" v-model="obj.name" placeholder="name")

    button(v-if="!edit", @click="writeDate") Готово
    button(v-else, @click="editDate") Редактировать
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
        eventsObj: [],
        edit: false
      }
    },
    props: ['rect', 'editData', 'objEdit'],
    watch: {
      'rect': function(val){
        this.getRect = val;
        this.flagActive = true;
        this.obj.date = this.getRect.date;
      },
      'editData': function(edit){
        this.edit = edit;
        this.flagActive = true;
        console.log(this.edit);
      },
      'objEdit': function (obj) {
        this.obj._id = obj._id;
        this.obj.date = obj.date;
        this.obj.event = obj.event;
        this.obj.name = obj.name;
      }
    },
    methods: {
      cloneObject(obj){
        return JSON.parse(JSON.stringify(obj))
      },
      closePopup(){
        this.flagActive=false;
        this.edit= false;
        this.obj.event = this.obj.date = this.obj.name = '';
      },
      writeDate(){
        this.obj._id = this.getRect._id;
        this.eventsObj.push(this.cloneObject(this.obj));// создание нового события

        this.eventDay = this.cloneObject(this.obj).event

        this.flagActive=false;
        this.obj._id = this.obj.event = this.obj.date = this.obj.name = '';// очищение полей
        this.$emit('objEvents', {
          retObjEvents: this.eventsObj
        });
      },
      editDate: function(){
        console.log(this.edit);
        for( let i=0; i < this.eventsObj.length; i++){
          if( this.eventsObj[i]._id == this.obj._id){
            this.eventsObj[i].date = this.obj.date;
            this.eventsObj[i].event = this.obj.event;
            this.eventsObj[i].name = this.obj.name;
          }
        }
        this.flagActive=false;
        this.obj._id = this.obj.event = this.obj.date = this.obj.name = '';// очищение полей

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