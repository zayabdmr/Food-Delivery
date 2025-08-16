import UserModel from "../model/user-model.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { email, password, phoneNumber, address, isVerified } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      address: address,
      isVerified: isVerified || false,
    });

    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).send({
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error("Create user error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    return res.status(200).send({
      success: true,
      users: users,
    });
  } catch (error) {
    console.error("Get users error:", error); // Fixed: was "err"
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format (for MongoDB ObjectId)
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await UserModel.findById(id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("Get user by ID error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID format",
      });
    }

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      user: { id: user._id },
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove sensitive fields that shouldn't be updated directly
    delete updateData.password; // Use separate endpoint for password updates
    delete updateData._id;
    delete updateData.__v;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID format",
      });
    }

    // Check if user exists
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user and return updated document
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    return res.status(200).send({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
