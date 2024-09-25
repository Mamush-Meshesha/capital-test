// // controllers/user.controller.js
// const registerUser = async (req, res, models) => {
//   const { email, password, location, phone, userType, adminRole } = req.body;

//   try {
//     if (!email || !password) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }

//     const User = models.User;

//     // Check if user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const newUser = await User.create({
//       email,
//       password,
//       location,
//       phone,
//       userType,
//       adminRole,
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         userType: newUser.userType,
//         adminRole: newUser.adminRole,
//       },
//     });
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return res
//       .status(500)
//       .json({ message: "An error occurred while registering the user" });
//   }
// };

// const loginUser = async (req, res, models) => {
//   const { email, password } = req.body;

//   try {
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     const User = models.User;

//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isPasswordValid = await User.comparePasswords(
//       password,
//       user.password
//     );
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     // Here you would typically generate and return a JWT token
//     return res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user.id,
//         email: user.email,
//         userType: user.userType,
//         adminRole: user.adminRole,
//       },
//     });
//   } catch (error) {
//     console.error("Error logging in user:", error);
//     return res
//       .status(500)
//       .json({ message: "An error occurred while logging in" });
//   }
// };

// export { registerUser, loginUser };

