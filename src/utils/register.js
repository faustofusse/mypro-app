import { USER_MODELS } from "../constants";

const checkValues = (object, values=null) => { 
    for (let i = 0; i < values.length; i++) 
        if (object[values[i]] == null || object[values[i]] === '') 
            return false;
    return true;
}

export const validate = (user) => {
    let extras = USER_MODELS[user.professional ? 'professional' : 'client'][user.business ? 'business' : 'particular'];
    let values = extras.concat(USER_MODELS['all']);
    if (user.google || user.facebook) values = values.filter(v => v !== 'password' && v !== 'repeatPassword');
    console.log(values);
    console.log(checkValues(user, values));
    return checkValues(user, values);
}