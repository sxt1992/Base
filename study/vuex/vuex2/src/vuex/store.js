import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

let state={
    notes:[],
    activeNote:{}
};
window.t = state;
let mutations = {
    ADD_NOTE(state) {
        let newNote = {
            txt: "new note",
            favorite:false
        };
        state.notes.push(newNote);
        state.activeNote = newNote;
    },
    EDIT_NOTE(state, value) {
        if (state.activeNote.txt == null) {
            return;
        }
        state.activeNote.txt = value;
    },
    DELETE_NOTE(state) {
        state.notes.$remove(state.activeNote)
        state.activeNote = state.notes[0];
    },
    SET_ACTIVE_NOTE(state, note) {
        state.activeNote = note;
    },
    TOGGLE_FAVORITE(state) {
        state.activeNote.favorite = !state.activeNote.favorite;
    }
};

export default new Vuex.Store({
    state,
    mutations
});