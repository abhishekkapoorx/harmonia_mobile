import { Ionicons } from "@expo/vector-icons"
import { Image, Text, View } from "react-native"

const HomeUpper = () => {
    return (
        <View className='flex w-full mt-10'>
            <View className='w-full flex justify-start items-start'>
                <Text className='text-2xl font-questrial'>Welcome</Text>
            </View>

            <View className="flex-1 justify-center items-center mt-10">
                <View className="w-full max-w-md gap-2">
                    {/* Row 1 */}
                    <View className="flex-row justify-between items-center gap-2">
                        <View className="flex-1 bg-c5 border-c6 border-2 rounded-tr-full p-3 rounded-tl-2xl  rounded-bl-none rounded-br-none m-1 h-24 justify-center items-start">
                            <Text className="text-black text-md font-questrial">
                                AI that cares your wellness.
                            </Text>
                        </View>
                        <View className="w-24 h-24 rounded-tr-full overflow-visible border-2 bg-c4  border-c6 justify-end items-center bg-contain">
                            <Image
                                source={require("@/assets/images/homeImg.png")}
                                className="w-full h-full"
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Row 2 */}
                    <View className="flex-row justify-between items-center">
                        <View className="w-24 h-24 bg-c2 border-2 border-c6 rounded-br-full flex items-start justify-center m-1 p-4">
                            <Ionicons name="compass-outline" size={24} color="black" />
                        </View>
                        <View className="flex-1 bg-c1 border-c6 border-2 p-4 rounded-tl-full m-1 justify-center items-end h-24">
                            <Text className="text-black text-right font-questrial text-md">
                                Get the answers of your each question.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeUpper