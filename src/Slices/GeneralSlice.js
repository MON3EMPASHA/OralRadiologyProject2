import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();
export const serverURL = "https://oralradiologymsa.rf.gd/";
// export const serverURL = "http://localhost/Projects/OralRadiology/";

export function userLogin(data) {
  //return methods.post(serverURL + "userLogic.php/Login", data);

  return fetch(serverURL + "userLogic.php/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      // Handle the data if necessary
      return data; // Return the data for further processing
    })
    .catch((error) => {
      console.error("Error:", error); // Log errors if any
      throw error; // Rethrow error to be caught in calling function
    });
}
export function changesInUserProfile(data) {
  return methods.post(serverURL + "userLogic.php/ChangeUserProfile", data);
}
export function changePassword(data) {
  return methods.post(serverURL + "userLogic.php/changePassword", data);
}

export function resetPassword(user) {
  return methods.get(serverURL + "userLogic.php/resetPassword", {
    userId: user,
  });
}

export function savePersonalImage(Id, MSAId, Profile) {
  return methods.post(serverURL + "userLogic.php/UpdateImage", {
    Id,
    MSAId,
    Profile,
  });
}
