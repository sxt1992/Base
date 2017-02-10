<template>
  <div id="note-editor">
    <textarea :value="activeNoteValue" @input="editNote" cols="200"></textarea>
  </div>
</template>
<script>
import {editNote} from '../vuex/actions';
export default {
  data(){
    return {
      all:"all"
    };
  },
  vuex:{
    getters:{
      activeNoteValue:state=>{
        if(state.activeNote.txt==null){
          return "";
        }
        return state.activeNote.txt;
      }
    },
    actions:{
      editNote
    }
  }
};
</script>