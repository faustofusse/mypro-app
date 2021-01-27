import { ON_LOAD, OFF_LOAD} from './actionTypes';

export const startLoading = () =>  ({ type : ON_LOAD, });

export const stopLoading = () => ({ type : OFF_LOAD, });
