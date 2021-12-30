import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './loginReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({    
    form: formReducer,
    login: loginReducer,
    order: orderReducer
});

export default rootReducer;
