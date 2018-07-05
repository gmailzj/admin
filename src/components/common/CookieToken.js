// "use strict";

import u from "./CookieUtil";
console.log(u);
var c = "access_token";

export var t = {};
function getCookieToken() {
    return u.get(c);
}
function setCookieToken(value, hours) {
    console.log(u);
    return u.set(c, value, hours);
}
function removeCookieToken() {
    return u.remove(c);
}

t.getCookieToken = getCookieToken;
t.setCookieToken = setCookieToken;
t.removeCookieToken = removeCookieToken;
// export { t };
