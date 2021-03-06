import React, { useEffect, useState } from 'react';

// import { obj } from './test';// тестируем что бы не использовать API
import Modal from './component/Modal';
import './App.scss';

function App() {
  // массив фото на каждый месяц для фона
  const fotoUrl = [
    'https://all-anapa.ru/uploads/media/2krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/4krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/6krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/3krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/5krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/7krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/8krasota_anapi_.jpg',
    'https://all-anapa.ru/uploads/media/anapka_foto_.jpg',
    'https://all-anapa.ru/uploads/media/3anapka_foto_.jpg',
    'https://all-anapa.ru/uploads/media/5anapka_foto_.jpg',
    'https://all-anapa.ru/uploads/media/8anapka_foto_.jpg',
    'https://all-anapa.ru/uploads/media/anapa_orehovaja_roshha_foto.jpg'
  ];
  const arr1 = [];

  const [startDate, setStartDate] = useState('2015-05-24');
  const [camera, setCamera] = useState('MAST');
  const [fotoArr, setFotoArr] = useState([]);
  const [count, setCount] = useState(0);// зависимость, можно узнать сколько раз делали запрос в сессию
  const [modal, setModal] = useState(false);
  const [bg, setBg] = useState('');// фото для модального окна

  function changeCamera(event) {
    setCamera(event.target.value);
  }

  function changeInput(event) {
    setStartDate(event.target.value);
  }
  function changeModal(url) {
    setModal(true);
    setBg(url);
  }
  useEffect(() => {
    async function nasa() {
      try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${startDate}&api_key=Y5QQ8mlXl1TlyGsMjkDxFXB14S3Sy7nvHSJVGUNZ`);
        const result = await response.json();
        if (result.photos[0]) {
          result.photos.forEach((el) => {
            arr1.sort(() => Math.round(Math.random() * 100) - 50);// выдаем случайным образом
            if (el.camera.name === camera && arr1.length < 25) {
              arr1.push(el.img_src);
            }
          });
          setFotoArr(arr1);
        }
      } catch (error) {
        console.log(error);
      }
    }
    nasa();
  }, [count]);

  return (
    <>
      {
        modal && <Modal setModal={setModal} bg={bg} />
      }
      <div className="App" style={{ backgroundImage: `url(${fotoUrl[+startDate.split('-').splice(1, 1) - 1]})` }}>
        <div className="App__wrapper">
          <div className="App__wrapper__foto">
            {
              (fotoArr[0] ? fotoArr.map((el, i) => {
                return (
                  <div className="el" key={Math.random()} style={{ backgroundImage: `url(${fotoArr[i]})` }} onClick={() => changeModal(fotoArr[i])}>
                  </div>
                )
              }) : <h2>Нет фото</h2>)
            }
          </div>
          <div className="App__wrapper__dataForm">
            <select className="seletOptions">
              <option>Curiosity</option>
            </select>
            <select className="seletOptions" value={camera} onChange={changeCamera}>
              <option>FHAZ</option>
              <option>RHAZ</option>
              <option selected>MAST</option>
            </select>
            <input type="date" className="seletOptions" value={startDate} onChange={changeInput} />
            <button className="seletOptions btn" onClick={() => { setCount(() => count + 1); }}>Искать</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
