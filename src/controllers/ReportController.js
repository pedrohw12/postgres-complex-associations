const { Op } = require("sequelize");
const User = require("../models/User");

module.exports = {
  async show(req, res) {
    // find all users that have email ending with 'gmail.com'
    // from these users, find all that lives in the address 'x'
    // from these users, find all that have technologies beginning with 'React'

    const users = await User.findAll({
      attributes: ["name", "email"],
      where: {
        email: {
          [Op.iLike]: "%gmail.com", // looking for emails that ends with gmail.com
        },
      },
      include: [
        { association: "addresses", where: { street: "x" } }, // addresses
        {
          association: "techs", // don't need to find techs if the user does not have
          required: false,
          where: {
            name: {
              [Op.iLike]: "React%", // looking for emails that starts with React
            },
          },
        }, // techs
      ],
    });

    return res.json(users);
  },
};
