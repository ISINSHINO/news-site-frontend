
import Vue from 'vue'
import Vuex from 'vuex'
import {postsModule} from '@/store/modules/postsModule'
import {userModule} from '@/store/modules/userModule'
import {errorModule} from '@/store/modules/errorModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    post: postsModule,
    user: userModule,
    error: errorModule
  }
})