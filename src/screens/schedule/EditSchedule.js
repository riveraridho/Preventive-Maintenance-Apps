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
  Button,
  Text,
  Checkbox,
  Spacer,
} from 'native-base';
import {connect} from 'react-redux';
import {setSchedule} from '../../redux/action';
import {updateScheule, viewSchedule} from '../../services/schedule_service';
import {getDBConnection} from '../../services/db_service';
import {v4 as uuidv4} from 'uuid';

class EditSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      jenis: '',
      bulan: '',
    };
  }

  async componentDidMount() {
    console.log('componentdidmount');
    console.log('navigation: ', this.props.route.params.id);
    const db = await getDBConnection();
    //await deleteSchedule(db, this.state.schedules);
    let schedule = await viewSchedule(db, this.props.route.params.id);
    this.setState({id: schedule.schedule_id});
    this.setState({jenis: schedule.jenis_pm});
    this.setState({bulan: schedule.bulan_pm});
    console.log(schedule);
  }

  onSave = async () => {
    const {navigation} = this.props;
    const db = await getDBConnection();
    this.props.dispatchsetSchedule(this.state);
    const schedule = {
      schedule_id: this.state.id,
      jenis_pm: this.state.jenis,
      bulan_pm: this.state.bulan,
    };
    console.log(schedule);
    await updateScheule(db, schedule);
    navigation.navigate('ListSchedule', {
      nama: 'ridho',
    });
  };

  render() {
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
                <FormControl w="100%" isRequired>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Jenis Preventive Manager"
                    placeholder="Jenis Preventive Manager"
                    bgColor="#FFFFFF"
                    _selectedItem={{
                      bg: 'primary.300',
                    }}
                    selectedValue={this.state.jenis}
                    my="1"
                    onValueChange={itemValue => {
                      this.setState({
                        jenis: itemValue,
                      });
                    }}>
                    <Select.Item
                      label="End User Device"
                      value="PM Enduser Device"
                    />
                    <Select.Item
                      label="Network Device"
                      value="PM Network Device"
                    />
                  </Select>
                </FormControl>
                <FormControl w="100%" isRequired>
                  <Select
                    minWidth="200"
                    accessibilityLabel="Bulan Preventive Maintenance"
                    placeholder="Bulan Preventive Maintenance"
                    bgColor="#FFFFFF"
                    selectedValue={this.state.bulan}
                    _selectedItem={{
                      bg: 'primary.300',
                    }}
                    my="1"
                    onValueChange={bulanValue => {
                      this.setState({
                        bulan: bulanValue,
                      });
                    }}>
                    <Select.Item label="Januari" value={0} />
                    <Select.Item label="Febuari" value={1} />
                    <Select.Item label="Maret" value={2} />
                    <Select.Item label="April" value={3} />
                    <Select.Item label="Mei" value={4} />
                    <Select.Item label="Juni" value={5} />
                    <Select.Item label="Juli" value={6} />
                    <Select.Item label="Agustus" value={7} />
                    <Select.Item label="September" value={8} />
                    <Select.Item label="October" value={9} />
                    <Select.Item label="November" value={10} />
                    <Select.Item label="Desember" value={11} />
                  </Select>
                </FormControl>
                <Button
                  bgColor="success.500"
                  my="2"
                  w="75%"
                  onPress={this.onSave}>
                  <Box w="100%" alignItems="center" py="1.5">
                    <Text bold color="white" fontSize="md" textAlign="center">
                      SAVE
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
    schedule: state.schedule,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchsetSchedule: schedule => dispatch(setSchedule(schedule)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSchedule);
