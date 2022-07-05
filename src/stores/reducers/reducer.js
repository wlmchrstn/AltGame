import { combineReducers } from 'redux';
import ReducerWishlist from './ReducerWishlist';
import ReducerProduct from './ReducerProduct';
import ReducerSeller from './ReducerSeller';

const rootReducer = combineReducers({
    ReducerWishlist,
    ReducerProduct,
    ReducerSeller,
});

export default rootReducer;
