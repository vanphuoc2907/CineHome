export const truncate = (text, length = 30) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  export const getObjectById = (id, data) => {
    // Tìm phim có ID khớp với ID yêu cầu
    return data?.find((element) => element.id === id);
  };