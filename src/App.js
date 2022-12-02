import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./BakeryItem";

bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState(0);

  function addToCart(item) {
    setCartItems([...cartItems, item]);
    setPrice(price + item.price);
  }

  function removeFromCart(item) {
    // console.log('work');
    // setCartItems(cartItems=> (
    //   cartItems.filter((item, i) => i !== index)));
    if(price - item.price >= 0){
      setPrice(price - item.price);  
    }
  }

  const[filteredData, setFilteredData] = useState(bakeryData);
  const [isCheckedPastry, setIsCheckedPastry] = useState(false);
  const [isCheckedCake, setIsCheckedCake] = useState(false);
  const [isCheckedGluten, setIsCheckedGluten] = useState(false);
  const [isCheckedDairy, setIsCheckedDairy] = useState(false);
  const[toSort, setToSort] = useState(false);

  const reset = () => {
    if(isCheckedPastry){
      const temp = !isCheckedPastry;
      setIsCheckedPastry(temp);
    }

    if(isCheckedCake){
      const temp = !isCheckedCake;
      setIsCheckedCake(temp);
    }

    if(isCheckedDairy){
      const temp = !isCheckedDairy;
      setIsCheckedDairy(temp);
    }

    if(isCheckedGluten){
      const temp = !isCheckedGluten;
      setIsCheckedGluten(temp);
    }

    if(toSort){
      const temp = !toSort;
      setToSort(temp);
    }

    console.log(filteredData);
    filterList("All1");
    filterList("All2");
  }

  const handleOnChangePastry = () => {
    const temp = !isCheckedPastry;
    setIsCheckedPastry(temp);

    console.log(temp);

    if(temp && isCheckedCake){
      filterList("All1");
    }
    else if(!temp && isCheckedCake){
      filterList("Cake");
    }
    else if(temp && !isCheckedCake){
      filterList("Pastry");
    }
    else{
      filterList("All1");
    }
  };

  const handleOnChangeCake = () => {
    const temp = !isCheckedCake;
    setIsCheckedCake(temp);

    if(isCheckedPastry && temp){
      filterList("All1");
    }
    else if(!isCheckedPastry && temp){
      filterList("Cake");
    }
    else if(isCheckedPastry && !temp){
      filterList("Pastry");
    }
    else{
      filterList("All1");
    }
  };

  const handleOnChangeGluten = () => {
    const temp = !isCheckedGluten;
    setIsCheckedGluten(temp);

    if(temp && isCheckedDairy){
      filterList("All2");
    }
    else if(!temp && isCheckedDairy){
      filterList("Dairy-free");
    }
    else if(temp && !isCheckedDairy){
      filterList("Gluten-free");
    }
    else{
      filterList("All2");
    }
  };

  const handleOnChangeDairy = () => {
    const temp = !isCheckedDairy;
    setIsCheckedDairy(temp);
    if(isCheckedGluten && temp){
      filterList("All2");
    }
    else if(!isCheckedGluten && temp){
      filterList("Dairy-free");
    }
    else if(isCheckedGluten && !temp){
      filterList("Gluten-free");
    }
    else{
      filterList("All2");
    }
  };

  const handleOnChangePrice = () => {
    const temp = !toSort;
    setToSort(temp);
    filterList();
  };

  const bakeryFoodTypes = [...new Set(bakeryData.map((Val) => Val.type))];
  const bakeryRestrictions = [...new Set(bakeryData.map((Val) => Val.restrictions))];
  const [filters, setFilters] = useState(['All1', 'All2']);

  function filterList(filter){
    let temp;
    if(bakeryFoodTypes.includes(filter) || filter === "All1"){
      temp = [filter, filters[1]];
      console.log(temp);
    } 
    else if(bakeryRestrictions.includes(filter) || filter === 'All2'){
      temp = [filters[0], filter];
    }
    else{
      temp = [...filters];
    }

    setFilters(temp);

    let data = [...bakeryData];
    let dataTemp = data.filter((x) => {
      return (temp[1] === 'All2') ? x : x.restrictions === temp[1];
    })
    let ret = dataTemp.filter((x) => {
      return (temp[0] === 'All1') ? x : x.type === temp[0];
    })

    if(!toSort){
      ret.sort((a, b) => { return a.price - b.price});
    }

    setFilteredData(ret);
  }

  return (
    <div className="App">
      <h1>The One and Only Pattiserie</h1>  

      <button onClick={reset}>Reset</button>

      <h3>Bakery Food Type</h3>
      <div className="App">
        <div className="Bakery food type">
          <input
            type="checkbox"
            value="Pastry"
            checked={isCheckedPastry}
            onChange={handleOnChangePastry}
          />
          Pastry
          &nbsp;
          <input
            type="checkbox"
            value="Cake"
            checked={isCheckedCake}
            onChange={handleOnChangeCake}
          />
          Cake
        </div>
      </div>

      <h3>Dietary Restrictions</h3>
      <div className="App">
        <div className="Dietary Restrictions">
          <input
            type="checkbox"
            value="Gluten-free"
            checked={isCheckedGluten}
            onChange={handleOnChangeGluten}
          />
          Gluten-free
          &nbsp;
          <input
            type="checkbox"
            value="Cake"
            checked={isCheckedDairy}
            onChange={handleOnChangeDairy}
          />
          Dairy-free
        </div>
      </div>

      <h3>Sort by:</h3>
      <div className="Price">
        <div className="Price">
          <input
            type="checkbox"
            value="Price"
            checked={toSort}
            onChange={handleOnChangePrice}
          />
          Price
        </div>
      </div>

      <h2>Items!</h2>
      {filteredData.map((item, index) => ( 
          <BakeryItem item={item} addToCart={addToCart} removeFromCart={removeFromCart} price={price} />
          // <p>Bakery Item {index}</p>
      ))}

      <h2>Total price!</h2>
      <p>
        <p>${Math.round(100*price)/100}</p>
      </p>

      <h2>Items in cart!</h2>
      <div>
        <h2>Cart</h2>
          {cartItems.map((item, index) => (<p>{item.name}</p>))}
      </div>
    </div>
  );
}

export default App;
