import React from 'react';
import {Flex, Input, Text, Checkbox, Spacer} from 'native-base';

const TodoDescription = ({title, onCheck, onChangeText, isCheck, value}) => {
  return (
    <Flex my="2" direction="column" alignItems="center" w="100%">
      <Flex direction="row" justifyContent="space-between">
        <Text>{title}</Text>
        <Spacer />
        <Checkbox
          accessibilityLabel="This is a dummy checkbox"
          onChange={onCheck}
          isChecked={isCheck}
        />
      </Flex>
      <Input
        value={value}
        variant="underlined"
        placeholder="Keterangan"
        w="100%"
        maxWidth="100%"
        onChange={onChangeText}
      />
    </Flex>
  );
};

export default TodoDescription;
