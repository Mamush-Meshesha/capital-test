
// const registerAdmin = async (req, res, models) => {
//     const { email, password, location, phone, id, restorantName, adminName, image } = req.body
    
//     try {
//         if (!email || !password) {
//             return res.status(400).json({message: "Required fields are missing"})
//         }

//         const Admin = models.Admin

//         const existingAdmin = await Admin.findOne({ where: { email } })
//         if (existingAdmin) {
//             return res.status(400).json({ message: "Admin already exists"})
//         }

//         const newAdmin = await Admin.create({
//             email,
//             password,
//             location,
//             phone,
//             restorantName,
//             adminName,
//             image
//         })

//         return res.status(201).json({
//             message: "Admin Registered succesfully",
//             user: {
//                 id: newAdmin.id,
//                 email: newAdmin.email,
//                 location: newAdmin.location,
//                 phone: newAdmin.phone,
//                 restorantName: newAdmin.restorantName,
//                 adminName: newAdmin.adminName,
//                 image: newAdmin.image
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

// export {registerAdmin}
