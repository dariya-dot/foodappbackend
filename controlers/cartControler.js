const User = require("../models/User");




const addItemToCart = async (req, res) => {
 
  try {
    const userId = req.userId;
    
     //// getting from the middleware   
    /// actully when we passing the token in header the middleware will decode it and the we get this id
    const { itemId, productName, price ,image} = req.body; //sending the data in body

    if (!itemId || !productName || !price) {
      return res
        .status(400)
        .json({ message: "Item ID, name, and price are required" });
    }

    let userData = await User.findById(userId); //finding the user data by id

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartItems = (await userData.cartData) || {}; //intilistion cart in user profile

    if (!cartItems[itemId]) {
      cartItems[itemId] = { productName, price, quantity: 1, image};
    } else {
      cartItems[itemId].quantity += 1;
    }

    const updatedCart = await User.findByIdAndUpdate(    /// add the item to te cart of the user
      userId,
      { cartData: cartItems },          
      { new: true }
    );
    res.status(200).json({ message: "Cart updated successfully", updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//// remove from the cart 

const removeItemFromCart  = async (req, res) => {
  try {
    const userId = req.userId; //// getting from the middleware   

    const { itemId } = req.body; //sending the data in body

    if (!itemId ) {
      return res
        .status(400)
        .json({ message: "Item ID is required" });
    }

    let userData = await User.findById(userId); //finding the user data by id

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartItems = (await userData.cartData) || {}; //intilistion cart in user profile
     
    if(!cartItems[itemId]){
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (cartItems[itemId].quantity>1){
      cartItems[itemId].quantity -=1
    }else {
      delete cartItems[itemId];
    }
   

    const updatedCart = await User.findByIdAndUpdate(    /// add the item to te cart of the user
      userId,
      { cartData: cartItems },          
      { new: true }
    );
    res.status(200).json({ message: "Cart  item deleted successfully", updatedCart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getCartData= async(req, res)=>{

try {
  const userId = req.userId;
  const response= await User.findById(userId)
  let cartData=await response.cartData

  res.json({message:"cart data fetched",cartData})
} catch (error) {
  console.error(error)
}
}

module.exports = { addItemToCart,removeItemFromCart,getCartData };
