import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, Pressable} from 'react-native';
import {
  getDBConnection,
  checkTable,
  createTableSchedule,
  createTablePmNetworkDevice,
  createTableChecklistPmNetworkDevice,
  createTableChecklistPmEndUserDevices,
  createTableFisikEndUser,
  createTableHardware,
  deleteTable,
  createTablePmEndUser,
} from '../services/db_service';
import {
  listSchedule,
  createSchedule,
  viewSchedule,
  deleteSchedule,
  updateScheule,
  nextSchedule,
} from '../services/schedule_service';
import {createPmNetwork, listPmNetwork} from '../services/pm_network_service';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  Box,
  Flex,
  Divider,
  Text,
  NativeBaseProvider,
  Spacer,
  ZStack,
} from 'native-base';
import {connect} from 'react-redux';
import {loadData} from '../redux/action';
import {totalPmEnduser} from '../services/pm_enduser_service';
import {totalPmNetwork} from '../services/pm_network_service';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      network: {},
      enduser: {},
      totalNetwork: '',
      totalEnduser: '',
    };
  }
  async componentDidMount() {
    // Initial Create Table
    const db = await getDBConnection();
    const check = await checkTable(db);
    // await deleteTable(db, 'schedules');
    // await deleteTable(db, 'pm_end_users');
    // await deleteTable(db, 'hardware_details');
    // await deleteTable(db, 'checklist_pm_enduser_devices');
    // await deleteTable(db, 'fisik_pm_end_user');
    // await deleteTable(db, 'pm_network_devices');
    // await deleteTable(db, 'checklist_pm_network_devices');
    if (check.length != 7) {
      //create table if table is no created all
      const scheduleTableCreated = await createTableSchedule(db);
      const pmNetworkTableCreated = await createTablePmNetworkDevice(db);
      const pmEnduserTableCreated = await createTablePmEndUser(db);
      const ChecklistPmNetworkTableCreated =
        await createTableChecklistPmNetworkDevice(db);
      const pmEndUserTableCreated = await createTableChecklistPmEndUserDevices(
        db,
      );
      const FisikEndUserTableCreated = await createTableFisikEndUser(db);
      const HardwareTableCreated = await createTableHardware(db);
    }
    const list = await listPmNetwork(db);
    console.log(list);
    // Total pmnetwork
    const totalEnd = await totalPmEnduser(db);
    this.setState({totalEnduser: totalEnd[0].rows.length});
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      const totalEnd = await totalPmEnduser(db);
      this.setState({totalNetwork: totalEnd[0].rows.length});
      const total = await totalPmNetwork(db);
      this.setState({totalNetwork: total[0].rows.length});
      const schedule = await nextSchedule(db);
      this.setState({schedules: schedule});
    });
    this.setState({totalNetwork: totalEnd[0].rows.length});
    const total = await totalPmNetwork(db);
    this.setState({totalNetwork: total[0].rows.length});
    const schedule = await nextSchedule(db);
    this.setState({schedules: schedule});
    console.log(db);
    this.props.dispatchLoadData('Ridho');
    console.log(check.length);
  }

  async componentWillUnmount() {
    this._unsubscribe();
    console.log('re-render');
  }

  render() {
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
    const {navigation} = this.props;
    return (
      <NativeBaseProvider>
        <Box flex="1" safeAreaTop backgroundColor="#F1F1F1">
            <Flex pt={3} mx="4" maxW="100%" direction="row">
              <Text fontSize="xl" bold>
                Welcome to Dashboard
              </Text>
            </Flex>
            {/* Menu */}
            <Flex
              pt="3"
              mx="1.5"
              maxW="100%"
              direction="row"
              justifyContent="space-around">
              <Box
                maxW="400"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor="gray.50">
                <Flex
                  pt="2"
                  mx="4"
                  maxW="400"
                  direction="row"
                  justifyContent="space-between">
                  <Pressable
                    onPress={() => navigation.navigate('ListSchedule')}>
                    <Box
                      my="2"
                      mx="5"
                      w="75"
                      h="75"
                      rounded="100"
                      backgroundColor="#eee8aa">
                      <Flex py="4" alignItems="center">
                        <Icon size={42} color="black" name="calendar" />
                      </Flex>
                    </Box>
                  </Pressable>
                  <Spacer />
                  <Pressable onPress={() => navigation.navigate('ListNetwork')}>
                    <Box
                      my="2"
                      mx="5"
                      w="75"
                      h="75"
                      rounded="100"
                      backgroundColor="salmon">
                      <Flex py="4" alignItems="center">
                        <Icon size={42} color="black" name="lan" />
                      </Flex>
                    </Box>
                  </Pressable>
                  <Spacer />
                  <Pressable onPress={() => navigation.navigate('ListEnduser')}>
                    <Box
                      my="2"
                      mx="5"
                      w="75"
                      h="75"
                      rounded="100"
                      backgroundColor="#afeeee">
                      <Flex py="4" alignItems="center">
                        <Icon size={42} color="black" name="monitor" />
                      </Flex>
                    </Box>
                  </Pressable>
                </Flex>
                <Flex
                  mx="4"
                  maxW="100%"
                  direction="row"
                  justifyContent="space-between">
                  <Flex w="85" mb="1" ml="5">
                    <Text textAlign="center" bold>
                      Schedule List
                    </Text>
                  </Flex>
                  <Flex w="85" mb="1" mx="7">
                    <Text bold>Network List</Text>
                  </Flex>
                  <Flex w="85" mb="1" mr="5">
                    <Text textAlign="center" bold>
                      Enduser List
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            {/* Next Maintenance */}
            <Flex
              pt="3"
              mx="1.5"
              maxW="100%"
              direction="row"
              justifyContent="space-around">
              <Box
                mx="2"
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor="gray.50">
                <Flex w="180" maxW="100%" p="2">
                  <Text fontSize="md" textAlign="center" bold>
                    Next Maintenance
                  </Text>
                  <Text fontSize="md" textAlign="center">
                    {this.state.schedules[0]
                      ? this.state.schedules[0].jenis_pm
                      : 'There is no maintenance'}{' '}
                    on{' '}
                    {this.state.schedules[0]
                      ? bulan[this.state.schedules[0].bulan_pm]
                      : 'next month'}
                  </Text>
                </Flex>
              </Box>
              <Box
                mx="2"
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor="gray.50">
                <Flex w="180" maxW="100%" p="2">
                  <Text fontSize="md" textAlign="center" bold>
                    Next Maintenance
                  </Text>
                  <Text fontSize="md" textAlign="center">
                    {this.state.schedules[1]
                      ? this.state.schedules[1].jenis_pm
                      : 'There is no maintenance'}{' '}
                    on{' '}
                    {this.state.schedules[1]
                      ? bulan[this.state.schedules[1].bulan_pm]
                      : 'next month'}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            {/* Dashboard */}
            <Flex
              mx="1.5"
              maxW="100%"
              direction="row"
              justifyContent="space-around">
              <Box
                mx="2"
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor="salmon">
                <Flex w="180" maxW="100%" pt="7" alignItems="center">
                  <ZStack h="125" alignItems="center">
                    <AnimatedCircularProgress
                      size={120}
                      width={15}
                      fill={this.state.totalNetwork}
                      arcSweepAngle={250}
                      rotation={235}
                      lineCap="round"
                      tintColor="#00bfff"
                      backgroundColor="#ffefd5">
                      {fill => <Icon size={42} color="black" name="lan" />}
                    </AnimatedCircularProgress>
                    <Spacer />
                    <Spacer />
                    <Text pt={20} fontSize="3xl" bold>
                      {this.state.totalNetwork}
                    </Text>
                  </ZStack>
                  <Text pb="2" fontSize="xl">
                    Total PM Network
                  </Text>
                </Flex>
              </Box>
              <Box
                mx="2"
                maxW="100%"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor="paleturquoise">
                <Flex w="180" maxW="100%" pt="7" alignItems="center">
                  <ZStack h="125" alignItems="center">
                    <AnimatedCircularProgress
                      size={120}
                      width={15}
                      fill={this.state.totalEnduser}
                      arcSweepAngle={250}
                      rotation={235}
                      lineCap="round"
                      tintColor="#00bfff"
                      backgroundColor="#ffefd5">
                      {fill => <Icon size={42} color="black" name="monitor" />}
                    </AnimatedCircularProgress>
                    <Spacer />
                    <Spacer />
                    <Text pt={20} fontSize="3xl" bold>
                      {this.state.totalEnduser}
                    </Text>
                  </ZStack>
                  <Text pb="2" fontSize="xl">
                    Total PM Enduser
                  </Text>
                </Flex>
              </Box>
            </Flex>
            {/*             
            <Box pt="3" alignSelf="center">
              <Box
                maxW="400"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                backgroundColor="gray.50">
                <TouchableOpacity
                  backgroundColor="#DDDDDD"
                  onPress={() => navigation.navigate('ListSchedule')}>
                  <Box w="100%" alignItems="center" py="1.5">
                    <Text fontSize="md" textAlign="center">
                      Create Schedule
                    </Text>
                  </Box>
                </TouchableOpacity>
                <Divider />
                <Flex
                  mx="4"
                  maxW="100%"
                  direction="row"
                  justifyContent="space-around">
                  <Flex maxW="50%" p="2">
                    <TouchableOpacity
                      backgroundColor="#DDDDDD"
                      onPress={() => navigation.navigate('ListEnduser')}>
                      <Text textAlign="center">
                        List Data Maintenance End User Divice
                      </Text>
                    </TouchableOpacity>
                  </Flex>
                  <Divider orientation="vertical" mx="1.5" />
                  <Flex maxW="50%" p="2">
                    <TouchableOpacity
                      backgroundColor="#DDDDDD"
                      onPress={() => navigation.navigate('ListNetwork')}>
                      <Text textAlign="center">
                        List Data Maintenance Network Divice
                      </Text>
                    </TouchableOpacity>
                  </Flex>
                </Flex>
              </Box>
            </Box> */}
        </Box>
      </NativeBaseProvider>
    );
  }
}

const mapStateToProps = state => ({
  name: state.name,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoadData: data => dispatch(loadData(data)),
    dispatchSetCustomer: data => dispatch(loadData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
