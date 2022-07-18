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
            if (newComment.is_deleted === 0) {
                state.commentList.push(newComment)
            }
            else {
                var commentIndex = -1
                state.commentList.forEach((comment, index) => {
                    if (comment.id === newComment.id) {
                        commentIndex = index
                    }
                });

                if (commentIndex > -1) {
                    let newCommentList = state.commentList
                    newCommentList.splice(commentIndex, 1)
                    state.commentList = [...newCommentList]
                }
            }
        },

        replaceCommentList(state, newComment) {
            let filteredComment = newComment.filter(comment => comment.is_deleted === 0)
            state.commentList = [...filteredComment]
        }
    },

    getters: {
        commentList: state => state.commentList
    }
}

export default REALTIMECOMMENT_STORE