import { createStore } from "vuex";
import VuexORM from "@vuex-orm/core";
import vuexPersistedstate from "vuex-persistedstate";

const database = new VuexORM.Database();

const store = createStore({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{},
    plugins:[VuexORM.install(database), vuexPersistedstate()]
});

export default store;