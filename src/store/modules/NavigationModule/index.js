import axios from "axios";
// import router from "../../../router";

const state= {
    navigationState:null,
    navigationView:false,
}
const mutations = {
    UPDATING_THE_STATE_TO_ADD_NAVIGATION_ITEMS(state,payload){
        state.navigationState = payload;
    },
    UPDATING_THE_STATE_OF_THE_NAVIGATION_VIEW(state,payload){
        state.navigationView = payload
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

    }
}
const getters = {
    navigationStateGetter: state => state.navigationState,
    navigationViewGetter: state => state.navigationView
}

const NavigationModule = {state,mutations,actions,getters}

export default NavigationModule

