import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { TouchableOpacity } from "react-native"
import { Text } from "./ui/text";


export const BackButtonBar = ({text}: {text: string}) => {
    const router = useRouter();
    return (
        <TouchableOpacity onPress={() => router.back()} className="py-10 flex flex-row justify-start items-center">
            <Ionicons name="chevron-back" size={24} color="black" className="mr-5 mt-2" />
            <Text className="text-2xl mt-2 flex items-center justify-center font-bold" >{text}</Text>
        </TouchableOpacity>

    )
}
