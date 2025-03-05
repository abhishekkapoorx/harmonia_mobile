import { Input } from '@/components/auth/Input'
import { BackButtonBar } from '@/components/BackButtonBar'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { SafeAreaView, ImageBackground, View, Text, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import SelectPicker from '@/components/SelectPicker'

const Questioneer = () => {
    const [Age, setAge] = useState("")
    const [Height, setHeight] = useState("")
    const [Weight, setWeight] = useState("")
    const [periodRegularity, setPeriodRegularity] = useState('')

    return (
        <View className="flex-1 bg-gray-100 px-6 py-10">
            <StatusBar style="dark" />
            <BackButtonBar text="User Details" />
            <ScrollView className='flex-1'>
                <View className='mt-12 gap-8'>
                    <View className=''>
                        {/* <Text className='text-2xl font-questrial'>
                        Please provide your age
                    </Text> */}
                        <Input label="Age" value={Age} setVal={setAge} className='border-b-2' />

                    </View>
                    <View className=''>
                        {/* <Text className='text-2xl font-questrial'>
                        Please provide your age
                    </Text> */}
                        <Input label="Height" value={Height} setVal={setHeight} className='border-b-2' />

                    </View>
                    <View className=''>
                        {/* <Text className='text-2xl font-questrial'>
                        Please provide your age
                    </Text> */}
                        <Input label="Weight" value={Weight} setVal={setWeight} className='border-b-2' />

                    </View>
                    <SelectPicker title="How regular is your menstrual cycle?" data={[
                        { label: "Regular (28-35 days)", value: "regular" },
                        { label: "Irregular (varies each month)", value: "irregular" },
                        { label: "Missed periods (More than 2 months gap)", value: "missed" }
                    ]} selectedValue={periodRegularity} setSelectedValue={setPeriodRegularity} classNames='' />

                    
                    <View className=''>
                        <Text className='text-2xl font-questrial'>
                            How regular is your menstrual cycle?
                        </Text>
                        <Picker
                            selectedValue={periodRegularity}
                            onValueChange={(itemValue, itemIndex) =>
                                setPeriodRegularity(itemValue)
                            }>
                            <Picker.Item label="Choose one" value="" />
                            <Picker.Item label="Regular (28-35 days)" value="regular" />
                            <Picker.Item label="Irregular (varies each month)" value="irregular" />
                            <Picker.Item label="Missed periods (More than 2 months gap)" value="missed" />
                        </Picker>
                    </View>
                </View>
            </ScrollView>



        </View>
    )
}

export default Questioneer