const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Extrai o dia, mês e ano
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa de 0
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

export default formatDate;