export const formatRupiah = value => {
    let string = value.toString();
    let remainder = string.length % 3;
    let rupiah = string.substr(0, remainder);
    let thousand = string.substr(remainder).match(/\d{3}/g);

    if (thousand) {
        let separator = remainder ? '.' : '';
        rupiah += separator + thousand.join('.');
    }

    return `Rp ${rupiah}`;
};
