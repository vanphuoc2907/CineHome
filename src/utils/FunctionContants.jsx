export const truncate = (text, length = 30) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  export const getObjectById = (id, data) => {
    // Tìm phim có ID khớp với ID yêu cầu
    return data?.find((element) => element.id === id);
  };

  export const getMovieRent = (data,plans,number) => {

    return data?.filter(e => getObjectById(e.planID,plans)?.level == number);
  }

  export const truncate2 = (text, length = 50) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  export const filterById = (data,id,name) =>  {
      return data?.filter(e => e[name]  == id);
  }