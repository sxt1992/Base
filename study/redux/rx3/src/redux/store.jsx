export default function (state = { count: 0 }, action) {
    const count=state.count;
    switch (action.type) {
        case 'addFunc':
            return { count: count + 1 };
        default:
            console.log(state);
            return state;
    }
};