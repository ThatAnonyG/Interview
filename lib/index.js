// Imports
const axios = require("./axiosConfig");

/**
 * Get github user info with their username
 * @param {string} username
 */
module.exports.getUser = async (username) => {
  const res = await axios.request({
    method: "get",
    url: `/users/${username}`,
  });
  const { data } = res;

  if (res.status === 404 && data.message === "Not Found") {
    throw new Error(`No user found with the username ${username}.`);
  } else {
    const { login, id, html_url } = data;
    return { login, id, html_url };
  }
};
