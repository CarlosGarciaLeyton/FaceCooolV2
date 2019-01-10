import * as React from 'react'
import { WrappedFieldProps, WrappedFieldInputProps } from 'redux-form';

const handleChange = (input: WrappedFieldInputProps) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = input
    const { files } = e.target
    if (files) {
        const file: File = files[0]
        onChange(file) 
    }
}

const InputFile: React.FunctionComponent<WrappedFieldProps> = (props) => {
    const { input } = props
    return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text bg-light"> Imagen </span>
                </div>
                <div className="custom-file">
                    <input onChange={handleChange(input)} type="file" accept={'.jpg'} className="custom-file-input" id="inputFile" />
                    <label className="custom-file-label" htmlFor="inputFile"> Click para seleccionar una imagen </label>
                </div>
            </div>
        </div>
    )
}

export default InputFile