import LoginForm from "../../components/LoginForm"

function LoginPage() {
    return (
        <div className="h-[100vh] relative">
            <img 
                className="w-full h-full object-cover object-center"
                src="/imgs/bg.jpeg" 
                alt="Background" 
            />

            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[1]">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage