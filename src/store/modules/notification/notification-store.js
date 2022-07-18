import NOTIFICATION_ACTIONS from "./notification-actions"

const NOTIFICATION_STORE = {
    state: () => ({
        notificationList: [],
        numberOfNotification: 0
    }),

    actions: {
        addNotification({ commit }, newNotification) {
            commit(NOTIFICATION_ACTIONS.addNotification, newNotification)
        },

        replaceNotificationList({ commit }, newNotificationList) {
            commit(NOTIFICATION_ACTIONS.replaceNotificationList, newNotificationList)
        },

        changeNumberOfNotification({ commit }, newNumber) {
            commit(NOTIFICATION_ACTIONS.changeNumberOfNotification, newNumber)
        }
    },

    mutations: {
        addNotification(state, newNotification) {
            if (newNotification.is_deleted === 0) {
                state.notificationList.unshift(newNotification)
                state.numberOfNotification += 1;
            }
            else {
                var notificationIndex = -1
                state.notificationList.forEach((notification, index) => {
                    if (notification.id === newNotification.id) {
                        notificationIndex = index
                    }
                });

                if (notificationIndex > -1) {
                    let newNotificationList = state.notificationList
                    newNotificationList.splice(notificationIndex, 1)
                    state.notificationList = [...newNotificationList]
                }
            }
        },

        replaceNotificationList(state, newNotificationList) {
            let filteredNotification = newNotificationList.filter(notification => notification.is_deleted === 0)
            filteredNotification.sort(function (a, b) {
                return b.id - a.id;
            });
            state.notificationList = [...filteredNotification];
        },

        changeNumberOfNotification(state, newNumber) {
            state.numberOfNotification = newNumber
        }
    },

    getters: {
        notificationList: state => state.notificationList,
        numberOfNotification: state => state.numberOfNotification
    }
}

export default NOTIFICATION_STORE