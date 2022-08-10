import React, {Component} from 'react';
import {
  Box,
  VStack,
  NativeBaseProvider,
  Flex,
  Button,
  Text,
  Modal,
} from 'native-base';
import {viewSchedule, deleteSchedule} from '../../services/schedule_service';
import {getDBConnection} from '../../services/db_service';

class ViewSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: {},
      showModal: false,
    };
  }

  async componentDidMount() {
    console.log('componentdidmount');
    console.log('navigation: ', this.props.route.params.id);
    const db = await getDBConnection();
    //await deleteSchedule(db, this.state.schedules);
    let schedule = await viewSchedule(db, this.props.route.params.id);
    this.setState({schedule});
    console.log(schedule);
  }

  async editScreen() {
    console.log('nav', this.props);
    //const {navigation} = this.props;
    this.props.navigation.navigate('EditSchedule', {
      id: this.state.schedule.schedule_id,
    });
  }

  async onDelete() {
    const db = await getDBConnection();
    const id = this.state.schedule.schedule_id;
    await deleteSchedule(db, id);
    this.props.navigation.navigate('ListSchedule');
    console.log('isi id: ', id);
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
    return (
      <NativeBaseProvider>
        <Box flex="1" safeAreaTop>
          <VStack space={2.5} w="100%" px="3">
            <Flex
              direction="column"
              alignItems="center"
              mb="2.5"
              mt="1.5"
              _text={{
                color: 'coolGray.800',
              }}>
              <Box
                width="100%"
                maxW="100%"
                bg="white"
                borderRadius="md"
                p="4"
                my="1"
                shadow={2}>
                {'Preventive Maintenance : ' + this.state.schedule.jenis_pm}
              </Box>
              <Box
                width="100%"
                bg="white"
                borderRadius="md"
                p="4"
                my="1"
                shadow={2}>
                {'Bulan Preventive : ' + bulan[this.state.schedule.bulan_pm]}
              </Box>
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
                          {'Preventive Maintenance : ' +
                            this.state.schedule.jenis_pm}
                        </Text>
                        <Text color="coolGray.800" bold>
                          {'Bulan Preventive : ' + bulan[this.state.schedule.bulan_pm]}
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
        </Box>
      </NativeBaseProvider>
    );
  }
}

export default ViewSchedule;
