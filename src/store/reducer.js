import { CHANGE_INPUT_VALUE, BTN_CLICK, CLICK_DELETE, AJAX_DATA } from './actionTypes'

const defaultState = {
    inputValue: '',
    list: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ]
}
// reducer拿到之前的数据(previousValue, action)和当前用户所要进行的操作信息;告诉store，现在新的数据应该变成什么;
export default function reducer(state = defaultState, action) {
    // console.log(state, action);
    if (action.type === CHANGE_INPUT_VALUE) {
        // reducer相当于手册，手册里面写着，如果你要改变inputValue，
        // 那么先对原来的store里面的值进行拷贝，然后把里面的inputValue改成传递过来的值
        const newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value;
        return newState;    // 实际返回给了Store
    }
    if (action.type === BTN_CLICK) {
        console.log(`按钮点击: ${action.value}`);
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.push(action.value);
        newState.inputValue = '';
        return newState;    // 实际返回给了Store
    }
    if (action.type === CLICK_DELETE) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState;    // 实际返回给了Store
    }
    if (action.type === AJAX_DATA) {
        const newState = JSON.parse(JSON.stringify(state))
        newState.list = action.value;
        return newState;    // 实际返回给了Store        return newState;    // 实际返回给了Store
    }
    // state = action.value;
    return state;
}