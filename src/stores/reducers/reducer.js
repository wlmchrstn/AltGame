import { combineReducers } from 'redux';
import ReducerAuth from './ReducerAuth';
import ReducerWishlist from './ReducerWishlist';
import ReducerProduct from './ReducerProduct';
import ReducerSeller from './ReducerSeller';
import ReducerBid from './ReducerBid';

const rootReducer = combineReducers({
    ReducerAuth,
    ReducerWishlist,
    ReducerProduct,
    ReducerSeller,
    ReducerBid,
});

export default rootReducer;
