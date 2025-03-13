import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from "react-native"
import ProfileNavbar from "@/components/ProfileNavbar"
import { BackButtonBar } from "@/components/BackButtonBar"
import { useSession } from "@/providers/SessionCtx"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { color } from "@/constants/color"


const Profile = () => {
    const { userData, signOut } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut();
        router.replace('/auth/sign-in');
    };

    const profileCardData = [
        {
            title: 'Health Details',
            icon: 'fitness-outline',
            route: '/auth/profile/health'
        },
        {
            title: 'User Settings',
            icon: 'settings-outline',
            route: '/auth/profile/settings'
        },

    ]


    return (
        <SafeAreaView className="flex-1 bg-c3 py-8 px-4">
            <BackButtonBar text="Profile" />
            <FlatList
                data={profileCardData}
                ListHeaderComponent={() => (
                    <View className="bg-c6 elevation rounded-xl p-4 mb-4 shadow-sm flex items-center justify-center h-32">
                        <View className="flex-row items-center">
                            <View className="w-16 h-16 rounded-full bg-c3 mr-4 items-center justify-center">
                                <Text className="text-c6 text-3xl font-questrial">
                                    {userData?.name?.[0]?.toUpperCase()}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-xl font-questrial text-c1">{userData?.name.toUpperCase()}</Text>
                                <Text className="text-c2 font-questrial">{userData?.email}</Text>
                            </View>
                        </View>
                    </View>
                )}


                ListFooterComponent={() => (
                    <TouchableOpacity
                        className="bg-red-100 rounded-xl p-4 mb-4 shadow-sm flex-row items-center justify-center mt-4"
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                        <Text className="ml-3 text-lg text-red-500 font-semibold">Logout</Text>
                    </TouchableOpacity>
                )}


                renderItem={({item, index}) => (
                    <TouchableOpacity
                        className="bg-c4 rounded-xl p-4 mb-4 shadow-sm flex-row items-center justify-between"
                        onPress={() => router.push(item.route as any)}
                        activeOpacity={0.7}
                    >
                        <View className="flex-row items-center">
                            <Ionicons name={item.icon as any} size={24} color={color.c6} />
                            <Text className="ml-3 text-lg text-gray-800">{item.title}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={24} color={color.c6} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default Profile;
