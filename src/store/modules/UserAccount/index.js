const state = {
    userName:null,
    userFirstName: null,
    userSecondName: null,
    userPhoneNumber:null,
    userEmailAddress:null,
};
const mutations = {
    UPDATING_USERS_NAME(state,payload){

        state.userName = payload;

    },
    UPDATING_USERS_FIRST_NAME(state,payload){

        state.userFirstName = payload;

    },
    UPDATING_USERS_SECOND_NAME(state,payload){

        state.userSecondName = payload;

    },
    UPDATING_USERS_PHONE_NUMBER(state,payload){

        state.userPhoneNumber = payload;

    },
    UPDATING_USERS_EMAIL_ADDRESS(state,payload){

        state.userEmailAddress = payload;

    },
};
const actions = {};
const getters = {
    userNameStateGetter: (state) =>state.userName,
    userFirstNameStateGetter: (state) =>state.userFirstName,
    userSecondNameStateGetter: (state) =>state.userSecondName,
    userPhoneNumberStateGetter: (state) =>state.userPhoneNumber,
    userEmailAddressStateGetter: (state) =>state.userEmailAddress,
};

const UserAccount = {
    state,
    mutations,
    actions,
    getters
}

export default UserAccount