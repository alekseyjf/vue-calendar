<template lang="pug">
  .popup
    input(type="text", placeholder="событие").popup__event
    input(type="text", placeholder="Дата, месяц, год").popup__date
    input(type="text", placeholder="Имя участника").popup__name
    textarea( placeholder="описание").popup__desc
    button создать
</template>

<script>
  export default {
    data() {
      return {
        name: ''
      }
    }
  }
</script>

<style>

  .popup{
    display: none;
    padding: 20px;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 500px;
    width: 100%;
    z-index: 1;
    border: 1px solid #ccc;
  }
  .active .popup{
    display: block;
  }
  .popup__event{
    width: 100%;
  }
  .popup__date{
    width: 100%;
  }
  .popup__name{
    width: 100%;
  }
  .popup__desc{
    resize: none;
    width: 100%;
  }

</style>