import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const UserScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>用户资料</Text>
      {/* 在此处添加其他与用户资料相关的组件 */}
      <Button
        title="翻译"
        onPress={() => navigation.navigate('TranslateScreen')} // 确保在你的导航堆栈中注册了'TranslateScreen'
      />
      {/* 根据需要添加其他按钮和功能 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  // 根据需要添加更多样式
});

export default UserScreen;
