import * as Dialog from '@radix-ui/react-dialog'

import { ChangeEvent, useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import '../styles/LoginModal.css'

export function LoginModal() {
    const { doLogin, isLoginEnabled } = useContext(ChatContext)
    
    const [name, setName] = useState<string>('')
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    function handleNameInput(event: ChangeEvent<HTMLInputElement>) {
        const currentName = event.target.value.trim()
        setName(currentName)

        if(currentName.length) {
            setIsDisabled(false)
            return
        }

        setIsDisabled(true)
    }

    function handleLogin() {
        doLogin(name)
    }
    
    return (
        <Dialog.Root open={isLoginEnabled}>
            <Dialog.Trigger asChild>
                <button>Logar</button>
            </Dialog.Trigger>
            <Dialog.Portal>
            <Dialog.Overlay className='modal-overlay' />
            <Dialog.Content className='modal-content'>
                <div className='modal-header'>
                    <Dialog.Title>Chat Login</Dialog.Title>
                </div>

                <div className='modal-body'>
                    <label>Name:</label>
                    <input
                        type="text"
                        onChange={handleNameInput}
                        name='nickname'
                        placeholder='insert your name here' 
                    />
                    <button disabled={isDisabled} onClick={handleLogin}>Enter</button>
                </div>
            </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}