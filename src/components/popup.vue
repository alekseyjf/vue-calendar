<template lang="pug">
  .popup(:style="{top: objPopup.top + 'px', left: objPopup.left + 'px'}")
    button(@click="closePopup").close x
    input(type="text" v-model="obj.event" placeholder="event")
    input(type="text" v-model="objPopup.date" placeholder="date" readonly)
    input(type="text" v-model="obj.name" placeholder="name")

    button(v-if="edit", @click="writeDate") Готово
    template(v-else)
      button(@click="editDate") Редактировать
      button(@click="deleteDate") Удалить
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
        edit: true,
        index: null
      }
    },
    props:{
      objPopup: Object,
      events: Array,
      editData: Number
    },
    /*watch: {
      'rect': function(val){
        this.getRect = val;
        this.obj.date = this.getRect.date;
      },
      'editData': function(edit){
        this.edit = edit;
        console.log(this.edit);
      }
    },*/
    mounted: function() {
      if( this.editData != null){
        this.edit = false

        for( let i=0; i < this.events.length; i++){
          if(this.events[i]._id == this.editData){
            this.index = i;
            this.obj._id = this.events[i]._id;
            this.obj.date = this.events[i].date;
            this.obj.event = this.events[i].event;
            this.obj.name = this.events[i].name;

          }
        }
      }


    },
    methods: {
      cloneObject(obj){
        return JSON.parse(JSON.stringify(obj))
      },
      closePopup(){
        this.$emit('closePopup', {
          close: false
        });
      },
      writeDate(){

        this.obj._id = this.objPopup._id;
        this.obj.date = this.objPopup.date;
        if(this.obj.name == '' || this.obj.event == ''){
          alert('поле не должно быть пустым')
          return
        }
        this.events.push(this.cloneObject(this.obj));// создание нового события'

        this.$emit('closePopup', {
          close: false
        });
      },
      editDate(){

        if(this.obj.name == '' || this.obj.event == ''){
          alert('поле не должно быть пустым')
          return
        }
        //this.events[this.index]._id = this.obj._id;
        //this.events[this.index].date = this.obj.date;
        this.events[this.index].event = this.obj.event;
        this.events[this.index].name = this.obj.name;

        this.edit = true;
        this.$emit('closePopup', {
          close: false
        });
      },
      deleteDate(){
        this.events.splice(this.index, 1);

        this.edit = true;
        this.$emit('closePopup', {
          close: false
        });
      }
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
    display: flex;
    height: 15px;
    width: 15px;
    right: 5px;
    top: 5px;
    border: none;
    color: #000;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
</style>