const axios = require("../lib/axiosConfig");
const { getUser, UserNotFoundError } = require("../lib");

jest.mock("../lib/axiosConfig", () => ({
  baseUrl: "https://api.github.com",
  request: jest.fn().mockResolvedValue({
    data: {
      message: "Not Found",
    },
    status: 404,
  }),
}));

describe("test getUser [failing]", () => {
  afterEach(() => jest.resetAllMocks());

  test("fetches user by username", async () => {
    const username = "qwertyuiop";
    expect(async () => {
      try {
        await getUser(username);
        expect(axios.request).toHaveBeenCalled();
        expect(axios.request).toHaveBeenCalledWith({
          method: "get",
          url: `/users/${username}`,
        });
      } catch (err) {
        throw err;
      }
    }).rejects.toThrow(`No user found with the username ${username}.`);
  });
});
