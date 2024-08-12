import axios from 'axios';

export const postCategoryData = async (data) => {
//   console.log(data);
    return await axios.post('/api/Category', data );
};

export const getCategoryData = async (data) => {
    //   console.log(data);
        return await axios.get('/api/Category?key2=getcategory');
    };

export const deleteCategoryData = async (id1) => {
          console.log(id1,"hloooo");
            return await axios.put(`/api/Category?key=categorystatus?${id1}`);
    };
      
export const editCategoryData = async (editData,id) => {
        //   console.log(data,"piee");
            return await axios.put(`/api/Category?${editData}=${id}`);
    };