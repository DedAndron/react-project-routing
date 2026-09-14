import { useForm, type SubmitHandler } from "react-hook-form";

type ReviewFormData = {
    grade: number;
    review: string;
};

export default function Review() {
    const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormData>({
        defaultValues: { grade: 0, review: "" },
    });
    const onSubmit: SubmitHandler<ReviewFormData> = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="grade">Grade:</label>
            <input id="grade" type="number" {...register("grade", { valueAsNumber: true, min: 0, max: 5 })} />
            {errors.grade && <span>{errors.grade.message}</span>}
            <label htmlFor="review">Review:</label>
            <textarea id="review" {...register("review", { required: "Review is required" })} />
            {errors.review && <span>{errors.review.message}</span>}
            <button type="submit">Submit review</button>
        </form>
    );
}