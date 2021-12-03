export const isEmpty = value => {
    if(!value) return true
    return false
}

export const isEmail = email => {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const isLength = password => {
    if(password.length < 6) return true
    return false
}

export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}

export const isLengthCed = cedula => {
    if(cedula.length === 9) return true
    return false
}

export const isCedula = cedula=> {
    // eslint-disable-next-line
    const re = /^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/;
    return re.test(cedula);
}