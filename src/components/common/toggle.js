import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Pressable, StyleSheet,Switch } from 'react-native';
import GLOBALS from '../../constants';
const { COLORS, FONTS } = GLOBALS;
const {BLUR, WHITE, HEADING_BLACK,SOFT_GRAY, BLACK, DARK_GREEN} = COLORS;

const Toggle = (props) => {
    let { title, enabled,onPress , item} = props;
    return (
      <TouchableOpacity 
      onPress={()=>onPress(item)}
      style={styles.container}>
            <Text style={[styles.radioText,{}]}>{title}</Text>
            <Switch
          trackColor={{ false: "#767577", true: "#49A694" }}
          thumbColor={"#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => { }}
          value={enabled}
        />
      </TouchableOpacity>
    )

}

export default Toggle
const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical:"0.5vw" },
    radioText: {
        fontStyle: FONTS.NEW_REGULAR,
            fontSize: 12,
            fontWeight:"500",
            color: SOFT_GRAY,
            paddingBottom: 5,
            textTransform: "capitalize",
            lineHeight: 21,
      },
})