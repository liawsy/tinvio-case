import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import image from './assets/image.jpg';
import Loader from './Loader.js';

function NameCard() {

    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [address, setAddress] = useState([]);
    const [bs, setBs] = useState([]);
    const [phone, setPhone] = useState("");

    function getFormattedAddress(obj) {
        const {street, suite, city, zipcode} = obj;
        const zipFront = zipcode.split("-")[0];
        var emptyString = "";
        const delimiter = ", ";
        const formattedAdd = emptyString.concat(street, delimiter, suite, delimiter, city, delimiter, zipFront);
        return formattedAdd;
    }

    async function getUserInfo() {
        try {
            const result = await Axios.get(
              `https://jsonplaceholder.typicode.com/users/1`,
            );
            const {name, address, company, phone} = result.data;

            setName(name);
            setAddress(getFormattedAddress(address));
            setBs(company.bs.split(" "));
            setPhone(phone.split(" ")[0]);

            if (loading) {
              setLoading(false);
            }

          } catch (error) {
            console.log(error);
            console.log('Unable to load data');
          }
    }

    function capitaliseLetters(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function addDelimiters(arr) {
      var first = true;
      var formattedString = "";
      for (var i = 0; i < arr.length; i++) {
        if (first) {
          first = false;
        } else {
          formattedString += " • ";
        }
        formattedString += capitaliseLetters(arr[i]);
      }
      return formattedString;
    }

    useEffect(() => {
        getUserInfo();
      }, []);
  
    return (
      <div>{loading ? 
      <Loader /> : 
      <div className="card">
          <img className="card-image" src={image} alt=""/>
          <div className="card-container">
            <h4>{name}</h4>
            <span className='icon-phone' />
            <p>{phone}</p>
            <span className='icon-category' />
            <p>{addDelimiters(bs)}</p>
            <span className='icon-shop' />
            <p>{address}</p>
          </div>
      </div>}</div>
    );
  }
  
export default NameCard;
  