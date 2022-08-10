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
import {viewPmEnduser} from '../../services/pm_enduser_service';

class ViewEnduser2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enduser: {},
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
                  InputLeftElement={'  Jenis Perangkat  : '}
                  my="1"
                  value={this.state.enduser.jenis_perangkat}
                  w="100%"
                  backgroundColor="#FFFFFF"
                />
              </Flex>
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
                          {'Nama Perangkat : ' +
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
                            this.setState({showModal: false});
                          }}>
                          Delete
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </Flex>
            </VStack>
          </ScrollView>
        </Box>
      </NativeBaseProvider>
    );
  }
}

export default ViewEnduser2;
