import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const state = {
    navigationState: null,
    navigationView: false,
    cover: 0,
    subCategory: 0,
    insuranceCoverDetails: null,
    personalDetails: null,
    personalDetailStatus: false,
    insuranceCoverData: null,
    premiumsData: null,
    premiumsDataStatus: false,

    // ! details related to the insurance covers that have been returned. 
    payableAmountState: null,
    financialBreakdownState: null,

    // ! activating Additional Premiums. 
    additionalCoversPremiumState: null,
}
const mutations = {
    UPDATING_THE_STATE_TO_ADD_NAVIGATION_ITEMS(state, payload) {
        state.navigationState = payload;
    },
    UPDATING_THE_STATE_OF_THE_NAVIGATION_VIEW(state, payload) {
        state.navigationView = payload
    },
    UPDATING_THE_COVER_INDEX(state, payload) {

        state.cover = payload;
    },
    UPDATING_THE_SUB_COVER_INDEX(state, payload) {

        state.subCategory = payload;
    },
    UPDATING_THE_INSURANCE_COVER_DETAILS(state, payload) {
        state.insuranceCoverDetails = payload;
    },
    UPDATING_PERSONAL_DETAILS(state, payload) {
        state.personalDetails = payload;
    },
    UPDATING_PERSONAL_DETAILS_STATUS(state, payload) {
        state.personalDetailStatus = payload;
    },
    UPDATING_PREMIUM_DETAILS(state, payload) {
        state.premiumsData = payload;
    },
    UPDATING_PREMIUM_DETAILS_STATUS(state, payload) {
        state.premiumsDataStatus = payload;
    },
    UPDATING_THE_PAYABLE_AMOUNT(state, payload) {
        state.payableAmountState = payload;
    },
    UPDATING_THE_FINANCIAL_BREAKDOWN(state, payload) {
        state.financialBreakdownState = payload;
    },
    UPDATING_THE_ADDITIONAL_PREMIUM(state,payload){
            state.additionalCoversPremiumState = payload;
    }

}
const actions = {
    getAllNavigationComponents({ commit }) {

        axios.get('https://mrinsuranceapi.georgekprojects.tk/api/navigationContent').then(
            response => {
                if (response.status === 200) {
                    commit("UPDATING_THE_STATE_TO_ADD_NAVIGATION_ITEMS", response.data);
                    commit("UPDATING_THE_STATE_OF_THE_NAVIGATION_VIEW", true);
                }
                console.log(response);
            }
        ).catch(
            error => {
                console.log(error);
            }
        );

    },
    updatingTheCoverIndex({ commit }, index) {

        commit("UPDATING_THE_COVER_INDEX", index);

    },

    updatingTheSubCategoryCoverIndex({ commit }, index) {

        commit("UPDATING_THE_SUB_COVER_INDEX", index);

    },
    updatingTheInsuranceCoverDetails({ commit }, data) {

        commit("UPDATING_THE_INSURANCE_COVER_DETAILS", data);

    },
    updatingPersonalDetails({ commit }, data) {

        commit("UPDATING_PERSONAL_DETAILS", data);
        commit("UPDATING_PERSONAL_DETAILS_STATUS", true);

    },
    postingTheDataForCoverSearch({ commit }) {

        // ! creating an object to hold the posted data.
        var coverDetails = {};
        for (const [key, value] of Object.entries(state.insuranceCoverDetails)) {
            coverDetails[key] = value;
        }

        var personalDetails = {};
        for (const [key, value] of Object.entries(state.personalDetails)) {
            personalDetails[key] = value;
        }

        var obj = {};
        obj['insuranceCoverDetails'] = coverDetails;
        obj['personalDetails'] = personalDetails;
        obj['coverId'] = state.navigationState[state.cover].id;
        obj['subCategoryId'] = state.navigationState[state.cover].subCategories[state.subCategory].id;
        // ! posting the data to the API endpoint. 

        axios.post("https://mrinsuranceapi.georgekprojects.tk/api/insuranceCovers", obj).then(
            response => {
                if (response.status === 200) {
                    // ! updating the premium data. 
                    commit("UPDATING_PREMIUM_DETAILS", response.data);

                    // ! creating the cost and the cost breakdown details and mutating them.
                    console.log(response.data);
                    var payableAmounts = {};
                    var combinedHealthFinancialBreakDown = [];
                    response.data.forEach(element => {
                        switch (element.cover.route_name) {
                            case 'Health':
                                // ! creating an array that will hold the financial breakdown and the amounts payable.

                                // ! implementing the PayaBle Amounts. 
                                payableAmounts[element.uuid] = element.payableCash;

                                // ! implementing the Financial Breakdown.                           

                                // ! getting the principal member financial
                                var healthFinancialBreakDown = {};
                                var principal_memberDetails = [];
                                principal_memberDetails["name"] = "Principal Member";
                                principal_memberDetails["description"] = " ' ' ";
                                principal_memberDetails["value"] =
                                    element.financialBreakDown.principal_member
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";

                                healthFinancialBreakDown['principal_member'] = principal_memberDetails;

                                if (element.financialBreakDown.spouse) {
                                    var spouse_details = [];
                                    spouse_details["name"] = "Spouse";
                                    spouse_details["value"] =
                                        element.financialBreakDown.spouse
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
                                    spouse_details["description"] = " ' ' ";
                                    healthFinancialBreakDown['spouse'] = spouse_details;
                                }

                                if (element.financialBreakDown.dependents) {
                                    var dependents_details = [];
                                    dependents_details["name"] = "Children";
                                    dependents_details["value"] =
                                        (
                                            element.financialBreakDown.dependents.dependant *
                                            parseInt(
                                                element.financialBreakDown.dependents.number_of_dependents
                                            )
                                        )
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
                                    dependents_details["description"] =
                                        element.financialBreakDown.dependents.number_of_dependents +
                                        " Dependents Each  " +
                                        element.financialBreakDown.dependents.dependant
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                                        "Ksh";
                                    healthFinancialBreakDown['dependents'] = dependents_details;
                                }
                                combinedHealthFinancialBreakDown[element.uuid] = healthFinancialBreakDown;
                                break;
                            case 'Motor':
                                console.log("This is Motor.");
                                break;

                            default:
                                break;
                        }
                    });
                    commit("UPDATING_THE_PAYABLE_AMOUNT", payableAmounts);
                    commit("UPDATING_THE_FINANCIAL_BREAKDOWN", combinedHealthFinancialBreakDown);                                        
                    commit("UPDATING_PREMIUM_DETAILS_STATUS", true);
                }
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    },
    updatingPremiumDataStatus({ commit }, data) {
        commit("UPDATING_PREMIUM_DETAILS_STATUS", data);
    },

    // ! function to implement the functionality to add covers and disable the premiums that have been activated. 
    activatingAdditionalCovers({ commit }, data) {
        
        //! creating the additional cover Details state. 
        var allAdditionalCovers = {};
        var additionalCover = [];  
        if (state.additionalCoversPremiumState === null) {
            console.log("The additionalCoversPremiumState is null.");
                     
            additionalCover['additionalId'] = data.additionalId;
            additionalCover['premiumUUID'] = data.premiumUUID;
            additionalCover['additionalPremiumID'] = data.additionalPremiumID;
            allAdditionalCovers[uuidv4()] = additionalCover;            
            commit("UPDATING_THE_ADDITIONAL_PREMIUM",allAdditionalCovers);            
        }
        else{
            
            
            for (var oldState in state.additionalCoversPremiumState) {
                allAdditionalCovers[uuidv4()] = state.additionalCoversPremiumState[oldState];
                console.log(oldState);
                console.log("This is the Old State.");
                
            }
            

            additionalCover['additionalId'] = data.additionalId;
            additionalCover['premiumUUID'] = data.premiumUUID;
            additionalCover['additionalPremiumID'] = data.additionalPremiumID;
            allAdditionalCovers[uuidv4()] = additionalCover;            
            commit("UPDATING_THE_ADDITIONAL_PREMIUM",allAdditionalCovers);
            console.log("This is all the additional Covers.");
            console.log(allAdditionalCovers);
        }        
    }
}
const getters = {
    navigationStateGetter: state => state.navigationState,
    navigationViewGetter: state => state.navigationView,
    navigationCoverGetter: state => state.cover,
    navigationSubCategory: state => state.subCategory,
    insuranceCoverDetailsGetter: state => state.insuranceCoverDetails,
    personalDetailsGetter: state => state.personalDetails,
    personalDetailsStatusGetter: state => state.personalDetailStatus,
    premiumsDataGetter: state => state.premiumsData,
    premiumsDataStatusGetter: state => state.premiumsDataStatus,
    payableAmountStateGetter: state => state.payableAmountState,
    financialBreakdownStateGetter: state => state.financialBreakdownState,
    additionalCoversPremiumStateGetter: state => state.additionalCoversPremiumState,


}

const NavigationModule = { state, mutations, actions, getters }

export default NavigationModule

