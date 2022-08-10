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
  Text,
  Button,
  TextArea,
  Modal,
} from 'native-base';
import TodoViewDescription from '../../components/TodoViewDescription';
import {getDBConnection} from '../../services/db_service';
import {
  viewPmNetwork,
  deletePmNetwork,
} from '../../services/pm_network_service';

class ViewNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: {},
      isLoad: false,
      backup_config_check: false,
      physical_check: false,
      rj45_ceheck: false,
      wallmount_check: false,
      showModal: false,
    };
  }

  async componentDidMount() {
    const db = await getDBConnection();
    //await deleteSchedule(db, this.state.schedules);
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      let network = await viewPmNetwork(db, this.props.route.params.id);
      this.setState({network});
    });
  }

  async componentWillUnmount() {
    this._unsubscribe();
    console.log('re-render');
  }

  async editScreen() {
    console.log('nav', this.props);
    //const {navigation} = this.props;
    this.props.navigation.navigate('EditNetwork', {
      id: this.state.network.pm_network_device_id,
    });
  }

  async onDelete() {
    const db = await getDBConnection();
    const id = this.state.network.pm_network_device_id;
    await deletePmNetwork(db, id);
    this.props.navigation.navigate('ListNetwork');
    console.log('isi id: ', id);
  }

  render() {
    if (this.state.network.tanggal) {
      return (
        <NativeBaseProvider>
          <Box flex="1" safeAreaTop>
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
                    isDisabled
                    InputLeftElement={'  Nama Teknisi  : '}
                    my="1"
                    value={this.state.network.nama_teknisi}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  Nama Perangkat  : '}
                    my="1"
                    value={this.state.network.nama_perangkat}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  Tipe Perangkat  : '}
                    my="1"
                    value={this.state.network.tipe_perangkat}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  Tanggal  : '}
                    my="1"
                    value={this.state.network.tanggal}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  Product  : '}
                    my="1"
                    value={this.state.network.product}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  Model  : '}
                    my="1"
                    value={this.state.network.model}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  IP  : '}
                    my="1"
                    value={this.state.network.ip_address}
                    w="100%"
                    backgroundColor="#FFFFFF"
                  />
                  <Input
                    isDisabled
                    InputLeftElement={'  Lokasi  : '}
                    my="1"
                    value={this.state.network.lokasi}
                    w="100%"
                    backgroundColor="#FFFFFF"
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
                  <TodoViewDescription
                    title="Backup Konfigurasi"
                    isCheck={this.state.network.backup_config_check}
                    onCheck={value => {
                      if (value) {
                        this.setState({
                          backup_config_check: value,
                        });
                      } else {
                        this.setState({
                          backup_config_check: value,
                        });
                      }
                    }}
                    value={this.state.network.backup_config_note}
                  />
                  <TodoViewDescription
                    title="Pengecekan Fisik Perangkat"
                    isCheck={this.state.network.physical_check}
                    onCheck={value => {
                      if (value) {
                        this.setState({
                          physical_check: value,
                        });
                      } else {
                        this.setState({
                          physical_check: value,
                        });
                      }
                    }}
                    value={this.state.network.physical_note}
                  />
                  <TodoViewDescription
                    title="Check RJ45 Connector"
                    isCheck={this.state.network.rj45_ceheck}
                    onCheck={value => {
                      if (value) {
                        this.setState({
                          physical_check: value,
                        });
                      } else {
                        this.setState({
                          physical_check: value,
                        });
                      }
                    }}
                    value={this.state.network.rj45_note}
                  />
                  <TodoViewDescription
                    title="Membersihkan Wallmount"
                    isCheck={this.state.network.wallmount_check}
                    onCheck={value => {
                      if (value) {
                        this.setState({
                          physical_check: value,
                        });
                      } else {
                        this.setState({
                          physical_check: value,
                        });
                      }
                    }}
                    value={this.state.network.wallmount_note}
                  />
                  <TextArea
                    isDisabled
                    value={this.state.network.note}
                    px="3"
                    my="2"
                    h={20}
                    backgroundColor="#FFFFFF"
                    placeholder="Note"
                    w="100%"
                    maxW="100%"
                  />
                  <Flex flexDirection="row">
                    <Button
                      my="2"
                      marginRight="2"
                      w="45%"
                      onPress={() => this.editScreen()}>
                      <Box w="100%" alignItems="center" py="1.5">
                        <Text
                          bold
                          color="white"
                          fontSize="md"
                          textAlign="center">
                          EDIT
                        </Text>
                      </Box>
                    </Button>
                    <Button
                      my="2"
                      marginLeft="2"
                      w="45%"
                      variant="outline"
                      colorScheme="danger"
                      onPress={() => this.setState({showModal: true})}>
                      <Box w="100%" alignItems="center" py="1.5">
                        <Text color="#D72503" fontSize="md" textAlign="center">
                          DELETE
                        </Text>
                      </Box>
                    </Button>
                    <Modal
                      isOpen={this.state.showModal}
                      onClose={() => this.setState({showModal: false})}>
                      <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>Yakin ingin hapus data?</Modal.Header>
                        <Modal.Body>
                          <VStack space={2} justifyContent="space-between">
                            <Text color="coolGray.800" bold>
                              {'Nama Perangkat : ' +
                                this.state.network.nama_perangkat}
                            </Text>
                            <Text color="coolGray.800" bold>
                              {'Tanggal : ' + this.state.network.tanggal}
                            </Text>
                          </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button.Group space={2}>
                            <Button
                              variant="ghost"
                              colorScheme="blueGray"
                              onPress={() => {
                                this.setState({showModal: false});
                              }}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="danger"
                              onPress={() => {
                                this.onDelete();
                                this.setState({showModal: false});
                              }}>
                              Delete
                            </Button>
                          </Button.Group>
                        </Modal.Footer>
                      </Modal.Content>
                    </Modal>
                  </Flex>
                </Flex>
              </VStack>
            </ScrollView>
          </Box>
        </NativeBaseProvider>
      );
    } else {
      return (
        <NativeBaseProvider>
          <Box />
        </NativeBaseProvider>
      );
    }
  }
}

export default ViewNetwork;
