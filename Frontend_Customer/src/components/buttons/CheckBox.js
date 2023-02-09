import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import React from 'react'

const Checkbox = (props) => {
    return (
      <TouchableOpacity style={styles.checkboxContainer} onPress={props.onPress}>
        <View style={styles.checkbox}>
          {props.checked ? <View style={styles.checkedCheckbox} /> : null}
        </View>
        <Text style={styles.checkboxLabel}>{props.label}</Text>
      </TouchableOpacity>
    );
  };

export default Checkbox

const styles = StyleSheet.create({})