import { Link } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../../store/auth-slice";
import { useToast } from "@/components/hooks/use-toast"



const initialState = {
    userName: "",
    email: "",
    password: "",
}


function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function onSubmit(e) {
        e.preventDefault();
        dispatch(registerUser(formData)).then((data)=>{
           if(data?.payload?.success){
            toast({
                title : data?.payload?.message
            })
            navigate("/auth/login");
           }else{
            toast({
                title : data?.payload?.message,
                variant : "destructive"
            })
           }
        })
    }
    console.log("Form submitted with data: ", formData);
    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Account</h1>
                <p className="mt-2">Already have an account
                    <Link className="font-medium ml-2 text-primary hover:underline" to="/auth/login">Login</Link></p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={"Sign Up"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthRegister;