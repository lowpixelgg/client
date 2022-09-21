import { Container } from "./styles"
import { Input } from "../../components/Input/index";
import { Button } from "../../components/Button/index"
import { HtmlHTMLAttributes, useState } from "react";


export const Login = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [loading, setLoading] = useState(false)

  return (
    <Container>
      <div id="logo"></div>

      <div id="right-content">
        <img className="rectangle_union" src="./src/assets/Union.png" />
        <img className="rectangle_image" src="./src/assets/rectangle_img.png" />
        <img className="rectangle_border" src="./src/assets/rectangle.png"  />
      </div>

      <div id="login">
        <Input masked={false} placeholder="Email Adress" focus={email.length ? true : false } icon="user" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return setEmail(e.target.value)
        }}/>

        <Input masked={true} placeholder="Password" focus={pass.length ? true : false } icon="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return setPass(e.target.value)
        }}/>
        
        <Button loading={loading} active={email.length && pass.length > 0 ? true : false} onClick={() => setLoading(true) }>Continuar</Button>
      

        <div className="forgotPass">
          <a href="/">
            Forgot the pass? 
            <span> Click Here</span>
          </a>
        </div>

        <div className="createAccount">
            <a href="/">
              Without an account?  
              <span>Register now</span>
            </a>
        </div>
      </div> 
      
      <div id="footer">
        <a href="/">Support</a>
        <a href="/">Terms</a>
        <a href="/">Status</a>
      </div>

    </Container>
  )
}