import { useForm, type SubmitHandler } from "react-hook-form";

type AuthorizerFormData = {
    email: string;
    password: string;
};
export default function Authorizer() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AuthorizerFormData>({
        defaultValues: {
            email: "test@gmail.com",
            password: ""
        },
    });

    const onSubmit: SubmitHandler<AuthorizerFormData> = (data) => {
        console.log(data);
    };

    const validateEmail = (value: string) => {
        return value.length === 12 || "Email must be at least 12 characters long";
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email:</label>

                <input
                    type="email"
                    {...register("email", {
                        required: "Email is required",
                        validate: validateEmail,
                    })}
                />
                {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
                <br />
                <label htmlFor="password">Password:</label>

                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long",
                        },
                    })}
                />
                {errors.password && (
                    <span style={{ color: "red" }}>{errors.password.message}</span>
                )}
                <br />
                <button type="submit">Authorizer</button>
            </form>
            {/* {errors && console.log(errors)} */}
            Data: {watch("email")}
        </>
    );
}