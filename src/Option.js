import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Option extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        }
        this.liOnclick = this.liOnclick.bind(this)
    }
    componentWillReceiveProps () {
        // console.log('componentWillReceiveProps------')
    }
    shouldComponentUpdate (nextProps, nextState) {
        if(nextProps.content !== this.props.content){
            console.log('shouldComponentUpdate------')
            return true;
        }
        return false;
    }
    componentWillUpdate () {
        // console.log('componentWillUpdate------')
    }
    componentWillUnmount () {
        // console.log('componentWillUnmount------')
    }
    render () {
        // console.log('children render------')
        return (
            <li onClick={this.liOnclick}>{this.props.staticValue} - {this.props.content}</li>
        )
    }
    liOnclick () {
        this.props.deleteFun(this.props.index)
    }
}

Option.propTypes = {
    content: PropTypes.string,
    index: PropTypes.number,
    deleteFun: PropTypes.func
}
Option.defaultProps = {
    staticValue: '这是一个默认值'
}
export default Option;