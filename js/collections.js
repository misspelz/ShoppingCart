// pick each of the 'Add to Cart' Button
let add_to_cart_btns = document.getElementsByClassName("add-to-cart-btn")
// console.log(add_to_cart_btns) - this is an array like collection. So, we have to loop through using for loop
for(let i=0; i<add_to_cart_btns.length; i++){
  // console.log(add_to_cart_btns[i]) - this gives us access to each of the button. Now, we add a function to each of the button
  add_to_cart_btns[i].addEventListener("click", addToCart)
}

function addToCart(event){
  let btn = event.target
  // console.log(btn) - this gives us access to each button on click

  // get each button details by accessing the parent and grandparent where necessary
  let btn_parent = btn.parentElement
  let btn_grandparent = btn.parentElement.parentElement

  let itemTitle = btn_grandparent.children[0].textContent
  let itemImage = btn_grandparent.children[1].src
  let itemPrice = btn_parent.children[0].textContent

  //check that item to be added is not in cart
  const cartItemTitle = document.getElementsByClassName("cartItemTitle")
  for (let i = 0; i < cartItemTitle.length; i++) {
    const itemTitleElement = cartItemTitle[i]

    if (itemTitleElement.textContent === itemTitle) {
      alert("Item already in Cart");
      return;
    }
  }
   
  // create the cart where the item details will be stored on click
  let itemContainer = document.createElement("tr") // this is created in memory
  itemContainer.innerHTML = `
  <td class="cart-items-title flex justify-center items-center">
      <img src=${itemImage} alt="" class="w-[80px] mr-[10px]">,
      <span class="cartItemTitle">${itemTitle}</span>
  </td>
  <td class="cart-items-price text-center">${itemPrice}</td>
  <td class="cart-items-qty-container text-center">
      <input type="number" value="1" class="cart-items-qty bg-white w-[70px] text-center border-red-500 border-solid border-[2px] pt-[3px] pb-[3px] text-black mr-[12px]">
      <button class="cart-items-remove bg-red-500 text-white font-bold pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-md hover:opacity-40">REMOVE</button>
  </td>
  `

  // append the itemContainer to the parent element
  let main_container = document.getElementsByTagName("tbody")[0]
  
  main_container.append(itemContainer)


  // pick the item quantity and loop through to access each item qty
  let itemQtyInput =  document.getElementsByClassName("cart-items-qty")
  for(let i=0; i<itemQtyInput.length; i++){
    itemQtyInput[i].addEventListener("click", updateItemQty)
  }


  grandTotal()

  // remove_btns for loop
  for(let i=0; i<remove_btns.length; i++){
    remove_btns[i].addEventListener("click", removeItem)
  }
}

// create function for updateItemQty
function updateItemQty(event){
  number_of_items = event.target
  
  number_of_items_parent = number_of_items.parentElement
  number_of_items_grandparent = number_of_items.parentElement.parentElement 

  // console.log(number_of_items_parent)
  priceElement = number_of_items_grandparent.children[1]
  priceElementContent = priceElement.textContent.replace("₦", "") // remove the naira symbol so you can multiply just numbers
  priceElement = "₦" + number_of_items.value*priceElementContent
  // console.log(priceElementContent)

  // to make sure the itemQty isn't less than 1 and it's an integer
  if(isNaN(number_of_items.value) || number_of_items.value <= 0){
      number_of_items.value = 1
  }

  // to calculate the grand total - add the function to the addToCart function above

  grandTotal()

  
}

// create function for grand total
function grandTotal(){
  let grand_total = document.getElementsByClassName("grand-total")[0]
  let total = 0
  let total_price = document.getElementsByClassName("cart-items-price")
  for(let i=0; i<total_price.length; i++){
    // remove the naira sign in each of those prices
    total_price_content = Number(total_price[i].textContent.replace("₦", ""))
    total += total_price_content
  }

  // console.log(total)
  // pick up the grand total and inject the total
  grand_total.textContent = "Total: " + "₦" + total

  // whenever the itemQty increases, it should also increase the grand total
  // call the grandTotal in the updateItemQty function above
}

// create the function for remove item
let remove_btns = document.getElementsByClassName("cart-items-remove")
// loop through and add the loop to the addToCart function because that's when we'll have access to the remove button, that is, after adding to cart


function removeItem(event){
  let remove_btn = event.target

  remove_btn_parent = remove_btn.parentElement
  remove_btn_grandparent = remove_btn.parentElement.parentElement
  remove_btn_grandparent.remove()

  // grand total function will also be called here when removing item
  grandTotal()
}

