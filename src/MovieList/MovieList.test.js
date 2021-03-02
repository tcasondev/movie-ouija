import React from "react";
import MovieList from "./MovieList";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Account Component", () => {
  it("component", () => {
    const accountComponent = shallow(<MovieList />);
    expect(accountComponent).toMatchSnapshot();
  });
});
