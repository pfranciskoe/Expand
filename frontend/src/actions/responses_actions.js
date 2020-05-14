import * as responsesAPIUtil from "../util/responses_api_util";

export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE"
export const REMOVE_RESPONSE = "REMOVE_RESPONSE"


const receiveResponse = (response) => ({
  type: RECEIVE_RESPONSE,
  response,
});

const removeResponse = (responseId) => ({
  type: REMOVE_RESPONSE,
  responseId,
});


export const createResponse = (response) => (dispatch) =>
  responsesAPIUtil.createResponse(response).then(
    (response) => dispatch(receiveResponse(response))
  );

export const getResponse = (responseId) => (dispatch) =>
  responsesAPIUtil
    .getResponse(responseId)
    .then((response) => dispatch(receiveResponse(response)));


export const updateResponse = (response) => (dispatch) =>
  responsesAPIUtil.updateResponse(response).then(
    (response) => dispatch(receiveResponse(response))
  );

export const deleteResponse = (responseId) => (dispatch) =>
  responsesAPIUtil
    .removeResponse(responseId)
    .then((response) => dispatch(removeResponse(response._id)));



