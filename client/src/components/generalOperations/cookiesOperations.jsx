export function verifyCookie(cookieName) {
    // if (document.cookie && document.cookie.indexOf('code') >= 0) {
    if (document.cookie && document.cookie.indexOf(cookieName) >= 0) {
        // let code = null;
        let cookie = null;
        for (let i = 0; i < document.cookie.split(';').length; i++) {
            // if (document.cookie.split(';')[i].indexOf('code') >= 0) {
            if (document.cookie.split(';')[i].indexOf(cookieName) >= 0) {
                // code = document.cookie.split(';')[i].split('=')[1]
                cookie = document.cookie.split(';')[i].split('=')[1]
            }
        }
        return cookie
    } else {
        return null
    }
}