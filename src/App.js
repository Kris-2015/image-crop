import React, {useState} from "react";
import './App.css';
import ReactCrop from "react-image-crop";
import {Form, Button, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-image-crop/dist/ReactCrop.css";

function App() {
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16/9 });
  const [result, setResult] = useState(null);

  const handleImage = async (e) => {
    setSrcImg(URL.createObjectURL(e.target.files[0]));
  };

  const getCroppedImg = async() => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 1);
      setResult(base64Image);
      setSrcImg(null);
      setCrop({ aspect: 16/9 });
    } catch (e) {
      console.log("Crop the Image");
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('result', result);
  };

  return (
    <Container className="container" fluid="md">
      <h5 className="header">React Image Crop</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Select Image you want to crop</Form.Label>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          <div>
            {
              srcImg && (
                <div>
                  <ReactCrop
                    style={{ maxWidth: "50%" }}
                    src={srcImg}
                    onImageLoaded={setImage}
                    crop={crop}
                    onChange={setCrop}
                  />
                  <Button
                    className="cropButton"
                    onClick={getCroppedImg}
                  >
                    Crop
                  </Button>
                </div>
              )
            }
            { result && (
              <div style={{ marginTop: 10 }}>
                <img src={result} alt="cropped image" />
              </div>
            )}
          </div>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default App;
