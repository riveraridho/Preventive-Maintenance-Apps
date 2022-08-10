import React, {Component} from 'react';
import {Box, HStack, Text, VStack} from 'native-base';

class DataList extends Component {
  render() {
    const {item_1} = this.props;
    const {item_2} = this.props;
    const {item_3} = this.props;
    return (
      <Box
        borderBottomWidth="1"
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        py="2">
        <HStack space={2} justifyContent="space-between">
          <VStack space={2}>
            <Text color="coolGray.800" bold>
              {item_1}
            </Text>
            <Text color="coolGray.800" alignSelf="flex-start">
              {item_2}
            </Text>
          </VStack>
          <Text color="coolGray.800" bold  alignSelf="flex-start">
            {item_3}
          </Text>
        </HStack>
      </Box>
    );
  }
}

export default DataList;
