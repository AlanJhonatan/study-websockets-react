import { MessageInput } from './components/MessageInput'
import { Messages } from './components/Messages'
import { Profiles } from './components/Profiles'

import { LoginModal } from './components/LoginModal'
import { ChatContextProvider } from './context/ChatContextProvider'
import './styles/App.css'

// import cursorImage from './assets/cursor.png'

export function App() {
  return (
    <>
      <ChatContextProvider>
        <LoginModal />
        {/* <div className='cursor-container'>
          <img className="cursor-image" src={cursorImage} alt="" />
          <div className='cursor-name-tag'>Alan Jhonatan</div>
        </div> */}
        <div className="chat-container">
          <div>
            <Profiles />
            <Messages />
            
          </div>

          <div>
            <strong>Alan Jhonatan</strong> is typing...
            <MessageInput />
          </div>
        </div>
      </ChatContextProvider>
    </>
  )
}
