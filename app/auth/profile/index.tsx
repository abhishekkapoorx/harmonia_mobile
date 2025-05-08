import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native"
import ProfileNavbar from "@/components/ProfileNavbar"
import { BackButtonBar } from "@/components/BackButtonBar"
import { useSession } from "@/providers/SessionCtx"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Card, CardHeader, CardContent } from '~/components/ui/card'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Text } from '~/components/ui/text'
import { Button } from '~/components/ui/button'

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
        <SafeAreaView className="flex-1 bg-background py-8 px-4">
            <BackButtonBar text="Profile" />
            <FlatList
                data={profileCardData}
                ListHeaderComponent={() => (
                    <Card className="bg-card rounded-2xl p-4 mb-4 shadow-sm items-center justify-center">
                        <CardHeader className="flex-row items-center gap-4">
                            <Avatar alt={userData?.name || ''} className="h-16 w-16 border-2 border-accent">
                                <AvatarFallback>
                                    <Text className="text-3xl font-bold text-accent-foreground">
                                        {userData?.name?.[0]?.toUpperCase()}
                                    </Text>
                                </AvatarFallback>
                            </Avatar>
                            <View>
                                <Text className="text-xl font-semibold text-card-foreground">{userData?.name?.toUpperCase()}</Text>
                                <Text className="text-muted-foreground">{userData?.email}</Text>
                            </View>
                        </CardHeader>
                    </Card>
                )}
                ListFooterComponent={() => (
                    <Button
                        variant="destructive"
                        className="rounded-xl p-4 mb-4 flex-row items-center justify-center mt-4"
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={24} color="#fff" />
                        <Text className="ml-3 text-lg text-destructive-foreground font-semibold">Logout</Text>
                    </Button>
                )}
                renderItem={({item}) => (
                    <TouchableOpacity
                        className="mb-4"
                        onPress={() => router.push(item.route as any)}
                        activeOpacity={0.7}
                    >
                        <Card className="bg-card rounded-xl p-4 shadow-sm flex-row items-center justify-between">
                            <View className="flex-row items-center">
                                <Ionicons name={item.icon as any} size={24} color="hsl(var(--accent))" />
                                <Text className="ml-3 text-lg text-card-foreground">{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={24} color="hsl(var(--muted-foreground))" />
                        </Card>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}   

export default Profile;
