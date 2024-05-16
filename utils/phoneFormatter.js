const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    let formatted = `${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1, 5)}-${phoneNumber.slice(5)}`;
    return formatted;
};

export default formatPhoneNumber;