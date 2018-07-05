var cookieDomain = window.location.hostname;
export default {
    get: function(name) {
        try {
            return document.cookie.match(
                new RegExp("(^" + name + "| " + name + ")=([^;]*)")
            ) == null
                ? ""
                : decodeURIComponent(RegExp.$2);
        } catch (e) {
            return "";
        }
    },
    remove: function(name, domain) {
        var expireDate = new Date(new Date().getTime());
        domain = domain || cookieDomain;
        document.cookie =
            name +
            "= ; path=/; domain=" +
            domain +
            "; expires=" +
            expireDate.toGMTString();
    },
    set: function(name, value, hours, domain) {
        domain = domain || cookieDomain;
        if (arguments.length > 2) {
            var expireDate = new Date(new Date().getTime() + hours * 3600000);
            document.cookie =
                name +
                "=" +
                encodeURIComponent(value) +
                "; path=/; domain=" +
                domain +
                "; expires=" +
                expireDate.toGMTString();
        } else {
            document.cookie =
                name +
                "=" +
                encodeURIComponent(value) +
                "; path=/; domain=" +
                domain;
        }
    },
    setMinutes: function(name, value, minutes, domain) {
        domain = domain || cookieDomain;
        if (arguments.length > 2) {
            var expireDate = new Date(new Date().getTime() + minutes * 60000);
            document.cookie =
                name +
                "=" +
                encodeURIComponent(value) +
                "; path=/; domain=" +
                domain +
                "; expires=" +
                expireDate.toGMTString();
        } else {
            document.cookie =
                name +
                "=" +
                encodeURIComponent(value) +
                "; path=/; domain=" +
                domain;
        }
    }
};
