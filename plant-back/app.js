const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { userModel } = require("./models/user")
const { adminModel } = require("./models/admin")
const { feedbackModel } = require("./models/feedback")
const { v4: uuidv4 } = require("uuid");
const multer = require('multer');
const path = require('path');
const PlantModel = require("./models/plant")
const OrderModel = require("./models/order")
const CartModel = require("./models/cart")
const { discountModel } = require("./models/discount")


mongoose.connect("mongodb+srv://dvishnu640:vishnu@cluster0.ju3eous.mongodb.net/plantdb?retryWrites=true&w=majority&appName=Cluster0")



const app = express()
app.use(cors())
app.use(express.json())

const generateHashedPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10)  
    return bcrypt.hash(password,salt)
}


//--------------------------------------------------------------USER----------------------------------------------

app.post("/userSignUp",async(req,res)=>{

    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)

    input.password = hashedPassword     
    let user = new userModel(input)
    user.save()
    console.log(user)

    res.json({"status":"success"})
})

app.post("/userSignIn", (req, res) => {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
        return res.json({ status: "email and password required" });
    }

    // Find user by email
    userModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.json({ status: "user not found" });
            }

            // Compare input password with hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ status: "error", message: "Internal Server Error" });
                }

                if (!isMatch) {
                    return res.json({ status: "incorrect password" });
                }

                // Create token (without role)
                jwt.sign(
                    { email: user.email }, // no role here
                    "plant-app",
                    { expiresIn: "1d" },
                    (err, token) => {
                        if (err) {
                            return res.json({ status: "unable to create token" });
                        }
                        res.json({ status: "success", userid: user._id, token: token });
                    }
                );
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        });
});


//-------------------------------------ADMIN-------------------------------------------------

app.post("/AdminLogin", (req, res) => {
    let input = req.body;

    // Default admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    // Check if the input matches admin credentials
    if (input.email === adminEmail && input.password === adminPassword) {
        // Admin login successful
        jwt.sign({ email: input.email }, "plant-app", { expiresIn: "1d" }, (error, token) => {
            if (error) {
                res.json({ "status": "Token credentials failed" });
            } else {
                res.json({ "status": "success", "token": token, "message": "Admin logged in successfully" });
            }
        });
    } else {
        // Check if the user exists in the database
        adminModel.find({ name: input.name }).then((response) => {
            if (response.length > 0) {
                const validator = bcrypt.compareSync(input.password, response[0].password);
                if (validator) {
                    // User login successful
                    jwt.sign({ email: input.email}, "plant-app", { expiresIn: "1d" }, (error, token) => {
                        if (error) {
                            res.json({ "status": "Token credentials failed" });
                        } else {
                            res.json({ "status": "success", "token": token });
                        }
                    });
                } else {
                    res.json({ "status": "Wrong password" });
                }
            } else {
                res.json({ "status": "Username doesn't exist" });
            }
        }).catch((err) => {
            res.json({ "status": "Error occurred", "error": err.message });
        });
    }
});


//---------------------------------FEEDBACK----------------------------------------------------//

// Submit Feedback API
app.post("/submitFeedback", async (req, res) => {
    try {
        const { email, message, rating } = req.body;

        // Validate input fields
        if (!email || !message || rating === 0) {
            return res.status(400).json({ status: "error", message: "Email, message, and rating are required." });
        }

        // Validate rating (should be between 1 and 5)
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ status: "error", message: "Rating must be between 1 and 5." });
        }

        // Create feedback entry
        const newFeedback = new feedbackModel({
            feedbackId: uuidv4(), 
            email,
            message,
            rating
        });

        // Save feedback to MongoDB
        const savedFeedback = await newFeedback.save();
        res.status(201).json({ status: "success", data: savedFeedback });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// 📜 Get all feedbacks
app.get('/getFeedbacks', async (req, res) => {
    try {
        const feedbacks = await feedbackModel.find();
        res.json(feedbacks);
    } catch (err) {
        console.error("❌ Error fetching feedbacks:", err);
        res.status(500).json({ error: "Server error while fetching feedbacks." });
    }
});

// Delete feedback by ID
app.delete('/deleteFeedback/:id', async (req, res) => {
    const feedbackId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(feedbackId)) {
        return res.status(400).json({ error: "❌ Invalid feedback ID" });
    }

    try {
        const deletedFeedback = await feedbackModel.findByIdAndDelete(feedbackId);
        if (!deletedFeedback) {
            return res.status(404).json({ error: "❌ Feedback not found" });
        }
        res.json({ message: "✅ Feedback deleted successfully!" });
    } catch (err) {
        console.error("❌ Error deleting feedback:", err);
        res.status(500).json({ error: "Server error while deleting feedback." });
    }
});


//---------------------------------------USER PROFILE-----------------------------------------------------

// ✅ Get single user profile by email (query param)
app.get("/userProfile", async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ status: "error", message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email }).select("-password -confirmPassword");
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});


// ✅ Get all user profiles
app.get("/allUserProfiles", async (req, res) => {
  try {
    const users = await userModel.find().select("-password -confirmPassword");
    if (!users.length) {
      return res.status(404).json({ status: "error", message: "No users found" });
    }
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});


app.put("/updateProfile", async (req, res) => {
  try {
    const { email, name, username } = req.body;

    const user = await userModel
      .findOneAndUpdate(
        { email },
        { name, username },
        { new: true } // return updated document
      )
      .select("-password -confirmPassword");

    if (!user) return res.status(404).json({ status: "error", message: "User not found" });

    res.json({ status: "success", data: user }); // return user with status
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Update failed" });
  }
});




// Delete user by ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });
    res.json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "error", message: "Deletion failed" });
  }
});


//----------------------------------PLANT--------------------------------------------------------//

app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG and PNG are allowed.'));
    }
  }
});

// POST endpoint to upload plant data
app.post('/plant', upload.single('picture'), async (req, res) => {
  try {
    const { name, category, stock, price, seller, description, plantId , newprice } = req.body;
    const picture = req.file ? req.file.path : ''; // Get the image path from the uploaded file

    // Validate fields
    if (!name || !category || !picture || !stock || !price || !seller || !description || !plantId || !newprice) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill in all fields.'
      });
    }

    // Create a new plant document
    const newPlant = new PlantModel({
      picture,
      category,
      name,
      stock,
      price,
      seller,
      description,
      plantId,
      newprice
    });

    // Save the plant to the database
    await newPlant.save();

    res.status(200).json({ status: 'success', data: newPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error uploading plant' });
  }
});

// GET endpoint to fetch all plants
app.get('/viewplants', async (req, res) => {
  try {
    const plants = await PlantModel.find(); // Retrieve all plants from the database
    res.status(200).json({ status: 'success', plants }); // Return the plants in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error fetching plants' });
  }
});

// DELETE endpoint to delete a plant by ID
app.delete('/plant/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the plant from the database by ID
    const deletedPlant = await PlantModel.findByIdAndDelete(id);

    if (deletedPlant) {
      res.status(200).json({ status: 'success', message: 'Plant deleted successfully' });
    } else {
      res.status(404).json({ status: 'error', message: 'Plant not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error deleting plant' });
  }
});

// GET endpoint to fetch a single plant by its ID
app.get('/plant/:id', async (req, res) => {
  try {
    const plant = await PlantModel.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ status: 'error', message: 'Plant not found' });
    }
    res.status(200).json({ status: 'success', plant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error fetching plant' });
  }
});

// PUT endpoint to edit/update a plant by ID
app.put("/plant/:id", upload.single("picture"), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ status: "error", message: "Invalid plant ID" });
    }

    // Build update object
    const updateData = {};
    const allowedFields = ["name", "category", "stock", "price", "seller", "description", "plantId", "newprice"];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== "") {
        updateData[field] = req.body[field];
      }
    });

    // Handle new picture
    if (req.file) {
      updateData.picture = req.file.path;
    }

    // Update plant
    const updatedPlant = await PlantModel.findByIdAndUpdate(id, { $set: updateData }, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlant) {
      return res.status(404).json({ status: "error", message: "Plant not found" });
    }

    res.status(200).json({
      status: "success",
      message: "Plant updated successfully",
      data: updatedPlant,
    });
  } catch (error) {
    console.error("Error updating plant:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating plant",
      error: error.message,
    });
  }
});






//--------------------------ORDER--------------------------------------------------------------//

// Create new order
app.post("/order", async (req, res) => {
  try {
    const { userId, name, category, seller, price, quantity, paymentMethod } = req.body;

    // Validate required fields
    if (!userId || !name || !category || !seller || !price || !quantity || !paymentMethod) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields: userId, name, category, seller, price, quantity, paymentMethod"
      });
    }

    // Calculate total price
    const totalPrice = price * quantity;

    // Create new order
    const order = new OrderModel({
      userId,
      name,
      category,
      seller,
      price,
      quantity,
      totalPrice, // ✅ Store total price in DB
      paymentMethod
    });

    await order.save();
    res.status(201).json({ status: "success", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

  
// Get orders for a user
app.get("/orders/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const orders = await OrderModel.find({ userId }).sort({ date: -1 }); // newest first
      res.json({ status: "success", orders });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
  

  app.get("/getallorders", async (req, res) => {
    try {
      const orders = await OrderModel.find().sort({ date: -1 });
  
      // For each order, fetch the corresponding user info
      const ordersWithUserInfo = await Promise.all(
        orders.map(async (order) => {
          const user = await userModel.findById(order.userId).select('name email');
          return {
            ...order.toObject(),
            userName: user ? user.name : "Unknown",
            userEmail: user ? user.email : "N/A",
          };
        })
      );
  
      res.json({ status: "success", orders: ordersWithUserInfo });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  });
// PUT /orders/:orderId/proceed
app.put("/orders/:orderId/proceed", async (req, res) => {
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      req.params.orderId,
      { status: "Shipped" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }

    res.json({ status: "success", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

app.put("/orders/:id/cancel", async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ status: "error", message: "Order not found" });
    }
    res.json({ status: "success", order });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});








//----------------------------------cart--------------------------------------------------------//

// Add item to cart (with userId)
app.post("/cart", async (req, res) => {
  try {
    const { userId, name, category, seller, price, picture, quantity } = req.body;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID is required" });
    }
    if (!seller) {
      return res.status(400).json({ status: "error", message: "Seller is required" });
    }

    const qty = quantity && quantity > 0 ? quantity : 1;

    const existingItem = await CartModel.findOne({ userId, name, seller });

    if (existingItem) {
      existingItem.quantity += qty;
      await existingItem.save();
      return res.status(200).json({
        status: "success",
        message: "Product quantity updated in cart",
        cartItem: existingItem
      });
    }

    const newCartItem = new CartModel({
      userId,
      name,
      category,
      seller,
      price,
      picture,
      quantity: qty
    });

    await newCartItem.save();

    res.status(200).json({
      status: "success",
      message: "Product added to cart",
      cartItem: newCartItem
    });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ status: "error", message: "Error adding to cart" });
  }
});

// Get all cart items for a user
app.get("/cart", async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID required" });
    }

    const cartItems = await CartModel.find({ userId });
    res.status(200).json({ status: "success", cart: cartItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error fetching cart items" });
  }
});

// ✅ Clear all cart items for a user
// Place this ABOVE "/cart/:id" so it matches first
app.delete("/cart/clear", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID required" });
    }

    await CartModel.deleteMany({ userId });
    res.json({ status: "success", message: "Cart cleared after order" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ status: "error", message: "Error clearing cart" });
  }
});

// Delete cart item by id (only if owned by user)
app.delete("/cart/:id", async (req, res) => {
  try {
    const cartId = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ status: "error", message: "User ID required" });
    }

    const deleted = await CartModel.findOneAndDelete({ _id: cartId, userId });

    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Cart item not found or unauthorized" });
    }

    res.status(200).json({ status: "success", message: "Item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error removing item" });
  }
});


//------------------------------DISCOUNTS--------------------------------------------------------------------



// Get all discounts
app.get("/discounts", async (req, res) => {
  try {
    const discounts = await discountModel.find();
    res.json(discounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch discounts" });
  }
});

app.post("/discounts", async (req, res) => {
  try {
    const { title, type, product, details, percentage, image , newPrice } = req.body;

    // Validate required fields
    if (!title || !type || !product || !newPrice) {
      return res.status(400).json({
        status: "error",
        message: "Title, type, and product are required",
      });
    }

    const discount = new discountModel({ title, type, product, details, percentage, image , newPrice });
    await discount.save();

    res.json({ status: "success", data: discount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to add discount" });
  }
});


// Delete discount
app.delete("/discounts/:id", async (req, res) => {
  try {
    const discount = await discountModel.findByIdAndDelete(req.params.id);
    if (!discount) return res.status(404).json({ status: "error", message: "Discount not found" });
    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to delete discount" });
  }
});


// Get a single discount by ID
app.get("/discounts/:id", async (req, res) => {
  try {
    const discount = await discountModel.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ status: "error", message: "Discount not found" });
    }
    res.status(200).json({ status: "success", discount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to fetch discount" });
  }
});


app.listen(8080, () => {
  console.log("server started")
})