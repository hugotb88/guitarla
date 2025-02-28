import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {
  // From local file
  const [data, setData] = useState(db)
  
  // State for shopping Cart
  const [cart, setCart] = useState([])

  // Adding guitars to cart
  function addToCart(item){
    //Review if the added item alread exists in the cart
    const itemExists = cart.findIndex(guitar => guitar.id === item.id )
    if(itemExists >= 0){
      console.log('Item already exist')
      const updateCart = [...cart] //Create a copy of the state to not modify it directly (that is a bad practice)
      updateCart[itemExists].quantity++ //Incremets by one the quantity of items
      setCart(updateCart) // Using the Hook to update the cart, using immutable function (not modifying th eoriginal state)
    } else {
      console.log('Item doesnt exist... adding it')
      item.quantity = 1 // property added on the flight
      setCart(() => [...cart, item])
    }

  }

  // Remove from cart\
  function removeFromCart(id) {
    console.log("Removing item...")
    setCart( prevCart => prevCart.filter( guitar => guitar.id !== id) )
  }

  return (
    <>
      <Header 
        cart = {cart}
        removeFromCart = {removeFromCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
              key = {guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
