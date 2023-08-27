import * as Dialog from '@radix-ui/react-dialog'

import '../styles/LoginModal.css'

interface LoginModalProps {
    isOpen: boolean
}

export function LoginModal(props: LoginModalProps) {
    return (
        <Dialog.Root open={props.isOpen}>
            <Dialog.Trigger asChild>
                <button>Logar</button>
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className='modal-overlay' />
            <Dialog.Content className='modal-content'>
                <Dialog.Title />
                <Dialog.Description />
                <Dialog.Close />
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}