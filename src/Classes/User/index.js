class User {
  updateNameDetailsOfUserAfterLogIn(fullName, firstName, lastName) {
    localStorage.setItem("name", fullName);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
  }

  updateTokenDetailsAfterLogIn(token) {
    localStorage.setItem("authenticationToken", token);
  }
  updateLogInStatusAfterLogIn() {
    localStorage.setItem("loggedInStatus", true);
  }

  updateEmailAddressAfterogIn(emailAddress) {
    localStorage.setItem("emailAddress", emailAddress);
  }
  updatePhoneNumberAfterLogIn(phoneNumber) {
    localStorage.setItem("phoneNumber", phoneNumber);
  }
}
export default new User();
