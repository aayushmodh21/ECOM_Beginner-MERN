const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST } = require("../constants/productConstants");

const initialState = {
    loading: true,
    products: []
}

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_LIST_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        // eslint-disable-next-line no-duplicate-case
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
};