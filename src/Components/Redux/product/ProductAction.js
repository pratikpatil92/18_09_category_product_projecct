import axios from 'axios';
export const onAddProduct=(data)=>{
    const fd=new FormData();
    fd.append("name",data.name);
    fd.append("price",data.price);
    fd.append("image",data.image);
    fd.append("categoryId",data.categoryId);
    fd.append("quantity",data.quantity);
    fd.append("description",data.description);
    //console.log(data);
    //console.log(data);
    return (dispatch)=>{
        axios.post("http://localhost:5000/saveProduct", fd)
        .then(res=>{
            //console.log(res);
            if(res.status==200){
            dispatch(onAddSuccess(res.data.msg));
            }else{
                dispatch(onAddFailure(res.data.msg));
            }
        })
        .catch(err=>{
            //console.log(err);
            dispatch(onAddFailure(err.response.msg));
        })
}
}


export const onFetchProduct=()=>{
    return (dispatch)=>{
        dispatch(onFetching());
        axios.get("http://localhost:5000/viewProduct")
        .then(res=>{
            if(res.status==200){
                dispatch(onFetchSuccess(res.data))
            }else{
                dispatch(onFetchFailure(res.data.msg))
            }
        })
        .catch(err=>{
            dispatch(onFetchFailure(err))
        })
    }
}



export const onAddSuccess=(msg)=>{
    return {
        type:"ADD_SUCCESS",
        payload:msg
    }
}

export const onAddFailure=(msg)=>{
    return {
        type:"ADD_FAILURE",
        payload:msg
    }
}

export const onFetchSuccess=(res)=>{
    return {
        type:"ON_FETCH_SUCCESS",
        payload:res
    }
}
export const onFetchFailure=(msg)=>{
    return {
        type:"ON_FETCH_FAILURE",
        payload:msg,
    }
}

export const onFetching=()=>{
    return{
        type:"ON_FETCHING"
    }
}