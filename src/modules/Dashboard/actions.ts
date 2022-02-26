import {api, endPoints, actions} from '../../utils';

export const getNewsApi = (
  payload: Object,
  success: Function,
  error: Function,
) => {
  return (dispatch: Function, getState: Function) => {
    api.getApiCall(
      endPoints.everything,
      payload,
      (response: any) => {
        const {newsData} = getState().Dashboard;

        let arr = [...newsData];

        response.data.articles.length !== 0
          ? (dispatch({
              type: actions.NEWS_DATA,
              payload: {newsData: arr.concat(response.data.articles)},
            }),
            success(response))
          : error();
      },
      (error: any) => {
        error();
      },
    );
  };
};
