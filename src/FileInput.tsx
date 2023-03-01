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

type myFunction = {
   getData: (arg: any) => void;  
} 

const FileInput = (getData: myFunction) => {
    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const parsedData = await readJsonFile(event.target.files[0])
            getData.getData(parsedData)
            console.log(parsedData)
        }
    }

    return (
        <input hidden type="file" accept=".json,application/json" onChange={onChange} />
    )
}

export default FileInput;