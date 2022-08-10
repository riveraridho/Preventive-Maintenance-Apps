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
  Spacer,
} from 'native-base';
import DatePicker from 'react-native-date-picker';
import TodoDescription from '../../components/TodoDescription';
import moment from 'moment';
import {connect} from 'react-redux';
import {setEnduser} from '../../redux/action';
import {getDBConnection} from '../../services/db_service';
import {v4 as uuidv4} from 'uuid';
import {createPmEnduser} from '../../services/pm_enduser_service';

class CreateEnduser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      open: false,
      viewDate: '',
      nama_teknisi: '',
      jenis_perangkat: '',
      id_user: '',
      nama_lengkap: '',
      person_responsible: '',
      divisi: '',
      satuan_kerja: '',
      lokasi: '',
      note: '',
      merk: '',
      serialunit: '',
      seriallcd: '',
      serialmouse: '',
      serialkeyboard: '',
      ip: '',
      username: '',
      os: '',
      officecheck: 0,
      officenote: '',
      zipcheck: 0,
      zipnote: '',
      browsercheck: 0,
      browsernote: '',
      readercheck: 0,
      readernote: '',
      forticheck: 0,
      fortinote: '',
      kasperskycheck: 0,
      kasperskynote: '',
      librecheck: 0,
      librenote: '',
      sapcheck: 0,
      sapnote: '',
      centralcheckingcheck: 0,
      centralcheckingnote: '',
      cleaningcheck: 0,
      cleaningnote: '',
      pcmonitorcheck: 0,
      pcmonitornote: '',
      keymousecheck: 0,
      keymousenote: '',
      labelcheck: 0,
      labelnote: '',
    };
  }

  onSave = async () => {
    const {navigation} = this.props;
    const db = await getDBConnection();
    this.props.dispatchsetEnduser(this.state);
    const pmEnduserId = uuidv4();
    const PmEnduser = {
      pm_end_user_id: pmEnduserId,
      nama_teknisi: this.state.nama_teknisi,
      jenis_perangkat: this.state.jenis_perangkat,
      tanggal: this.state.viewDate,
      id_user: this.state.id_user,
      nama_lengkap: this.state.nama_lengkap,
      person_responsible: this.state.person_responsible,
      divisi: this.state.divisi,
      satuan_kerja: this.state.satuan_kerja,
      lokasi: this.state.lokasi,
      note: this.state.note,
      hardware: {
        hardware_detail_id: uuidv4(),
        pm_id: pmEnduserId,
        merek: this.state.merk,
        serial_number: this.state.serialunit,
        lcd_serial_number: this.state.seriallcd,
        mouse_serial_number: this.state.serialmouse,
        keyboard_serial_number: this.state.serialkeyboard,
        ip_address: this.state.ip,
        user_login: this.state.username,
        os: this.state.os,
      },
      checklist: {
        checklist_end_user_devices_id: uuidv4(),
        pm_id: pmEnduserId,
        ms_office_check: this.state.officecheck,
        ms_office_note: this.state.officenote,
        zip_check: this.state.zipcheck,
        zip_note: this.state.zipnote,
        web_browser_check: this.state.browsercheck,
        web_browser_note: this.state.browsernote,
        adobe_reader_check: this.state.readercheck,
        adobe_reader_note: this.state.readernote,
        forti_check: this.state.forticheck,
        forti_note: this.state.fortinote,
        kav_check: this.state.kasperskycheck,
        kav_note: this.state.kasperskynote,
        libre_check: this.state.librecheck,
        libre_note: this.state.librenote,
        sap_check: this.state.sapcheck,
        sap_note: this.state.sapnote,
        dc_check: this.state.centralcheckingcheck,
        dc_note: this.state.centralcheckingnote,
        hw_cleaning_check: this.state.cleaningcheck,
        hw_cleaning_note: this.state.cleaningnote,
      },
      fisik: {
        fisik_pm_end_user_id: uuidv4(),
        pm_id: pmEnduserId,
        pc_monitor_notebook_check: this.state.pcmonitorcheck,
        pc_monitor_notebook_note: this.state.pcmonitornote,
        keyboar_mouse_check: this.state.keymousecheck,
        keyboar_mouse_note: this.state.keymousenote,
        label_check: this.state.labelcheck,
        label_note: this.state.labelnote,
      },
    };
    console.log(PmEnduser);
    await createPmEnduser(db, PmEnduser);
    navigation.navigate('ListEnduser', {
      nama: 'ridho',
    });
  };

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
                <FormControl w="100%" isRequired>
                  <Select
                    backgroundColor="#FFFFFF"
                    minWidth="200"
                    accessibilityLabel="Jenis Perangkat"
                    placeholder="Jenis Perangkat"
                    selectedValue={this.state.jenis_perangkat}
                    _selectedItem={{
                      bg: 'primary.300',
                    }}
                    my="1"
                    onValueChange={itemValue => {
                      this.setState({
                        jenis_perangkat: itemValue,
                      });
                    }}>
                    <Select.Item label="Notebook" value="Notebook" />
                    <Select.Item label="PC" value="PC" />
                  </Select>
                </FormControl>
                <Input
                  w="100%"
                  my="1"
                  backgroundColor="#FFFFFF"
                  isDisabled
                  InputRightElement={
                    <Button
                      w="1/6"
                      h="full"
                      size="xs"
                      my="1"
                      isRequired
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
                  value={this.state.id_user}
                  my="1"
                  placeholder="ID / NPP"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      id_user: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.nama_lengkap}
                  my="1"
                  placeholder="Nama Lengkap"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      nama_lengkap: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.person_responsible}
                  my="1"
                  placeholder="Nama Penanggung Jawab"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      person_responsible: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.divisi}
                  my="1"
                  placeholder="Divisi"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      divisi: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.satuan_kerja}
                  my="1"
                  placeholder="Satuan Kerja"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      satuan_kerja: event.nativeEvent.text,
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
                {'Unit Hardware ' + this.state.jenis_perangkat}
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
                  value={this.state.merk}
                  my="1"
                  placeholder="Merk / Type"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      merk: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.serialunit}
                  my="1"
                  placeholder="Serial Number Unit"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      serialunit: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.seriallcd}
                  my="1"
                  placeholder="Serial Number LCD Monitor"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      seriallcd: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.serialmouse}
                  my="1"
                  placeholder="Serial Number Mouse"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      serialmouse: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.serialkeyboard}
                  my="1"
                  placeholder="Serial Number Keyboard"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      serialkeyboard: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.ip}
                  my="1"
                  placeholder="IP Address"
                  w="100%"
                  keyboardType="number-pad"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      ip: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.username}
                  my="1"
                  placeholder="Username Login Domain"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      username: event.nativeEvent.text,
                    });
                  }}
                />
                <Input
                  value={this.state.os}
                  my="1"
                  placeholder="Operating System"
                  w="100%"
                  backgroundColor="#FFFFFF"
                  onChange={event => {
                    this.setState({
                      os: event.nativeEvent.text,
                    });
                  }}
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
                <TodoDescription
                  title="Ms. Office Standart 2016"
                  placeholder="Keterangan"
                  isCheck={this.state.officecheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        officecheck: 1,
                      });
                    } else {
                      this.setState({
                        officecheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      officenote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="7Zip"
                  placeholder="Keterangan"
                  isCheck={this.state.zipcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        zipcheck: 1,
                      });
                    } else {
                      this.setState({
                        zipcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      zipnote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Web Browser (Chrome, Mozilla Firefox)"
                  placeholder="Keterangan"
                  isCheck={this.state.browsercheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        browsercheck: 1,
                      });
                    } else {
                      this.setState({
                        browsercheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      browsernote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Adobe Reader Versi 10"
                  placeholder="Keterangan"
                  isCheck={this.state.readercheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        readercheck: 1,
                      });
                    } else {
                      this.setState({
                        readercheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      readernote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Forti Client"
                  placeholder="Keterangan"
                  isCheck={this.state.forticheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        forticheck: 1,
                      });
                    } else {
                      this.setState({
                        forticheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      fortinote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Kaspersky versi 11"
                  placeholder="Keterangan"
                  isCheck={this.state.kasperskycheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        kasperskycheck: 1,
                      });
                    } else {
                      this.setState({
                        kasperskycheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      kasperskynote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Libre Office"
                  placeholder="Keterangan"
                  isCheck={this.state.librecheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        librecheck: 1,
                      });
                    } else {
                      this.setState({
                        librecheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      librenote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="SAP"
                  placeholder="Keterangan"
                  isCheck={this.state.sapcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        sapcheck: 1,
                      });
                    } else {
                      this.setState({
                        sapcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      sapnote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Manage Engine Desktop Central Checking (ensure this application on / running)"
                  placeholder="Keterangan"
                  isCheck={this.state.centralcheckingcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        centralcheckingcheck: 1,
                      });
                    } else {
                      this.setState({
                        centralcheckingcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      centralcheckingnote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Hardware Cleaning (PC, Notebook, Keyboard & Mouse)"
                  placeholder="Keterangan"
                  isCheck={this.state.cleaningcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        cleaningcheck: 1,
                      });
                    } else {
                      this.setState({
                        cleaningcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      cleaningnote: event.nativeEvent.text,
                    });
                  }}
                />
                <Heading size="xs" textAlign="left" my="2">
                  Test Function
                </Heading>
                <TodoDescription
                  title="PC & Monitor / Notebook"
                  placeholder="Keterangan"
                  isCheck={this.state.pcmonitorcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        pcmonitorcheck: 1,
                      });
                    } else {
                      this.setState({
                        pcmonitorcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      pcmonitornote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Keyboard + Mouse"
                  placeholder="Keterangan"
                  isCheck={this.state.keymousecheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        keymousecheck: 1,
                      });
                    } else {
                      this.setState({
                        keymousecheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      keymousenote: event.nativeEvent.text,
                    });
                  }}
                />
                <TodoDescription
                  title="Labelling"
                  placeholder="Keterangan"
                  isCheck={this.state.labelcheck}
                  onCheck={value => {
                    if (value) {
                      this.setState({
                        labelcheck: 1,
                      });
                    } else {
                      this.setState({
                        labelcheck: 0,
                      });
                    }
                  }}
                  onChangeText={event => {
                    this.setState({
                      labelnote: event.nativeEvent.text,
                    });
                  }}
                />
              </Flex>
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
            </VStack>
          </ScrollView>
          <Flex alignItems="center">
            <Button my="2" w="75%" onPress={this.onSave} bgColor="success.500">
              <Box w="100%" alignItems="center" py="1.5">
                <Text bold color="white" fontSize="md" textAlign="center">
                  Create
                </Text>
              </Box>
            </Button>
          </Flex>
        </Box>
      </NativeBaseProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    enduser: state.enduser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchsetEnduser: enduser => dispatch(setEnduser(enduser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnduser);
