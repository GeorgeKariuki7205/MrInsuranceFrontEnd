import axios from "axios";
import {
    v4 as uuidv4
} from 'uuid';
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

    // ! creating the status to update and moveto the next step in filling the form.
    nextStepInStepper: 1,

    // ! this state is used to update the insurace premium additionalCovers. 
    insurancePremiumAdditionalCovers: [],
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
    UPDATING_THE_ADDITIONAL_PREMIUM(state, payload) {
        state.additionalCoversPremiumState = payload;
    },
    UPDATING_THE_NEXT_STEP_IN_STEPPER(state, payload) {
        state.nextStepInStepper = payload;
    }

}
const actions = {
    getAllNavigationComponents({
        commit
    }) {

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
    updatingTheCoverIndex({
        commit
    }, index) {

        commit("UPDATING_THE_COVER_INDEX", index);

    },

    updatingTheSubCategoryCoverIndex({
        commit
    }, index) {

        commit("UPDATING_THE_SUB_COVER_INDEX", index);

    },
    updatingTheInsuranceCoverDetails({
        commit
    }, data) {

        commit("UPDATING_THE_INSURANCE_COVER_DETAILS", data);

    },
    updatingPersonalDetails({
        commit
    }, data) {

        commit("UPDATING_PERSONAL_DETAILS", data);
        commit("UPDATING_PERSONAL_DETAILS_STATUS", true);

    },
    postingTheDataForCoverSearch({
        commit
    }) {

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
                                payableAmounts[element.uuid] = element.amountPayable;

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
                    commit("UPDATING_PREMIUM_DETAILS_STATUS", false);
                }
            }
        ).catch(
            error => {
                console.log(error);
            }
        );
    },
    updatingPremiumDataStatus({
        commit
    }, data) {
        commit("UPDATING_PREMIUM_DETAILS_STATUS", data);
    },

    // ! function to implement the functionality to add covers and disable the premiums that have been activated. 
    activatingAdditionalCovers({
        commit,dispatch
    }, data) {

        //! creating the additional cover Details state. 
        var allAdditionalCovers = {};
        var additionalCover = [];
        if (state.additionalCoversPremiumState === null) {
            // console.log("The additionalCoversPremiumState is null.");

            additionalCover['additionalId'] = data.additionalId;
            additionalCover['premiumUUID'] = data.premiumUUID;
            additionalCover['additionalPremiumID'] = data.additionalPremiumID;
            allAdditionalCovers[uuidv4()] = additionalCover;
            commit("UPDATING_THE_ADDITIONAL_PREMIUM", allAdditionalCovers);
            dispatch("updateAdditionalCovresAddedOrRemoved");
        } else {


            for (var oldState in state.additionalCoversPremiumState) {
                allAdditionalCovers[uuidv4()] = state.additionalCoversPremiumState[oldState];
                // console.log(oldState);                
            }


            additionalCover['additionalId'] = data.additionalId;
            additionalCover['premiumUUID'] = data.premiumUUID;
            additionalCover['additionalPremiumID'] = data.additionalPremiumID;
            allAdditionalCovers[uuidv4()] = additionalCover;
            commit("UPDATING_THE_ADDITIONAL_PREMIUM", allAdditionalCovers);
            // console.log("This is all the additional Covers.");
            // console.log(allAdditionalCovers);
            console.log("I AM DISPATCHING IN THE ADDING ADDITIONAL COVERS ACTION.");
            dispatch("updateAdditionalCovresAddedOrRemoved");
        }
    },   
    // ! function to update the amounts payable.

    updatePayableAmount({commit},data){

        var newPayableAmount = {};

        for (const payableAmount in state.payableAmountState) {
            if (payableAmount === data.premiumUUId) {

                if (data.functionality === 'subtract') {
                    newPayableAmount[payableAmount] = state.payableAmountState[payableAmount]-data.cost;
                } else {
                    newPayableAmount[payableAmount] = state.payableAmountState[payableAmount]+data.cost;
                }
                
            } else {
                newPayableAmount[payableAmount] = state.payableAmountState[payableAmount];
            }
        }
        commit("UPDATING_THE_PAYABLE_AMOUNT",newPayableAmount);

        
    },

     updateTheAdditionalCover({commit,dispatch},obj){
    //* updateTheAdditionalCover({commit}){        
        var premiumUUIDValue = obj.premium;               
        var stateDefined = state.additionalCoversPremiumState;
        var elementValue;
        for (const element in stateDefined) { 
                 
            if (stateDefined[element].premiumUUID === premiumUUIDValue) {   
                 
                if (stateDefined[element].additionalId === obj.additionalId) {
                    elementValue = element;
                    console.log("This is what is being deleted: ");                     
                    console.log(stateDefined[element]);
                    console.log(obj);
                }
                
            }
        } 
        delete state.additionalCoversPremiumState[elementValue];                       
        var stateOfPrmium = state.additionalCoversPremiumState;
        // console.log("This is the deleted state");
        // console.log(state.additionalCoversPremiumState);             
        if (Object.keys(state.additionalCoversPremiumState).length === 0) {
            commit("UPDATING_THE_ADDITIONAL_PREMIUM",null);
            // console.log("I have deleted and updated to null.");
        }
        else{
            commit("UPDATING_THE_ADDITIONAL_PREMIUM",stateOfPrmium);
            console.log("I have deleted and updated to apppropriate values..");
        }
        

        //!  dispatch the method to update the payable amount.
        var object = {};
        object['premiumUUId'] = premiumUUIDValue;
        object['cost'] = obj.cost;
        object['functionality'] = 'subtract';
        dispatch("updatePayableAmount",object);

        // commit("UPDATING_THE_ADDITIONAL_PREMIUM", "oness");

        console.log("I AM DISPATCHING IN THE DELETING ADDITIONAL COVERS ACTION.");
        dispatch("updateAdditionalCovresAddedOrRemoved");

    },

    // ! THIS METHOD ID USED TO UPDATE THE ADDITIONAL COVERS SELECTED AND THOSE THAT HAVE NOT BEEN SELECTED FOR A PARTICULAR 
    // ! INSURANCE PREMIUM. 

    updateAdditionalCovresAddedOrRemoved(){
       var premiums = state.premiumsData;
       var currentAddedAdditionals = state.additionalCoversPremiumState;
        // insurancePremiumAdditionalCovers 

        console.log("This is the new function to update the additional Covers: ");
        console.log("NEW NEW !!!! NEW FUNCTION.");
        // console.log(premiumsSelected);
        // console.log("The Current Additional Covers in the methos Dispatch:  ");
        // console.log(currentAddedAdditionals);

        for (const premium in premiums) {

            var premiumUUID = premiums[premium].uuid;
            var newOtherAdditional = {};
            var count = 0;
            var count2 = 0;
      
            for (const prop in premiums[premium].additionalCovers) {
              // console.log(prop);
              prop.id;
              ++count;
            }
      
            for (const prop in currentAddedAdditionals) {
              // console.log(prop);
              prop.id;
              ++count2;
            }

            var qualifier = count - count2;
            var counter = 0;

            // ! looping through the additional Covers: 

            for (const additionalCover in premiums[premium].additionalCovers) {
                var checker = 0;
        
                for (const additionalCoverSelected in currentAddedAdditionals) {
                    
                if (currentAddedAdditionals[additionalCoverSelected].premiumUUID === premiumUUID) {            
                    if (
                        premiums[premium].additionalCovers[additionalCover]["id"] !==
                        currentAddedAdditionals[additionalCoverSelected][
                        "additionalId"
                        ]
                    ) {
                        ++checker;

                            console.log("I have gotten the additionals that have a relationship in the dispach method.");
                            console.log(currentAddedAdditionals[additionalCoverSelected]);
                            console.log("This are the IDS that are reated t the conruency of the data.");
                            console.log(premiums[premium].additionalCovers[additionalCover]["id"] + " AND " + currentAddedAdditionals[additionalCoverSelected]["additionalId"]);

                    }
                }                  
                }
        
                if (checker == qualifier) {
                  newOtherAdditional[checker] = premiums[premium].additionalCovers[
                    additionalCover
                  ];
                }
        
                counter + 1;
              }

              state.insurancePremiumAdditionalCovers[premiumUUID] = newOtherAdditional;

              console.log("This is the other not Selected Final: ");
              console.log(state.insurancePremiumAdditionalCovers);

        }
    },
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
    nextStepInStepperStateGetter: state => state.nextStepInStepper,
    insurancePremiumAdditionalCoversGetter: state => state.insurancePremiumAdditionalCovers,

}

const NavigationModule = {
    state,
    mutations,
    actions,
    getters
}

export default NavigationModule