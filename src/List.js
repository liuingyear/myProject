import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './showHide.css'
import Option from './Option';
import ShowHide from './ShowHide'

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputValue: '初始化的值',
            list: []
        }
    }
    componentWillMount () {
        console.log('1componentWillMount------组件即将挂载')
    }
    componentDidMount () {
        axios.post('https://www.easy-mock.com/mock/5ea22fb5af68063566222dfc/Parent/Parent')
        .then(res => {
            this.setState({
                list: res.data.data
            })
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        console.log('3componentDidMount------组件即将挂载完成')
    }
    render() { 
        // console.log('2render------组件正在挂载')
        return ( 
            <Fragment>
                <label htmlFor="input">点击输入框聚焦</label>
                <input id="input" ref={(input) => {this.input=input}} value={this.state.inputValue} onChange={this.inputChange.bind(this)}/>
                <button onClick={this.buttonClick.bind(this)}>点击添加值</button>
                <ul ref={(ul) => {this.ul=ul}}>
                    <TransitionGroup>
                        {
                            this.state.list.map((item, index) => {
                                return (
                                    <CSSTransition
                                        timeout={2000}
                                        classNames="show-hide"
                                        unmountOnExit
                                        key={item+index}
                                        appear={true}
                                    >
                                        <Option content={item} index={index} deleteFun={this.deleteFun.bind(this)}></Option>
                                    </CSSTransition>
                                )
                            })
                        }
                    </TransitionGroup>
                </ul>
                <ShowHide></ShowHide>
            </Fragment>
        );
    }
    buttonClick () {
        // setState是异步更新的，所以如果要获取li的个数需要在setState的回调函数之后去获取
        this.setState({
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        }, () => {
            // console.log(this.ul.querySelectorAll('li').length)
        })
    }
    inputChange () {
        this.setState({
            inputValue: this.input.value
        })
    }
    deleteFun (index) {
        let list = this.state.list;
        list.splice(index, 1);
        this.setState({
            list: list
        })
    }
}
 
export default List;