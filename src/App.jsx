import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db'

function App() {
  // Limits of items
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  // From local file
  const [data, setData] = useState(db)

  // State for shopping Cart
  const [cart, setCart] = useState([])

  // Adding guitars to cart
  function addToCart(item) {
    //Review if the added item alread exists in the cart
    const itemExists = cart.findIndex(guitar => guitar.id === item.id)
    if (itemExists >= 0) {
      console.log('Item already exist')
      if (cart[itemExists].quantity >= MAX_ITEMS) return

      const updatedCart = [...cart] //Create a copy of the state to not modify it directly (that is a bad practice)
      updatedCart[itemExists].quantity++ //Incremets by one the quantity of items
      setCart(updatedCart) // Using the Hook to update the cart, using immutable function (not modifying th eoriginal state)
    } else {
      console.log('Item doesnt exist... adding it')
      item.quantity = 1 // property added on the flight
      setCart(() => [...cart, item])
    }

  }

  // Remove from cart
  function removeFromCart(id) {
    console.log("Removing item...")
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  // Increment Quantity
  function increaseQuantity(id) {
    console.log("Incrementing...")
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item, // To not loose the reference to the  rest of the item
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // Decrement Quantity
  function decreaseQuantity(id) {
    console.log("Decrementing...")
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item, // To not loose the reference to the  rest of the item
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  // Clear shopping cart
  function clearCart() {
    console.log("Clearing cart...")
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart = {clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
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
