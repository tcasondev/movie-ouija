import React from "react";
import Landing from "./Landing";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Account Component", () => {
  it("component", () => {
    const accountComponent = shallow(<Landing />);
    expect(accountComponent).toMatchSnapshot();
  });
});
