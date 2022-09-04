const testReducer = (state = 0, action: {type: string, payload: number}) => {
    return action.payload + 1;
}

export default testReducer;