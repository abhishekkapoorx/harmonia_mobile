import React from 'react'
import { Text } from "~/components/ui/text"
import { Modal, View, TouchableOpacity } from 'react-native'
import { ModalObj } from '@/lib/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux-store/store/store'
import EditChatNameModal from './EditChatNameModal'
import { EDIT_CHAT_MODAL } from '@/lib/constants'
import { hideModal } from '@/redux-store/slice/ModalSlice'
import { Ionicons } from '@expo/vector-icons'
import { useColorScheme } from '~/lib/useColorScheme'
import { NAV_THEME } from '@/lib/constants'
import { cn } from '@/lib/utils'

type ModalComponentType = React.ComponentType<any> | null;

const BaseModal = () => {
  const dispatch = useDispatch();
  const { isDarkColorScheme } = useColorScheme();
  const palette = NAV_THEME[isDarkColorScheme ? 'dark' : 'light'];
  
  // Get modal state from Redux
  const { modalType, modalProps, modalTitle, showCloseBtn } = useSelector(
    (state: RootState) => state.modal
  );

  // Log modal state for debugging
  React.useEffect(() => {
    console.log('[DEBUG] Modal state:', { 
      modalType, 
      hasProps: !!modalProps && Object.keys(modalProps).length > 0,
      modalTitle, 
      showCloseBtn 
    });
  }, [modalType, modalProps, modalTitle, showCloseBtn]);

  // Handle close modal
  const handleClose = () => {
    console.log('[DEBUG] Closing modal');
    dispatch(hideModal());
  };

  let ModalComponent: ModalComponentType = null;
  switch(modalType) {
    case EDIT_CHAT_MODAL:
      ModalComponent = EditChatNameModal;
      break;
    default:
      ModalComponent = null;
  }

  // If no modal is selected, don't render anything
  if (!modalType) return null;

  return (
    <View>
      <Modal
        visible={!!modalType}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
        statusBarTranslucent={true}
      >
        <View className="w-full h-full bg-black/50 flex justify-center items-center">
          <View className="w-[85%] rounded-lg p-5 shadow-md bg-background">
            {modalTitle && (
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-foreground">
                  {modalTitle}
                </Text>
                {showCloseBtn && (
                  <TouchableOpacity 
                    onPress={handleClose}
                    className="p-1"
                  >
                    <Ionicons name="close" size={24} color={palette.foreground} />
                  </TouchableOpacity>
                )}
              </View>
            )}
            {ModalComponent ? (
              <ModalComponent {...modalProps} />
            ) : (
              <View className="p-5">
                <Text className="text-foreground">No modal component found</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

    </View>
  )
}

export default BaseModal