<template>
  <div id="notes-list">
    <div>
      <button @click="all='all'">全部</button>
      <button @click="all='like'">喜欢</button>
    </div>
    <!--
    //--------------------------------
    -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in filterNotes"
          class="list-group-item" href="#"
          :class="{active: activeNote === note}"
          @click="updateActiveNote(note)">
          <h4 class="list-group-item-heading">
            {{note.txt.trim().substring(0, 30)}}
          </h4>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import {updateActiveNote} from '../vuex/actions';
export default {
  data(){
    return {
      all:"all"
    };
  },
  vuex:{
    getters:{
      notes:state=>state.notes
    },
    actions:{
      updateActiveNote
    }
  },
  computed:{
    filterNotes:function(){
      if(this.all=="all"){
        return this.notes;
      }else{
        return this.notes.filter(state=>state.favorite);
      }
    }
  }
};
</script>