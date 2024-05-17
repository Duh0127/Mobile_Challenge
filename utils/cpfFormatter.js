const formatCPF = (cpf) => {
    if (!cpf) return '';
    // Remover todos os caracteres não numéricos
    const cleaned = cpf.replace(/\D/g, '');

    // Verificar o comprimento do CPF
    if (cleaned.length === 11) {
        // Formatar o CPF: XXX.XXX.XXX-XX
        return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    return cpf;
};

export default formatCPF;