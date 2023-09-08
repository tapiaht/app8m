import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import renderer from 'react-test-renderer';
import Navigation from '../../src/navigation/Navigation';

// jest.mock('../hooks/useAuth', () => () => ({
jest.mock('../../src/hooks/useAuth.js', () => () => ({
  auth: {
    picture: 'https://example.com/profile.png',
  },
}));

jest.mock('react-native-vector-icons/FontAwesome5', () => 'Icon');

describe('Navigation', () => {
  it('renders correctly', () => {
    const Tab = createBottomTabNavigator();
    const tree = renderer
      .create(
        <Tab.Navigator initialRouteName="Account">
          <Tab.Screen
            name="Challenge"
            component={() => <div>Challenge</div>}
            options={{
              tabBarLabel: 'Retos',
              tabBarIcon: 'clock',
            }}
          />
          <Tab.Screen
            name="Advice"
            component={() => <div>Advice</div>}
            options={{
              tabBarLabel: 'Remedios',
              tabBarIcon: 'lightbulb',
            }}
          />
          <Tab.Screen
            name="Account"
            component={() => <div>Account</div>}
            options={{
              tabBarLabel: 'Perfil',
              tabBarIcon: 'user',
            }}
          />
        </Tab.Navigator>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders custom icon correctly', () => {
    const tree = renderer
      .create(renderIcon())
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders profile picture correctly', () => {
    const tree = renderer
      .create(renderPicture())
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

function renderIcon() {
  return (
    <Image
    //   source={require('../assets/eigth.png')}
      source={require('../../src/assets/eigth.png')}
      style={{ width: 40, height: 40 }}
    />
  );
}

function renderPicture() {
  const { auth } = useAuth();
  let url = '';
  if (auth) {
    url = { uri: auth?.picture };
  } else {
    // url = require('../assets/nohay.png');
    url = require('../../src/assets/nohay.png');
  }
  return (
    <Image
      source={url}
      style={{ width: 40, height: 40, borderRadius: 45 }}
    />
  );
}