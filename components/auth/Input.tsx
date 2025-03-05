import { Text, TextInput, View } from "react-native"

interface InputProps {
    label: string;
    value: string;
    setVal: (val: string) => void;
    type?: string;
    className?: string;
}
export const Input = ({label, value, setVal, className}: InputProps) => {
    return (
        <View className={className}>
            <Text className="text-md font-medium text-gray-700 font-anonymousPro mb-1">{label}</Text>
            <TextInput

                value={value}
                onChangeText={setVal}
                placeholder={`Please Enter ${label}`}
                className="border-b border-gray-400 p-2 text-gray-600 font-anonymousPro"
            />
        </View>
    )
}
