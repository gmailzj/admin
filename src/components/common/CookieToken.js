// "use strict";

import CookieUtil from "./CookieUtil";
var c = "access_token";

export var t = {};
function getCookieToken() {
    return CookieUtil.get(c);
}
function setCookieToken(value, hours) {
    return CookieUtil.set(c, value, hours);
}
function removeCookieToken() {
    return CookieUtil.remove(c);
}

t.getCookieToken = getCookieToken;
t.setCookieToken = setCookieToken;
t.removeCookieToken = removeCookieToken;
// export { t };
