<template>
  <div class='hello'>
    <div id="game-parameters" data-image="tux"/>
    <ion-phaser v-bind:game.prop='game'/>
  </div>
</template>

<script src="./game.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
