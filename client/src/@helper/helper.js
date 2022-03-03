export const parseDate = (str) => {
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]); // 0: d, 1: M, 2: Y
}

export const datediff = (first, second) => {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export const getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
};

export const parseVNDCurrency = (price) => {
    return parseInt(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replaceAll('.', ',');
}

export const refreshPage = () => {
    window.location.reload();
}

export const defaultValueGuests = (adults, childrens) => {
    let s = adults + ' adults ';
    s += childrens > 0 ? '- ' + childrens + ' childrens' : '';
    return s;
}