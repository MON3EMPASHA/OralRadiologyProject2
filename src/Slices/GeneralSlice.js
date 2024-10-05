import { axiosMethods } from "../Pages/Controller";

const methods = new axiosMethods();
export const serverURL = "https://oralradiologymsa.rf.gd/";
// export const serverURL = "http://localhost/Projects/OralRadiology/";

export function userLogin(data) {
  //return methods.post(serverURL + "userLogic.php/Login", data);

  fetch(serverURL + "userLogic.php/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      //  console.log(data);
    })
    .catch((error) => {
      // console.error("Error:", error);
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
