import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //音乐播放的url
        musicUrl: '',
        //是否播放音乐
        isPlay: '',
        //当前播放歌单的所有id
        musicListID: [],
        //当前播放音乐的id
        nowMusicId: '',
        //下一首播放音乐的id
        nextId: '',
        //用户的信息
        userInfo: {},
        //用户的id
        userID: '',
        //关键词音乐数据
        keywordMusic: []
    },
    mutations: {
        //存入现在的url
        INIT_MUSICURL(state, playLoad) {
            state.musicUrl = playLoad
        },
        INIT_keywordMusic(state, playLoad) {
            state.keywordMusic = playLoad
        },
        INIT_userID(state, playLoad) {
            state.userID = playLoad
        },
        INIt_ISPLAY(state, isPlay) {
            state.isPlay = isPlay
        },
        INIT_musicListID(state, payload) {
            state.musicListID = payload
        },
        INIT_nowMusicId(state, payload) {
            state.nowMusicId = payload
        },
        INIT_userInfo(state, payload) {
            state.userInfo = payload
        },

        NEXT_ID(state, playload) {
            for (let i = 0; i < state.musicListID.length; i++) {
                if (state.musicListID[i] == playload) {
                    state.nextId = state.musicListID[i + 1]
                }
            }
        }
    },
    actions: {},
    modules: {}
})