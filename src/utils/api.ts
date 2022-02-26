import constant from './constant';

const getApiCall = (
  endPoint: string,
  params: object,
  successCallback: Function,
  errorCalback: Function,
) => {
  constant.axiosInstance
    .get(endPoint, {params: params})
    .then((response: any) => {
      console.log(response);
      successCallback(response);
    })
    .catch((error: any) => {
      console.log(error.response, error.response.status);
      errorCalback(error);
    });
};

export default {
  getApiCall,
};
