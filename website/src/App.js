import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, LayerGroup, Circle } from "react-leaflet";
import axios from 'axios';
import { Button } from 'reactstrap';

function App() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  async function getData() {
    try {
      let dataRes = await axios({
        method: "Get",
        url: "http://localhost:3000/api/datas/"
      });

      let res = dataRes.data.data.map((data) => {
        let indicator;

        for (let i = 0; i < categories.length; i++) {
          if ((categories[i].max === null) && (categories[i].min <= data.pm25)) {
            indicator = categories[i];
          } else {
            if (categories[i].min <= data.pm25 && categories[i].max > data.pm25) {
              indicator = categories[i];
            }
          }
        }

        return {
          ...data,
          color: indicator.color
        }
      });

      setData(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCategories() {
    try {
      let categoryRes = await axios({
        method: "Get",
        url: "http://localhost:3000/api/datas/category"
      });

      let category = categoryRes.data.data.map((data) => {
        return {
          ...data
        }
      });
      setCategories(category);
    } catch (error) {
      console.log(error);
    }
  }

  async function exportData() {
    try {
      let res = await axios({
        method: "Get",
        url: "http://localhost:3000/api/exports"
      });

      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  useEffect(() => {
    getData();
  }, [categories])


  return <>
    <MapContainer center={[1.3560600900655584, 103.869189451920089]} zoom={12} scrollWheelZoom={false} style={{ height: "60vh", width: "75%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerGroup>
        {
          data && data.map((data) => {
            return (
              <Circle key={data.device_id} center={[data.lan, data.long]} pathOptions={{ fillColor: data.color }} radius={100} />
            )
          })
        }
      </LayerGroup>
    </MapContainer>

    <Button
      onClick={() => exportData()}
      className="me-2 mt-2 w-50 text-white mb-3"
      style={{ backgroundColor: "black", borderColor: "black" }}
    >
      Export
    </Button>
  </>
}

export default App;