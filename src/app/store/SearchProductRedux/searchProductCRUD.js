import axios from "axios";
export const getSearchProductCRUD = async(value)=>{
    console.log("in CRUD",value);
    const result = await axios.get(`/api/SearchProducts?key=${value}`);
    console.log("in CRUD",result.data);
    return result.data;
}