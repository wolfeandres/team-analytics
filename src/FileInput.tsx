import DatabaseHandler from "./Handlers/DatabaseHandler"

const readJsonFile = (file: Blob) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader()

        fileReader.onload = event => {
            if (event.target) {
                resolve(JSON.parse(event.target.result as string))
            }
        }

        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
    })

interface Props {
    passFiles: (arg: any) => void
}

const FileInput: React.FC<Props> = ({passFiles}) => {
    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            let files = []
            for (let i = 0; i < event.target.files.length; i++) {
                const parsedData = await readJsonFile(event.target.files[i])
                console.log(parsedData)
                files.push(parsedData)
                DatabaseHandler.insertJSON(parsedData)
            }
            passFiles(files)
        }
    }

    return (
        <input hidden type="file" multiple accept=".json,application/json" onChange={onChange} />
    )
}

export default FileInput;