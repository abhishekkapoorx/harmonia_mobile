import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { TouchableOpacity, Text } from "react-native"


export const BackButtonBar = ({text}: {text: string}) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.back()} className="my-4 flex flex-row justify-start items-center">
            <Ionicons name="chevron-back" size={24} color="black" className="mr-5" />
            <Text className="font-questrial text-2xl mt-2 flex items-center justify-center" >{text}</Text>
        </TouchableOpacity>

    )
}
