var Utils = {};

//Compare two dates
Utils.compareDate = function (d1, d2) {
    var day = new Date(d1).getUTCDate() - new Date(d2).getUTCDate();
    var month = new Date(d1).getUTCMonth() - new Date(d2).getUTCMonth();
    var year = new Date(d1).getUTCFullYear() - new Date(d2).getUTCFullYear();
    return day + (month * 30) + (year * 365);
}

Utils.getDateAndTimeString = function (d) {
    return zeroB4(new Date(d).getUTCHours()) + ":" + zeroB4(new Date(d).getUTCMinutes()) + " " + zeroB4(new Date(d).getUTCDate()) +
        "-" + zeroB4(new Date(d).getUTCMonth() + 1) + "-" + new Date(d).getUTCFullYear();
}

Utils.arrayContains = function (target, arr) {
    if (!arr)
        return false;
    for (var i = 0; i < arr.length; i++)
        if (arr[i] == target)
            return true;
    return false;
}

function zeroB4(k) {
    if (parseInt(k) < 10)
        return "0" + k;
    return k;
}