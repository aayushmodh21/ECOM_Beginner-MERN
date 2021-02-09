import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function OrderScreen(props) {

    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails;

    const orderId = props.match.params.id;

    const dispatch = useDispatch();

    useEffect(() => {

        const addPaypalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order) {
            dispatch(detailsOrder(orderId));
        }
        else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript();
                }
                else {
                    setSdkReady(true);
                }
            }
        }

        // dispatch(detailsOrder(orderId));

    }, [dispatch, order, orderId, sdkReady]);

    const successPaymentHandler = () => {
        // dispatch pay order
    }

    //
    return loading ? (<LoadingBox />) :
        error ? (<MessageBox varient="danger">{error}</MessageBox>) :
            (
                <div>
                    <h3>Order: {order._id}</h3>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong>{order.shippingAddress.fullName} <br />
                                            <strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                        </p>
                                        {
                                            order.isDelivered ?
                                                <MessageBox varient="success">Deliver At {order.deliveredAt}</MessageBox> :
                                                <MessageBox varient="danger">Not Delivered</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong>{order.paymentMethod}
                                        </p>
                                        {
                                            order.isPaid ?
                                                <MessageBox varient="success">Paid At {order.paidAt}</MessageBox> :
                                                <MessageBox varient="danger">Not Paid</MessageBox>
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {
                                                order.orderItems.map(item => (
                                                    <li key={item.product}>
                                                        <div className="row">
                                                            <div>
                                                                <img src={item.image} alt={item.name} className="small" />
                                                            </div>
                                                            <div className="min-30">
                                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                            </div>
                                                            <div>{item.qty} x ${item.price} = {item.qty * item.price}</div>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items</div>
                                            <div>${order.itemsPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>${order.shippingPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>${order.taxPrice.toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order Total</strong></div>
                                            <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                        </div>
                                    </li>

                                    {
                                        !order.isPaid && (
                                            <li>
                                                {
                                                    !sdkReady ? (
                                                        <LoadingBox />
                                                    ) : (
                                                        <PayPalButton 
                                                            amount={order.totalPrice} 
                                                            onSuccess={successPaymentHandler}
                                                        ></PayPalButton>
                                                    )
                                                }
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
}

export default OrderScreen

