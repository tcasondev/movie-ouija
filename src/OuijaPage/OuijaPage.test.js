import React from 'react';
import ReactDOM from 'react-dom';
import OuijaPage from './OuijaPage';
import {Route, Switch} from "react-router-dom";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Account Component', () => {

    it('component', () => {
        const accountComponent = shallow(<OuijaPage />);
        expect(accountComponent).toMatchSnapshot();
    });
});