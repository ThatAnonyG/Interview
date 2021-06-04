const axios = require("../lib/axiosConfig");
const { getUser } = require("../lib");

jest.mock("../lib/axiosConfig", () => ({
  baseUrl: "https://api.github.com",
  request: jest.fn().mockResolvedValue({
    data: {
      login: "ThatAnonyG",
      id: 53178362,
      html_url: "https://github.com/ThatAnonyG",
    },
    status: 200,
  }),
}));

describe("test getUser [passing]", () => {
  afterEach(() => jest.resetAllMocks());

  test("fetches user by username", async () => {
    const username = "ThatAnonyG";
    const res = await getUser(username);
    expect(axios.request).toHaveBeenCalled();
    expect(axios.request).toHaveBeenCalledWith({
      method: "get",
      url: `/users/${username}`,
    });
    expect(res.login).toEqual(username);
  });
});
