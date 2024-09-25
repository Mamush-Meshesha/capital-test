// import { Model, DataTypes } from "sequelize";

// export default (sequelize) => {
//   class RefreshToken extends Model {
//     static associate(models) {
//       RefreshToken.belongsTo(models.User, { foreignKey: "userId" });
//     }
//   }

//   RefreshToken.init(
//     {
//       token: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "Users",
//           key: "id",
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: "RefreshToken",
//     }
//   );

//   return RefreshToken;
// };

