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

    updatingSubCategoryAndCoverState: false,
    // ! details related to the insurance covers that have been returned. 
    payableAmountState: null,

    // ! creating the tate that will be holding the financial breakdown of the insurance premium.
    financialBreakdownState: null,

    // ! creating the initial finacial breakdown of the premiums. 

    // ! activating Additional Premiums. 
    additionalCoversPremiumState: null,

    // ! creating the status to update and moveto the next step in filling the form.
    nextStepInStepper: 1,

    // ! this state is used to update the insurace premium additionalCovers. 
    insurancePremiumAdditionalCovers: [],

    // ! this is the state that is used to update the snackbars upon adding an additional INusrance Cover:  
    additionalCoverSnackBar: [],

    // ! this is the state that is used to update the snackbars upon removing an additional INusrance Cover:  
    removingCoverSnackBar: [],

    editingPersonalDetailsOnPurchasingModal: false,

    // ! this is the test factor.

    test : 'test',

    // ! this state is used to keep the status of the sending the request to request for payments by MPESA.

    sendingPaymentRequestStatus: false,

    // ! this state is used to keep the state of successfully sending the STK Push to the correct phone number.

    sendingPaymentRequestSuccessful: false,

    // ! this is the initial state of the comment of the payment.

    sendingRequestForPaymentInitialState: true,

    // ! this is the not successful request for payent.

    sendingRequestForPaymentNotSuccessful: false,

    // ! payment Details Status.

    paymentDetailsGetter: [],

    // ! paymentProcesed Successfully. 

    paymentProcessedSuccesfully: false,

    // ! state for the VisitorId 
    visitorIdState: null,

}
const mutations = {    
    UPDATING_VISITOR_ID_STATE(state,payload){
        state.visitorIdState = payload;
    },
    UPDATING_PAYMENT_PROCESSED_SUCCESSFULLY(state,payload){
        state.paymentProcessedSuccesfully = payload;
    },
    UPDATING_PAYMENT_PROCCESSED_SUCCESSFULLY(state,payload){
        state.paymentProcessedSuccesfully = payload;
    },
    UPDATING_SENDING_PAYMENTS_REQUEST_STATUS(state,payload){

        state.sendingPaymentRequestStatus = payload;
    },
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
    },

    UPDATING_THE_ADDITIONAL_SNACKBAR_STATE_DATA(state, payload) {
        state.additionalCoverSnackBar = payload;
    },

    UPDATING_THE_REMOVAL_SNACKBAR_STATE_DATA(state, payload) {
        state.removingCoverSnackBar = payload;
    },
    UPDATING_EDITING_PERONAL_DETAILS_ON_PURCHASE(state, payload) {
        state.editingPersonalDetailsOnPurchasingModal = payload;
    },
    UPDATING_ADDITIONAL_COVERS_STATE(state, payload){
        state.additionalCoversPremiumState = payload;
    },
    UPDATING_THE_TEST_VALUE(state, payload){
            state.test = payload;
    },
    UPDATING_THE_STATE_OF_COVER_AND_SUB_CATEGORY(state,payload){
        state.updatingSubCategoryAndCoverState = payload;
    },
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
    updatatingupdatingSubCategoryAndCoverState({commit},data){

        commit("UPDATING_THE_STATE_OF_COVER_AND_SUB_CATEGORY",data);

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
        obj['visitorId'] = state.visitorIdState;
        
        var caseObtained;        
        axios.post("https://mrinsuranceapi.georgekprojects.tk/api/insuranceCovers", obj).then(
            response => {
                if (response.status === 200) {
                    // ! updating the premium data. 
                    commit("UPDATING_PREMIUM_DETAILS", response.data);

                    // ! updating The Visitor Id. 

                    commit("UPDATING_VISITOR_ID_STATE",response.data[0].visitorId);

                    // ! creating the cost and the cost breakdown details and mutating them.
                    console.log(response.data);
                    var payableAmounts = {};
                    var combinedHealthFinancialBreakDown = {};
                    var combinedMotorFinancialBreakDownObject = {};                
                    var additionalCoversInitialStates = {};

                    response.data.forEach(element => {
                        switch (element.cover.route_name) {
                            case 'Health':
                                // ! creating an array that will hold the financial breakdown and the amounts payable.

                                // ! implementing the PayaBle Amounts. 
                                caseObtained = 'Health';
                                payableAmounts[element.uuid] = element.amountPayable;
                                additionalCoversInitialStates[element.uuid] = null;
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
                                principal_memberDetails["uuid"] = "Principal Member";
                                principal_memberDetails["additionId"] = "Principal Member";

                                healthFinancialBreakDown['principal_member'] = principal_memberDetails;

                                if (element.financialBreakDown.spouse) {
                                    var spouse_details = [];
                                    spouse_details["name"] = "Spouse";
                                    spouse_details["value"] =
                                        element.financialBreakDown.spouse
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "Ksh";
                                    spouse_details["description"] = " ' ' ";
                                    spouse_details["uuid"] = "Spouse";
                                    spouse_details["additionId"] = "Spouse";
                                    healthFinancialBreakDown['spouse'] = spouse_details;
                                }

                                if (element.financialBreakDown.dependents) {
                                    var dependents_details = [];
                                    dependents_details["uuid"] = "Children";
                                    dependents_details["additionId"] = "Children";
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
                                caseObtained = 'Motor';
                                // console.log("This is Motor.");
                                // ! implementing the PayaBle Amounts.                                 
                                payableAmounts[element.uuid] = element.amountPayable;
                                additionalCoversInitialStates[element.uuid] = null;
                                      var financial_break_down_array = {};
                                        var motor_insurance_details = [];
                                        motor_insurance_details["uuid"] = element.subCategory;
                                        motor_insurance_details["additionId"] = element.subCategory;
                                        motor_insurance_details["name"] = element.subCategory;
                                        motor_insurance_details["value"] =
                                        element.amountPayable
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Ksh";
                                        motor_insurance_details["description"] = " ";
                                        financial_break_down_array[element.subCategory] = motor_insurance_details;  
                                        combinedMotorFinancialBreakDownObject[element.uuid] = financial_break_down_array;    
                                       
                                break;

                            default:
                                break;
                        }
                    });
                    commit("UPDATING_THE_PAYABLE_AMOUNT", payableAmounts);
                    if (caseObtained === 'Motor') {
                        commit("UPDATING_THE_FINANCIAL_BREAKDOWN", combinedMotorFinancialBreakDownObject);
                    } else if(caseObtained === 'Health'){
                        commit("UPDATING_THE_FINANCIAL_BREAKDOWN", combinedHealthFinancialBreakDown);
                    }
                    
                    commit("UPDATING_PREMIUM_DETAILS_STATUS", false);
                    commit("UPDATING_ADDITIONAL_COVERS_STATE",additionalCoversInitialStates);                   
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


    // !  this function is used to update the state of the financial Breakdown. 

    updatingFinancialBreakdown({
        commit
    }, data) {
        
        commit("UPDATING_THE_FINANCIAL_BREAKDOWN", data);
        // console.log("This is the second Input Of The application: ");
        // console.log(second);
        // console.log("This is the financialBreakdownState after update: ");
        // console.log(state.financialBreakdownState);

    },

    // ! creating the function that will be used to update the financial breakdown of the premiums. 

    updatingTheFinancialBreakDown({commit},obj) {       
        var activity = obj.activity;
        var financialBreakDownStateDefined = state.financialBreakdownState[obj.uuid];
        if (activity === 'remove') {

            for (const key in financialBreakDownStateDefined) {
                if (financialBreakDownStateDefined[key].uuid === obj.uuid) {
                    if (financialBreakDownStateDefined[key].additionId === obj.additionId) {
                        delete financialBreakDownStateDefined[key];
                    }
                }
            }
            commit("UPDATING_THE_TEST_VALUE",'test2');

        } else if (activity === 'add') {
           
            state.financialBreakdownState[obj.uuid][obj.name] = obj;
            // commit("UPDATING_THE_FINANCIAL_BREAKDOWN", financialBreakDownStateDefined);

        }

        // console.log("This is the object: ");
        // console.log(obj);
        // console.log("This is the financialBreakdownState");
        // console.log( state.financialBreakdownState);
    },

    // ! function to implement the functionality to add covers and disable the premiums that have been activated. 
    activatingAdditionalCovers({       
        dispatch
    }, data) {

        // console.log("THIS IS THE state.additionalCoversPremiumState[data.premiumUUID]:  ");
        // console.log(state.additionalCoversPremiumState[data.premiumUUID]);
        //! creating the additional cover Details state. 
        var allAdditionalCovers = [];
        var additionalCover = [];        
        if (state.additionalCoversPremiumState[data.premiumUUID] === null) {

            additionalCover['additionalId'] = data.additionalId;
            additionalCover['premiumUUID'] = data.premiumUUID;
            additionalCover['additionalPremiumID'] = data.additionalPremiumID;
            allAdditionalCovers[0] = additionalCover;            
            state.additionalCoversPremiumState[data.premiumUUID] = allAdditionalCovers;

            dispatch("updateAdditionalCovresAddedOrRemoved");                                
        } else {
            
            var counter = 0;
            for (const key in state.additionalCoversPremiumState[data.premiumUUID]) {
                
                allAdditionalCovers[counter] = state.additionalCoversPremiumState[data.premiumUUID][key];
                counter = counter+1;

            }
            additionalCover['additionalId'] = data.additionalId;
            additionalCover['premiumUUID'] = data.premiumUUID;
            additionalCover['additionalPremiumID'] = data.additionalPremiumID;
            allAdditionalCovers[counter] = additionalCover;            
            state.additionalCoversPremiumState[data.premiumUUID]= allAdditionalCovers;
            // console.log("This is the state of the state.additionalCoversPremiumState after adding.");
            // console.log(state.additionalCoversPremiumState);
            dispatch("updateAdditionalCovresAddedOrRemoved");
        }                     
    },
    // ! function to update the amounts payable.

    updatePayableAmount({
        commit
    }, data) {

        var newPayableAmount = {};

        for (const payableAmount in state.payableAmountState) {
            if (payableAmount === data.premiumUUId) {

                if (data.functionality === 'subtract') {
                    newPayableAmount[payableAmount] = state.payableAmountState[payableAmount] - data.cost;
                } else {
                    newPayableAmount[payableAmount] = state.payableAmountState[payableAmount] + data.cost;
                }

            } else {
                newPayableAmount[payableAmount] = state.payableAmountState[payableAmount];
            }
        }
        commit("UPDATING_THE_PAYABLE_AMOUNT", newPayableAmount);


    },

    updateTheAdditionalCover({        
        dispatch
    }, obj) {
        //* updateTheAdditionalCover({commit}){        
        var premiumUUIDValue = obj.premium;
        var stateDefined = state.additionalCoversPremiumState[obj.premium];
        // const trial  = state.additionalCoversPremiumState;
        // console.log("Before: ");
        // console.log(state.additionalCoversPremiumState);
        // console.log("Before Whole Array: ");
        // console.log(state.additionalCoversPremiumState[obj.premium]);
        var elementValue;
        for (const element in stateDefined) {

            if (stateDefined[element].premiumUUID === premiumUUIDValue) {

                if (stateDefined[element].additionalId === obj.additionalId) {
                    elementValue = element;
                }

            }
        }

        // console.log("Thi is the element being deleted: ");
        // console.log("This is the Element Value: "+elementValue);
        // console.log(state.additionalCoversPremiumState[obj.premium][elementValue]);
        (state.additionalCoversPremiumState[obj.premium]).splice(elementValue,1);
        var stateOfPrmium = state.additionalCoversPremiumState[obj.premium];


        if (Object.keys(state.additionalCoversPremiumState[obj.premium]).length === 0) {
            // commit("UPDATING_THE_ADDITIONAL_PREMIUM", null);
            state.additionalCoversPremiumState[obj.premium] = null;
        } else {
            // commit("UPDATING_THE_ADDITIONAL_PREMIUM", stateOfPrmium);
            state.additionalCoversPremiumState[obj.premium]= stateOfPrmium;
        }
       
        // console.log("After: ");
        // console.log(state.additionalCoversPremiumState[obj.premium]);
        // console.log("This is the whole array: ");
        // console.log(state.additionalCoversPremiumState);
        //!  dispatch the method to update the payable amount.
        var object = {};
        object['premiumUUId'] = premiumUUIDValue;
        object['cost'] = obj.cost;
        object['functionality'] = 'subtract';
        dispatch("updatePayableAmount", object);


        dispatch("updateAdditionalCovresAddedOrRemoved");


    },

    // ! THIS METHOD ID USED TO UPDATE THE ADDITIONAL COVERS SELECTED AND THOSE THAT HAVE NOT BEEN SELECTED FOR A PARTICULAR 
    // ! INSURANCE PREMIUM. 

    updateAdditionalCovresAddedOrRemoved() {
        var premiums = state.premiumsData;
        

       

        for (const premium in premiums) {

            var premiumUUID = premiums[premium].uuid;
            var newOtherAdditional = {};
            // var count = 0;
            var count2 = 0;
            var currentAddedAdditionals = state.additionalCoversPremiumState[premiumUUID];
            // count = Object.keys(currentAddedAdditionals).length;
            // console.log("Tis is the count: "+count);

            // console.log("These Are the current Additionals:");
            // console.log(currentAddedAdditionals);

            // for (const prop in premiums[premium].additionalCovers) {
            //     prop.id;
            //     ++count;
            // }

            for (const prop in currentAddedAdditionals) {
                prop.id;
                ++count2;
            }

            // if (premiums[premium].cover.name === 'Motor Insurance') {

            //     if (currentAddedAdditionals === null) {
            //          count2 = 0;
            //     } else {
            //         count2 = currentAddedAdditionals.length;
            //     }
                
            // }
            // console.log("This is the count2: "+count2);
            // count2 = Object.keys(currentAddedAdditionals).length;
            // var qualifier = count - count2;

            // console.log("Count: "+count+" Count2: "+count2 + " qualifier: "+qualifier);

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
                        }

                    }
                }

                
                if (checker >= count2) {
                    newOtherAdditional[counter] = premiums[premium].additionalCovers[
                        additionalCover
                    ];
                    // console.log("This is the checker "+checker+" And The qualifier " +qualifier + " Name Of Cover: "+premiums[premium].additionalCovers[additionalCover]["name"]+" The Counter Is: "+counter);
                }

                counter = counter + 1;
            }            
            state.insurancePremiumAdditionalCovers[premiumUUID] = newOtherAdditional;  
            
            
            // console.log("Additionals Not Covered: ");
            // console.log(state.insurancePremiumAdditionalCovers);
        }

       
    },

    // ! this action is used to implement the addition of the snackbar . 
    updatingStatusOfAdditionalCoverSnackbar({
        commit
    }, obj) {

        commit("UPDATING_THE_ADDITIONAL_SNACKBAR_STATE_DATA", obj);

    },

    // ! this action is used to implement the addition of the snackbar . 
    updatingStatusOfRemovalCoverSnackbar({
        commit
    }, obj) {

        commit("UPDATING_THE_REMOVAL_SNACKBAR_STATE_DATA", obj);

    },

    // ! this is the action that is used to set the value of editingPersonalDetailsOnPurchasingModal to true. 
    editingPersonalDetailsOnPurchasingModalSetTrueAction({
        commit
    }) {
        commit("UPDATING_EDITING_PERONAL_DETAILS_ON_PURCHASE", true);
    },
    sendingPaymentRequest({commit},cost){

        commit("UPDATING_THE_TEST_VALUE","test3");

        state.sendingPaymentRequestSuccessful= false;
        state.sendingRequestForPaymentInitialState= true;
        state.sendingRequestForPaymentNotSuccessful= false;

        var obj = {};
        obj['cost'] = cost;

        var personalDetails = {};
        for (const [key, value] of Object.entries(state.personalDetails)) {
            personalDetails[key] = value;
        }
        obj['personalDetails'] = personalDetails;


        // ! editing Phone Number  phoneNumberEdited
        var phoneNumberEdited = state.personalDetails['phoneNumber'];

        phoneNumberEdited = '254'+(phoneNumberEdited.toString().substr(1, 9));


        phoneNumberEdited = parseInt(phoneNumberEdited,10);

        obj['phoneNumberEdited'] = phoneNumberEdited;
        // console.log("Thi is the object bein sent.");
        // console.log(obj);
        state.sendingPaymentRequestStatus = true;
        axios.post("https://mrinsuranceapi.georgekprojects.tk/api/stkPush", obj).then(
            response => {
                if (response.status === 200) {
                    // console.log("This is the 200 response after sending the request.");
                    // console.log(response);
                    if (response.data.ResponseCode === "0") {

                        // state.sendingPaymentRequestStatus = false;
                        // console.log("This is on the true ide.");                        

                        state.paymentDetailsGetter['CheckoutRequestID'] =  response.data.CheckoutRequestID;
                        state.paymentDetailsGetter['MerchantRequestID'] =  response.data.MerchantRequestID;

                        // console.log("This is the state.paymentDetailsGetter");
                        // console.log(state.paymentDetailsGetter);

                        

                        // ! sending the obtained payent Details to the backend. 

                        
                        var objectToSendRequestForPayment = {};
                        objectToSendRequestForPayment['uuid'] = uuidv4();
                        objectToSendRequestForPayment['MerchantRequestID'] = response.data.MerchantRequestID;
                        objectToSendRequestForPayment['CheckoutRequestID'] = response.data.CheckoutRequestID;
                        objectToSendRequestForPayment['visitorId'] = state.visitorIdState;
                        objectToSendRequestForPayment['amountPayable'] = cost;

                        // ! sending post request. 

                        axios.post("https://mrinsuranceapi.georgekprojects.tk/api/intentionToPay", objectToSendRequestForPayment).then(
                            response => {
                                if (response.status === 200) {
                                    state.sendingPaymentRequestSuccessful = true;
                                    state.sendingRequestForPaymentInitialState = false;
                                }
                            }).catch(
                                error => {
                                    console.log(error);
                                }
                            );
                        
                    } else {
                        // state.sendingPaymentRequestStatus = false;
                        state.sendingRequestForPaymentNotSuccessful = true;
                        state.sendingRequestForPaymentInitialState = false;
                        // console.log("This is in the fase side.");
                    }
                }
                }).catch(
                            error => {
                                console.log(error);
                            }
                        );
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
    nextStepInStepperStateGetter: state => state.nextStepInStepper,
    insurancePremiumAdditionalCoversGetter: state => state.insurancePremiumAdditionalCovers,
    additionalCoverSnackBarGetter: state => state.additionalCoverSnackBar,
    removingCoverSnackBarGetter: state => state.removingCoverSnackBar,
    editingPersonalDetailsOnPurchasingModalGetter: state => state.editingPersonalDetailsOnPurchasingModal,
    updatingSubCategoryAndCoverStateGetter: state => state.updatingSubCategoryAndCoverState,
    sendingPaymentRequestStatusGetter: state=> state.sendingPaymentRequestStatus,
    sendingPaymentRequestSuccessfulGetter: state => state.sendingPaymentRequestSuccessful,
    sendingRequestForPaymentInitialStateGetter: state => state.sendingRequestForPaymentInitialState,
    sendingRequestForPaymentNotSuccessfulGetter: state => state.sendingRequestForPaymentNotSuccessful,
    paymentDetailsGetterGetter: state => state.paymentDetailsGetter,
    paymentProcessedSuccesfullyGetter: state => state.paymentProcessedSuccesfully,
    

}

const NavigationModule = {
    state,
    mutations,
    actions,
    getters
}

export default NavigationModule