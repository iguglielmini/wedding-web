
export const formatPhone = (value: string) => {
    if (!value) return '';
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    return value.substring(0, 15);
  };
  
  export const cleanPhone = (value: string) => value.replace(/\D/g, "");
  