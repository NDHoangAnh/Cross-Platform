/* eslint-disable @typescript-eslint/no-shadow */
import {useState} from 'react';
import {TabView, TabBar} from 'react-native-tab-view';
import {klass} from '../../data/klass';
import InfoClass from '../../containers/InfoClass/InfoClass';
import Navbar from '../../components/Navbar';
import Activities from '../../containers/Activities/Activities';

function DetailClass({route}) {
  const {classId} = route.params;

  const classDetails = klass.find(item => item.id === classId);

  const [index, setIndex] = useState(0);

  const routes = [
    {key: 'info', title: 'Class Info'},
    {key: 'activities', title: 'Activities'},
  ];

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'info':
        return <InfoClass infoClass={classDetails} />;
      case 'activities':
        return <Activities activities={classDetails?.activity} />;
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'blue'}}
      style={{backgroundColor: 'white'}}
      activeColor="blue"
      inactiveColor="black"
    />
  );

  return (
    <>
      <Navbar listAction={[]} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </>
  );
}

export default DetailClass;
