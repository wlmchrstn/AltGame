import axios from 'axios';

export const formatRupiah = value => {
    if (value === undefined) return `Rp 0`;
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

export const setToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.headers.common['Authorization'];
    }
};

export const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        if (!file) {
            alert('Please select an image');
        } else {
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
        }
        fileReader.onerror = err => {
            reject(err);
        };
    });
};
