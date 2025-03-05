import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Text, View } from 'react-native'

interface SelectPickerProps {
    title: string;
    data : {label: string, value: string}[];
    selectedValue: string;
    setSelectedValue: (val: string) => void;
    classNames?: string;
}

const SelectPicker = ({
    title,
    data,
    selectedValue,
    setSelectedValue,
    classNames
}: SelectPickerProps) => {
    return (
        <View className={classNames}>
            <Text className='text-2xl font-questrial'>
                {title}
            </Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedValue(itemValue)
                }>
                <Picker.Item label="Choose one" value="" />
                {data.map((item, index) => (
                    <Picker.Item key={index} label={item.label} value={item.value} />
                ))}
            </Picker>
        </View>
    )
}

export default SelectPicker;