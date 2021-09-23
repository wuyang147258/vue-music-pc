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
        keywordMusic: [],
        //监听音乐是否结束
        endmusic: '',
        //当前音乐播放进度
        currentTime: '',
        //点击了左一首
        clickLeft: '',

        //点击了下一首歌曲
        clickRight: '',


    },
    mutations: {
        //存入现在的url
        INIT_MUSICURL(state, playLoad) {
            state.musicUrl = playLoad
        },

        INIT_CURRENTTIME(state, playLoad) {
            state.currentTime = playLoad
        },
        INIT_keywordMusic(state, playLoad) {
            state.keywordMusic = playLoad
        },
        INIT_userID(state, playLoad) {
            state.userID = playLoad
        },
        INIT_CLICKRIGHT(state, playLoad) {
            state.clickRight = playLoad
        },
        INIt_CLICKLEFT(state, playLoad) {
            state.clickLeft = playLoad
        },
        INIt_LEFTMUSICLEFT(state, playLoad) {
            state.leftMusicId = playLoad
        },
        INIt_ENDMUSIC(state, playLoad) {
            state.endmusic = playLoad
        },
        INIT_musicListID(state, payload) {
            state.musicListID = payload
        },
        INIT_nowMusicId(state, payload) {
            state.nowMusicId = payload
        },
        INIt_ISPLAY(state, payload) {
            state.isPlay = payload
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