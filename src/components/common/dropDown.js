import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';

import GLOBALS from '../../constants';
import { screenHeight, screenWidth } from "../../utils/dimension";
const { COLORS, FONTS } = GLOBALS;
const { BLUR, WHITE, HEADING_BLACK, BLACK, DARK_GREEN } = COLORS;
import Button from "./button"
//const data = [{ id: 1, name: "ll" }, { id: 11, name: "ll" }]
const DropDown = (props) => {
    let { title, data, textColor, onItemSelection } = props;
    const [selectedItem, setSelectedData] = useState("");
    const onItemSelected = (item) => {
        console.log(item, "l")
        setSelectedData(item.name);
        onItemSelection("selected_gender", item.name)
    }
    return (
        <View style={styles.outerContainer}>
            <View style={styles.innerContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => `${item.code}`}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => onItemSelected(item)} style={styles.itemContainer}>
                                <Text style={[styles.itemStyle, {}]}>{item.name}</Text>
                            </TouchableOpacity>

                        )}
                    />
                </View>
                {/* <View style={{ justifyContent: 'center' }}>
                    <Button
                        btnStyle={{ height: 40, width: "20%", alignSelf: "center" }}
                        onVerifyPress={() => onItemSelection("selected_gender", selectedItem)}
                        title="Select"
                        bgColor={DARK_GREEN}
                        textColor={"white"}></Button>
                </View> */}
            </View>
        </View>

    )

}

export default DropDown
const styles = StyleSheet.create({
    outerContainer: {
        flex: 1, backgroundColor: BLUR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        backgroundColor: WHITE,
        width: screenWidth / 1.5,
        height: screenHeight / 1.4,
        borderRadius: 5,
        padding: 20
    },
    titleText: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 16,
        color: HEADING_BLACK,
        paddingBottom: 12,
        textTransform: "capitalize",
        lineHeight: 21,
        fontWeight: '500'
    },
    itemContainer: {
        padding: 7
    },
    itemStyle: {
        fontStyle: FONTS.NEW_REGULAR,
        fontSize: 14,
        color: BLACK,
        textTransform: "capitalize",
        fontWeight: '500'
    }
})