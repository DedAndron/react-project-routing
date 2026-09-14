import { useForm, type SubmitHandler } from "react-hook-form";

type ReviewFormData = {
    grade: number;
    review: string;
};
export default function Review() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ReviewFormData>({
        defaultValues: {
            grade: 0;
            review: ""
        },
    });

    const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
        console.log(data);
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
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: "Confirm Password is required",
                    })}
                />
                {errors.confirmPassword && (
                    <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
                )}
                <br />
                <button type="submit">Register</button>
            </form>
            {/* {errors && console.log(errors)} */}
            Data: {watch("email")}
        </>
    );
}