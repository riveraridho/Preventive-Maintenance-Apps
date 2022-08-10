import {
  LOAD_DATA,
  LOAD_NEWS,
  SET_SCHEDULE,
  SET_NETWORK,
  SET_ENDUSER,
} from './type';

export function loadData(name) {
  return {
    type: LOAD_DATA,
    payload: name,
  };
}

export function loadNews(news) {
  return {
    type: LOAD_NEWS,
    payload: news,
  };
}

export function setSchedule(schedule) {
  return {
    type: SET_SCHEDULE,
    payload: schedule,
  };
}

export function setNetwork(pmnetwork) {
  return {
    type: SET_NETWORK,
    payload: pmnetwork,
  };
}

export function setEnduser(enduser) {
  return {
    type: SET_ENDUSER,
    payload: enduser,
  };
}
