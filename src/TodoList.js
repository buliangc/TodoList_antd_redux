import React, { Component } from 'react'
import { Input, Button, List, Popconfirm, message } from 'antd';
import { CHANGE_INPUT_VALUE, BTN_CLICK, CLICK_DELETE, AJAX_DATA } from './store/actionTypes'
import ajax from 'axios'
import './Todolist.css';
import store from './store/index';

/*全局变量*/

const url = '/api/todolist.json'

function confirm(index) {
    console.log(`当前的${index}`);
    const action = {
        type: CLICK_DELETE,
        index: index
    }
    store.dispatch(action);
    message.success('删除成功!!!');
}

function cancel(e) {
    message.error('取消删除');
}

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    componentDidMount() {
        //监听store，只要store里面的数据发生了变化，handleStoreChange方法就会被执行
        store.subscribe(this.handleStoreChange);
        ajax.get(url)
            .then((datas) => {
                const action = {
                    type: AJAX_DATA,
                    value: datas.data
                }
                store.dispatch(action);
            })
            .catch(() => {
                alert('error!')
            })
    }

    handleInputChange(e) {
        const action = {
            type: CHANGE_INPUT_VALUE,
            value: e.target.value
        }
        store.dispatch(action);
    }

    handleBtnClick() {
        const action = {
            type: BTN_CLICK,
            value: this.state.inputValue
        }
        store.dispatch(action);
    }
    // handleStoreChange执行store.getState()，重新再获取store里面的数据，通过setState进行更新
    handleStoreChange() {
        this.setState(store.getState())
    }

    render() {
        return (
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
                <Input
                    value={this.state.inputValue}
                    placeholder='todo info'
                    style={{ width: '300px', marginRight: '10px' }}
                    onChange={this.handleInputChange}
                />
                <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
                <List
                    style={{ marginTop: '10px', width: '375px' }}
                    bordered
                    dataSource={this.state.list}
                    renderItem={(item, index) => (
                        <>
                            <List.Item
                                actions={[
                                    <Popconfirm
                                        title="是否确认删除此条任务?"
                                        onConfirm={() => confirm(index)}
                                        onCancel={() => cancel()}
                                        okText="确认"
                                        cancelText="取消"
                                    >
                                        <Button type='danger' size='small'>删除</Button>
                                    </Popconfirm>

                                ]}
                            >
                                {item}
                            </List.Item>
                        </>
                    )}
                />
            </div>
        )
    }
}

export default TodoList;