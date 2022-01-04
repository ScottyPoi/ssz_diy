import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input } from "@chakra-ui/react"

interface vectorPromptProps {
    onOpen: () => void
    onClose: () => void
    // btnRef: React.MutableRefObject<undefined>
    isOpen: boolean
    vectorLen: number
    setVectorLen: React.Dispatch<React.SetStateAction<number>>
}

export default function VectorPrompt(props: vectorPromptProps) {
    const onClose = props.onClose
    const isOpen = props.isOpen
    return (
        <>

        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        //   finalFocusRef={props.btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody>
              <Input placeholder='Type here...' />
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}