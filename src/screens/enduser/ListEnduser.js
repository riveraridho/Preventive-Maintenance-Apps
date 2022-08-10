import React, {Component} from 'react';
import {
  Box,
  FlatList,
  NativeBaseProvider,
  Button,
  Text,
  Flex,
  Toast,
} from 'native-base';
import {listPmEnduser} from '../../services/pm_enduser_service';
import {getDBConnection} from '../../services/db_service';
import DataList from '../../components/DataList';
import RNFetchBlob from 'rn-fetch-blob';
import {Pressable, PermissionsAndroid} from 'react-native';
import moment from 'moment';

class ListEnduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endusers: [],
    };
  }

  async componentDidMount() {
    console.log('componentdidmount');
    const db = await getDBConnection();
    //await deletePmNetwork(db, this.state.networks);
    let a = await listPmEnduser(db);
    this.setState({endusers: a});
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      a = await listPmEnduser(db);
      this.setState({endusers: a});
      console.log(db);
    });
  }

  async componentWillUnmount() {
    this._unsubscribe();
    console.log('re-render');
  }

  renderItem = ({item}) => {
    console.log('isi item', item);
    return (
      <Pressable
        onPress={() => {
          this.props.navigation.navigate('ViewEnduser', {
            id: item.pm_end_user_id,
          });
        }}>
        <DataList
          item_1={item.tanggal}
          item_2={item.jenis_perangkat}
          item_3={item.nama_teknisi}
        />
      </Pressable>
    );
  };

  writeCsv = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const endusers = this.state.endusers;
        const thisMonth = moment().format('YYYY-MMM-Do');
        // construct csvString
        const headerString = 'Tanggal;Nama Teknisi;Serial Number Unit\n';
        const rowString = endusers
          .map(d => `${d.tanggal};${d.nama_teknisi};${d.serial_number}\n`)
          .join('');
        const csvString = `${headerString}${rowString}`;

        // write the current list of answers to a local csv file
        const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/Enduser-${thisMonth}.txt`;
        console.log('pathToWrite', pathToWrite);
        RNFetchBlob.fs
          .writeFile(pathToWrite, csvString, 'utf8' /*csvString, 'utf8'*/)
          .then(() => {
            Toast.show({
              title: 'Data berhasil di-download',
              status: 'success',
            });
            console.log(`wrote file ${pathToWrite}`);
          })
          .then(() =>
            RNFetchBlob.android.addCompleteDownload({
              title: `Network-${thisMonth}`,
              description: 'Download complete',
              mime: 'application/csv',
              path: pathToWrite,
              showNotification: true,
            }),
          )
          .catch(error => console.error(error));
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    let buttonDownload;
    const data = this.state.endusers;
    if (data != 0) {
      buttonDownload = (
        <Button bgColor="success.500" my="2" w="75%" onPress={this.writeCsv}>
          <Box w="100%" alignItems="center" py="1.5">
            <Text bold color="white" fontSize="md" textAlign="center">
              DOWNLOAD
            </Text>
          </Box>
        </Button>
      );
    }
    return (
      <NativeBaseProvider>
        <Box p="3">
          <FlatList
            data={data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </Box>
        <Flex
          direction="column"
          alignItems="center"
          mb="2.5"
          mt="1.5"
          _text={{
            color: 'primary.800',
          }}>
          {buttonDownload}
        </Flex>
      </NativeBaseProvider>
    );
  }
}

export default ListEnduser;
