import axios from "axios";
// import router from "../../../router";

const state= {
    navigationState:null,
    navigationView:false,
    cover:0,
    subCategory:0,
    insuranceCoverDetails: null,
    personalDetails: null,
    personalDetailStatus: false
}
const mutations = {
    UPDATING_THE_STATE_TO_ADD_NAVIGATION_ITEMS(state,payload){
        state.navigationState = payload;
    },
    UPDATING_THE_STATE_OF_THE_NAVIGATION_VIEW(state,payload){
        state.navigationView = payload
    },
    UPDATING_THE_COVER_INDEX(state,payload){

        state.cover = payload;
    },
    UPDATING_THE_SUB_COVER_INDEX(state,payload){

        state.subCategory = payload;
    },
    UPDATING_THE_INSURANCE_COVER_DETAILS(state,payload){
            state.insuranceCoverDetails = payload;
    },
    UPDATING_PERSONAL_DETAILS(state,payload){
            state.personalDetails = payload;
    },
    UPDATING_PERSONAL_DETAILS_STATUS(state,payload){
        state.personalDetailStatus = payload;
}
}
const actions = {
    getAllNavigationComponents({commit}){

        axios.get('https://mrinsuranceapi.georgekprojects.tk/api/navigationContent').then(
            response => {
                if (response.status === 200) {
                    commit("UPDATING_THE_STATE_TO_ADD_NAVIGATION_ITEMS",response.data);
                    commit("UPDATING_THE_STATE_OF_THE_NAVIGATION_VIEW",true);
                } 
                console.log(response);
            }
        ).catch(
            error=>{
                console.log(error);
            }
        );

    },
    updatingTheCoverIndex({commit},index){

        commit("UPDATING_THE_COVER_INDEX",index);        

    },

    updatingTheSubCategoryCoverIndex({commit},index){

        commit("UPDATING_THE_SUB_COVER_INDEX",index);        

    },
    updatingTheInsuranceCoverDetails({commit},data){

        commit("UPDATING_THE_INSURANCE_COVER_DETAILS",data);

    },
    updatingPersonalDetails({commit},data){

        commit("UPDATING_PERSONAL_DETAILS",data);
        commit("UPDATING_PERSONAL_DETAILS_STATUS",true);
        

    }
    
}
const getters = {
    navigationStateGetter: state => state.navigationState,
    navigationViewGetter: state => state.navigationView,
    navigationCoverGetter: state =>state.cover, 
    navigationSubCategory: state => state.subCategory, 
    insuranceCoverDetailsGetter: state => state.insuranceCoverDetails,
    personalDetailsGetter: state => state.personalDetails,
    personalDetailsStatusGetter: state => state.personalDetailStatus,
}

const NavigationModule = {state,mutations,actions,getters}

export default NavigationModule

