import { ChangeEvent, useState } from "react";
import { uploadImage } from "../../../../utils/image-upload";

export const Img = () => {
  const [file, setFile] = useState<File>();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };
  console.log(file);
  const handleOnClick = async (file?: File) => {
    if (!file) {
      console.log("File oruulaagu bn");
      return;
    }

    const imageUrl = await uploadImage(file);
    console.log(imageUrl);
  };
  return (
    <div className="flex flex-col">
      <input type="file" onChange={handleFileChange}></input>
      <button onClick={() => handleOnClick(file)}>upload</button>
    </div>
  );
};
