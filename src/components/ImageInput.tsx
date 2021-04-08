
const ImageInput = ({ form, field }: { form: any, field: any }) => {
    return (
        <input
            name={field.name}
            type="file"
            accept="image/*"
            onChange={e => e.target.files && form.setFieldValue(field.name, e.target.files[0])}
        />
    )
}

export default ImageInput;
