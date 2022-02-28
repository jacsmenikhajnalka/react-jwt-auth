import axios from 'axios';
import React,{useState} from 'react'

function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",

                formData
            );
            console.log(res);
            //--------------------------
            alert(props.konyv_nev)
            let bemenet={
                bevitel1:props.konyv_nev,
                bevitel2:props.konyv_tipus,
                bevitel3:fileName
              }
          
              fetch('http://localhost:8080/felvitel',{
                method: "POST",
                body: JSON.stringify(bemenet),
                headers: {"Content-type": "application/json; charset=UTF-8"}
              }
                 
              )
              .then((response) => response.text())
              .then((szoveg) => {
          
              alert(szoveg)
               this.props.konyv_nev() 
          
          })
              
          
            //--------------------------
        } catch (ex) {
            console.log(ex);
        }
    };

        return (
            <div className="App">
                <input type="file" onChange={saveFile} />
                <button onClick={uploadFile}>Felvitel</button>
            </div>
        );
}

export default FileUpload;