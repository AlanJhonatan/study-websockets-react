import { MessageInput } from './components/MessageInput'
import { Messages } from './components/Messages'
import { Profiles } from './components/Profiles'
import './styles/App.css'

export function App() {
  return (
    <>
      <div className="chat-container">
        <div>
          
          <Profiles />
          <Messages />
        </div>

        <MessageInput />
      </div>
    </>
  )
}
