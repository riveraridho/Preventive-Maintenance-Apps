import React, {Component} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import {
  Box,
  VStack,
  Heading,
  Flex,
  FormControl,
  Input,
  NativeBaseProvider,
  Select,
  Divider,
  Button,
  TextArea,
  Text,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import TodoDescription from '../../components/TodoDescription';
import moment from 'moment';
import {connect} from 'react-redux';
import {setNetwork} from '../../redux/action';
import {getDBConnection} from '../../services/db_service';
import {v4 as uuidv4} from 'uuid';
import {createPmNetwork} from '../../services/pm_network_service';

class CreateNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      open: false,
      viewDate: '',
      nama_teknisi: '',
      nama_perangkat: '',
      tipe_perangkat: '',
      product: '',
      model: '',
      ip_address: '',
      lokasi: '',
      note: '',
      backupconfigcheck: 0,
      backupconfignote: '',
      physicalcheck: 0,
      physicalnote: '',
      rj45ceheck: 0,
      rj45note: '',
      wallmountcheck: 0,
      wallmountnote: '',
    };
  }

  onSave = async () => {
    const {navigation} = this.props;
    const db = await getDBConnection();
    this.props.dispatchsetNetwork(this.state);
    const pmNetworkId = uuidv4();
    const PmNetwork = {
      pm_network_device_id: pmNetworkId,
      nama_teknisi: this.state.nama_teknisi,
      nama_perangkat: this.state.nama_perangkat,
      tipe_perangkat: this.state.tipe_perangkat,
      tanggal: this.state.viewDate,
      product: this.state.product,
      model: this.state.model,
      ip_address: this.state.ip_address,
      lokasi: this.state.lokasi,
      note: this.state.note,
      checklist: {
        checklist_pm_network_id: uuidv4(),
        pm_checklist_id: pmNetworkId,
        backup_config_check: this.state.backupconfigcheck,
        backup_config_note: this.state.backupconfignote,
        physical_check: this.state.physicalcheck,
        physical_note: this.state.physicalnote,
        rj45_ceheck: this.state.rj45ceheck,
        rj45_note: this.state.rj45note,
        wallmount_check: this.state.wallmountcheck,
        wallmount_note: this.state.wallmountnote,
      },
    };
    console.log(PmNetwork);
    await createPmNetwork(db, PmNetwork);
    navigation.navigate('ListNetwork', {
      nama: 'ridho',
    });
  };

  render() {
    console.log(this.state.nama_perangkat);
    console.log(this.state.backupconfigcheck);
    return (
      <NativeBaseProvider>
        <Box flex="1" safeAreaTop backgroundColor="#F1F1F1">
          <ScrollView
            _contentContainerStyle={{
              h: '40',
              px: '20px',
              mb: '4',
              minW: '72',
            }}>
            <VStack space={2.5} w="100%" px="3">
              {/* flexDirection -> column */}
              <Flex
                direction="column"
                alignItems="center"
                mb="2.5"
                mt="1.5"
                _text={{
                  color: 'coolGray.800',
                }}>
                <Input
                  my="1"
                  value={this.state.nama_teknisi}
                  placeholder="Nama Teknisi"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      nama_teknisi: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.nama_perangkat}
                  my="1"
                  placeholder="Nama Perangkat"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      nama_perangkat: event.nativeEvent.text,
                    });
                  }}
                />
                <FormControl w="100%" isRequired>
                  <Select
                    backgroundColor="#FFFFFF"
                    minWidth="200"
                    accessibilityLabel="Tipe Perangkat"
                    placeholder="Tipe Perangkat"
                    selectedValue={this.state.tipe_perangkat}
                    _selectedItem={{
                      bg: 'primary.300',
                    }}
                    my="1"
                    onValueChange={itemValue => {
                      this.setState({
                        tipe_perangkat: itemValue,
                      });
                    }}>
                    <Select.Item label="Switch" value="switch" />
                    <Select.Item label="Router" value="router" />
                  </Select>
                </FormControl>
                <Input
                  my="1"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  isDisabled
                  InputRightElement={
                    <Button
                      w="1/6"
                      h="full"
                      size="xs"
                      my="1"
                      variant="outline"
                      backgroundColor="#FFFFFF"
                      onPress={() => this.setState({open: true})}>
                      Tanggal
                    </Button>
                  }
                  value={this.state.viewDate}
                />
                <DatePicker
                  modal
                  androidVariant="iosClone"
                  mode="date"
                  open={this.state.open}
                  date={this.state.date}
                  onConfirm={date => {
                    this.setState({
                      open: false,
                      date,
                      viewDate: moment(date).format('YYYY-MMM-DD'),
                    });
                  }}
                  onCancel={() => {
                    this.setState({open: false});
                  }}
                />
                <Input
                  value={this.state.product}
                  my="1"
                  placeholder="Product"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      product: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.model}
                  my="1"
                  placeholder="Model"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      model: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.ip_address}
                  my="1"
                  placeholder="IP"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  keyboardType="number-pad"
                  onChange={event => {
                    this.setState({
                      ip_address: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.lokasi}
                  my="1"
                  placeholder="Lokasi"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      lokasi: event.nativeEvent.text,
                    });
                  }}
                />
              </Flex>
              <Divider />
              <Heading pt="1" size="md">
                Deskripsi Pekerjaan
              </Heading>
              <Flex
                direction="column"
                alignItems="center"
                mb="2.5"
                mt="1.5"
                _text={{
                  color: 'coolGray.800',
                }}>
                {/* Form Deskirpsi Pekerjaan */}
                <TodoDescription
                  title="Backup Konfigurasi"
                  placeholder="Keterangan"
                  isCheck={this.state.backupconfigcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        backupconfigcheck: 1,
                      });
                    } else {
                      this.setState({
                        backupconfigcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      backupconfignote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Pengecekan Fisik Perangkat"
                  placeholder="Keterangan"
                  isCheck={this.state.physicalcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        physicalcheck: 1,
                      });
                    } else {
                      this.setState({
                        physicalcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      physicalnote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Check RJ45 Connector"
                  placeholder="Keterangan"
                  isCheck={this.state.rj45ceheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        rj45ceheck: 1,
                      });
                    } else {
                      this.setState({
                        rj45ceheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      rj45note: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Membersihkan Wallmount"
                  placeholder="Keterangan"
                  isCheck={this.state.wallmountcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        wallmountcheck: 1,
                      });
                    } else {
                      this.setState({
                        wallmountcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      wallmountnote: event.nativeEvent.text,
                    });
                  }}
                />
                <TextArea
                  value={this.state.note}
                  px="3"
                  my="2"
                  h={20}
                  backgroundColor="#FFFFFF"
                  placeholder="Note"
                  w="100%"
                  maxW="100%"
                  onChange={event => {
                    this.setState({
                      note: event.nativeEvent.text,
                    });
                  }}
                />
                <Button
                  my="2"
                  w="75%"
                  onPress={this.onSave}
                  bgColor="success.500">
                  <Box w="100%" alignItems="center" py="1.5">
                    <Text bold color="white" fontSize="md" textAlign="center">
                      Create
                    </Text>
                  </Box>
                </Button>
              </Flex>
            </VStack>
          </ScrollView>
        </Box>
      </NativeBaseProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    pmnetwork: state.pmnetwork,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchsetNetwork: pmnetwork => dispatch(setNetwork(pmnetwork)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNetwork);
