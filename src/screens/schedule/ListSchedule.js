import React, {Component} from 'react';
import {ScrollView, PermissionsAndroid, Pressable} from 'react-native';
import {
  Box,
  FlatList,
  NativeBaseProvider,
  Button,
  Text,
  Flex,
} from 'native-base';
import DataList from '../../components/DataList';
import {listSchedule, deleteSchedule} from '../../services/schedule_service';
import {getDBConnection} from '../../services/db_service';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ScheduleList from '../../components/ScheduleList';

class ListSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      schedules: [],
    };
  }

  async componentDidMount() {
    console.log('componentdidmount');
    const db = await getDBConnection();
    //await deleteSchedule(db, this.state.schedules);
    let a = await listSchedule(db);
    this.setState({nama: 'ridho', schedules: a});
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      a = await listSchedule(db);
      this.setState({nama: 'ridho', schedules: a});
      console.log('db: ', db);
    });
  }

  async componentWillUnmount() {
    this._unsubscribe();
    console.log('isi :', this._unsubscribe());
    console.log('re-render');
  }

  renderItem = ({item}) => {
    const bulan = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    return (
      <Pressable
        onPress={() => {
          this.props.navigation.navigate('ViewSchedule', {
            id: item.schedule_id,
          });
        }}>
        <ScheduleList item_1={bulan[item.bulan_pm]} item_2={item.jenis_pm} />
      </Pressable>
    );
  };

  render() {
    const data = this.state.schedules;
    return (
      <NativeBaseProvider>
        <Box p="3">
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </Box>
      </NativeBaseProvider>
    );
  }
}

export default ListSchedule;
