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
  Modal,
  Divider,
  Button,
  TextArea,
  Text,
  Spacer,
} from 'native-base';
import TodoViewDescription from '../../components/TodoViewDescription';
import {getDBConnection} from '../../services/db_service';
import {
  viewPmEnduser,
  deletePmEnduser,
} from '../../services/pm_enduser_service';

class ViewEnduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enduser: {},
      ms_office_check: false,
      zip_check: false,
      web_browser_check: false,
      adobe_reader_check: false,
      forti_check: false,
      kav_check: false,
      sap_check: false,
      dc_check: false,
      hw_cleaning_check: false,
      pc_monitor_notebook_check: false,
      keyboar_mouse_check: false,
      label_check: false,
      showModal: false,
    };
  }

  async componentDidMount() {
    const db = await getDBConnection();
    //await deleteSchedule(db, this.state.schedules);
    let enduser = await viewPmEnduser(db, this.props.route.params.id);
    this.setState({enduser});
  }

  async editScreen() {
    console.log('nav', this.props);
    //const {navigation} = this.props;
    this.props.navigation.navigate('EditEnduser', {
      id: this.state.enduser.pm_end_user_id,
    });
  }

  async onDelete() {
    const db = await getDBConnection();
    const id = this.state.enduser.pm_end_user_id;
    await deletePmEnduser(db, id);
    this.props.navigation.navigate('ListEnduser');
    console.log('isi id: ', id);
  }

  render() {
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
                  isDisabled
                  InputLeftElement={'  Nama Teknisi  : '}
                  my="1"
                  value={this.state.enduser.nama_teknisi}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Jenis Perangkat  : '}
                  my="1"
                  value={this.state.enduser.jenis_perangkat}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Tanggal  : '}
                  my="1"
                  value={this.state.enduser.tanggal}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  ID / NPP  : '}
                  my="1"
                  value={this.state.enduser.id_user}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Nama  : '}
                  my="1"
                  value={this.state.enduser.nama_lengkap}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Penanggung Jawab  : '}
                  my="1"
                  value={this.state.enduser.person_responsible}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Divisi  : '}
                  my="1"
                  value={this.state.enduser.divisi}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Satuan Kerja  : '}
                  my="1"
                  value={this.state.enduser.satuan_kerja}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  Lokasi  : '}
                  my="1"
                  value={this.state.enduser.lokasi}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
              </Flex>
              <Divider />
              <Heading pt="1" size="md">
                {'Unit Hardware ' + this.state.enduser.jenis_perangkat}
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
                <Input
                  isDisabled
                  InputLeftElement={'  Merk / Type  : '}
                  my="1"
                  value={this.state.enduser.merek}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  SN Unit  : '}
                  my="1"
                  value={this.state.enduser.serial_number}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  SN LCD Monitor  : '}
                  my="1"
                  value={this.state.enduser.lcd_serial_number}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  SN Mouse  : '}
                  my="1"
                  value={this.state.enduser.mouse_serial_number}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  SN Keyboard  : '}
                  my="1"
                  value={this.state.enduser.keyboard_serial_number}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  IP Address   : '}
                  my="1"
                  value={this.state.enduser.ip_address}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  User Login   : '}
                  my="1"
                  value={this.state.enduser.user_login}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
                <Input
                  isDisabled
                  InputLeftElement={'  OS   : '}
                  my="1"
                  value={this.state.enduser.os}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
              </Flex>
              <Divider />
              <Heading pt="1" size="md">
                Hardware PM & Software Standart PM
              </Heading>
              <Flex
                direction="column"
                alignItems="center"
                mb="2.5"
                mt="1.5"
                _text={{
                  color: 'coolGray.800',
                }}>
                <Heading size="xs" textAlign="left" mb="2">
                  OS, Application Standart & Antivirus Check
                </Heading>
                <TodoViewDescription
                  title="Ms. Office Standart 2016"
                  isCheck={this.state.enduser.ms_office_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        ms_office_check: value,
                      });
                    } else {
                      this.setState({
                        ms_office_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.ms_office_note}
                />
                <TodoViewDescription
                  title="7Zip"
                  isCheck={this.state.enduser.zip_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        zip_check: value,
                      });
                    } else {
                      this.setState({
                        zip_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.zip_note}
                />
                <TodoViewDescription
                  title="Web Browser (Chrome, Mozilla Firefox)"
                  isCheck={this.state.enduser.web_browser_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        web_browser_check: value,
                      });
                    } else {
                      this.setState({
                        web_browser_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.web_browser_note}
                />
                <TodoViewDescription
                  title="Adobe Reader Versi 10"
                  isCheck={this.state.enduser.adobe_reader_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        adobe_reader_check: value,
                      });
                    } else {
                      this.setState({
                        adobe_reader_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.adobe_reader_note}
                />
                <TodoViewDescription
                  title="Adobe Reader Versi 10"
                  isCheck={this.state.enduser.forti_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        forti_check: value,
                      });
                    } else {
                      this.setState({
                        forti_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.forti_note}
                />
                <TodoViewDescription
                  title="Kaspersky versi 11"
                  isCheck={this.state.enduser.kav_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        kav_check: value,
                      });
                    } else {
                      this.setState({
                        kav_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.kav_note}
                />
                <TodoViewDescription
                  title="Libre Office"
                  isCheck={this.state.enduser.libre_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        libre_check: value,
                      });
                    } else {
                      this.setState({
                        libre_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.libre_note}
                />
                <TodoViewDescription
                  title="SAP"
                  isCheck={this.state.enduser.sap_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        sap_check: value,
                      });
                    } else {
                      this.setState({
                        sap_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.sap_note}
                />
                <TodoViewDescription
                  title="Manage Engine Desktop Central Checking (ensure this application on / running)"
                  isCheck={this.state.enduser.dc_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        dc_check: value,
                      });
                    } else {
                      this.setState({
                        dc_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.dc_note}
                />
                <TodoViewDescription
                  title="Hardware Cleaning (PC, Notebook, Keyboard & Mouse)"
                  isCheck={this.state.enduser.hw_cleaning_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        hw_cleaning_check: value,
                      });
                    } else {
                      this.setState({
                        hw_cleaning_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.hw_cleaning_note}
                />
                <Heading size="xs" textAlign="left" my="2">
                  Test Function
                </Heading>
                <TodoViewDescription
                  title="PC & Monitor / Notebook"
                  isCheck={this.state.enduser.pc_monitor_notebook_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        pc_monitor_notebook_check: value,
                      });
                    } else {
                      this.setState({
                        pc_monitor_notebook_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.pc_monitor_notebook_note}
                />
                <TodoViewDescription
                  title="Keyboard + Mouse"
                  isCheck={this.state.enduser.keyboar_mouse_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        keyboar_mouse_check: value,
                      });
                    } else {
                      this.setState({
                        keyboar_mouse_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.keyboar_mouse_note}
                />
                <TodoViewDescription
                  title="Labelling"
                  isCheck={this.state.enduser.label_check}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        label_check: value,
                      });
                    } else {
                      this.setState({
                        label_check: value,
                      });
                    }
                  }}
                  value={this.state.enduser.label_note}
                />
                <TextArea
                  isDisabled
                  value={this.state.enduser.note}
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
                <Flex flexDirection="row">
                  <Button
                    my="2"
                    marginRight="2"
                    w="45%"
                    onPress={() => this.editScreen()}>
                    <Box w="100%" alignItems="center" py="1.5">
                      <Text bold color="white" fontSize="md" textAlign="center">
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
                            {' Jenis Perangkat : ' +
                              this.state.enduser.jenis_perangkat}
                          </Text>
                          <Text color="coolGray.800" bold>
                            {'Tanggal : ' + this.state.enduser.tanggal}
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
  }
}

export default ViewEnduser;
