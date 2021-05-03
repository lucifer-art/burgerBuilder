import React, { Component } from 'react';
import Order from '../../components/UI/Order/order';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component{

    componentDidMount(){
        
        this.props.onOrderInit(this.props.token,this.props.userId);
        
    }

    render(){
        let orders = <Spinner />
        if(!this.props.loading) {
            orders = this.props.orders.map(order=>{
                return <Order key={order.id} customer={order.customer} ingredients={order.ingredients} price={order.price} />
            })
        }
        return orders
    }
}

const mapStateToProps = state => {
    
    return {
        orders: state.order.order,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
} 

const mapDispatchToProps = dispatch => {
    return {
        onOrderInit: (token,userId) => dispatch(actions.fetchOrderInit(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Orders);