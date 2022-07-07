import REALTIMECOMMENT_ACTIONS from "./realtimeComment-actions"

const REALTIMECOMMENT_STORE = {
    state: () => ({
        commentList: []
    }),

    actions: {
        changeCommentList({ commit }, newComment) {
            commit(REALTIMECOMMENT_ACTIONS.changeCommentList, newComment)
        },

        replaceCommentList({ commit }, newComment) {
            commit(REALTIMECOMMENT_ACTIONS.replaceCommentList, newComment)
        },
    },

    mutations: {
        changeCommentList(state, newComment) {
            state.commentList.push(newComment)
        },

        replaceCommentList(state, newComment) {
            state.commentList = [...newComment]
        }
    },

    getters: {
        commentList: state => state.commentList
    }
}

export default REALTIMECOMMENT_STORE