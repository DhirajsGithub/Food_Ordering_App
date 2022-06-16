import Card from '../UI/Card';
import classes from './AvailableMeal.module.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

// const fetchData = async ()=>{
//   try {
//     const response = await fetch("https://food-ordering-app-4cb7a-default-rtdb.firebaseio.com/tasks.json")
//     if(!response.ok){
//       throw new Error('something went wrong....');
//     }
//     const data = await response.json();
//     console.log(data);
//     console.log(response.status)
//   } catch (error) {
//     console.log(error.message)
//   }
// }
// fetchData();




const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://food-ordering-app-4cb7a-default-rtdb.firebaseio.com/tasks.json');

      if(!response.ok){
        throw new Error("Something went Wrong !!!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    // try {
    //   fetchMeals();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);         // error object has property of message which will have value of throw new Error
    // }
    // KEEP IN MIND : fetchMeals() is an async function which returns a promise, if we throw an error inside promise that error will cause that promise to reject so better use that .catch of fetchMeals();
    fetchMeals().catch((error)=>{
        setIsLoading(false);
      setHttpError(error.message); 
    });
    
  }, []);

  // NOTE: function inside the useEffect should be a clean up functio and it must be synchronous 

  if(isloading){
    return (
      <section className={classes.MealsLoading}>
        <h2>Loading...</h2>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.MealsError}>
        <h2>{httpError}</h2>
      </section>
    )
  }


  const mealsList = meals.map((meal) => <MealItem
  id = {meal.id}
  key={meal.id}
  name={meal.name}
  description={meal.description}
  price={meal.price}
/>);


  return (
    <section className={classes.meals}>
    <Card>
      <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;