function BakeryItem(props) {
    return(
        <div className="BakeryItem">
            <h3>{props.item.name}</h3>
            <p>Type: {props.item.type}</p>
            <p>Dietary Restrictions: {props.item.restrictions}</p>
            <p>{props.item.price}</p>
            <img alt="" src={props.item.image} />
            <button onClick={() => {props.addToCart(props.item)}}>Add to cart!</button>
            <button onClick={() => {props.removeFromCart(props.item)}}>Remove from cart!</button>
        </div>
    )
}

export default BakeryItem;
