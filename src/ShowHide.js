import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

class ShowHide extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isShow: true
         }
    }
    render() { 
        return ( 
            <div>
                <CSSTransition
                    in={this.state.isShow}
                    timeout={2000}
                    classNames="show-hide"
                >
                    <div>要进行隐藏的文字</div>
                </CSSTransition>
                <button onClick={this.onClick.bind(this)}>点击进行显示隐藏</button>
            </div>
         );
    }
    onClick () {
        this.setState({
            isShow: this.state.isShow ? false : true
        })
    }
}
 
export default ShowHide;