import { Fragment, useEffect, useState } from 'react'
import styles from './kakaomap.module.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonWalking, faArrowsLeftRight, faCar, faCrosshairs } from '@fortawesome/free-solid-svg-icons'
import HMarker from '../../assets/imgs/hmarker.png'
import Bocchi from '../../assets/imgs/bocchi.png'
import { getLocation } from '../../utils/get_location'

const KakaoMap = (props: any) => {
  const [map, setMap] = useState(null as any)
  const [selected, setSelected] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState({} as any)
  const [kakaoInfo, setKakaoInfo] = useState({} as any)
  const [selectedDist, setSelectedDist] = useState({ distance: 0, walking: 0, car: 0 })

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }
  const getDistance = (origin_lat: number, origin_lng: number, dest_lat: number, dest_lng: number)  => {
    const r = 6371; // 지구의 반지름(km)
    const dLat = deg2rad(dest_lat - origin_lat)
    const dLng = deg2rad(dest_lng - origin_lng)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(origin_lat)) * Math.cos(deg2rad(dest_lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = r * c

    return distance
  }

  const getMarkerInfo = async (el: any) => {
    const data = (await axios.get(`/v2/local/search/keyword.json?query=${el.place_name}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'KakaoAK 7223e9f0251766089825605f73a1584a'
      }
    }
    )).data

    setSelectedDist({
      distance: Number((getDistance(Number(props.coords.latitude), Number(props.coords.longitude), Number(el.y), Number(el.x)) * 1000).toFixed(0)),
      walking: Number((Number((getDistance(Number(props.coords.latitude), Number(props.coords.longitude), Number(el.y), Number(el.x)) * 1000).toFixed(0)) / 1.3333 / 60).toFixed(0)),
      car: Number((Number((getDistance(Number(props.coords.latitude), Number(props.coords.longitude), Number(el.y), Number(el.x)) * 1000).toFixed(0)) / 6.3 / 60).toFixed(0))
    })
    setSelectedMarker(data.documents[0])
    setSelected(true)
  }

  const getLocationData = async () => {
    const hospital = await getLocation(props.coords)

    const container = document.getElementById('map') as HTMLElement
    const options = { center: new kakao.maps.LatLng(props.coords.latitude, props.coords.longitude), level: 5 }
    const kakaoMap = new kakao.maps.Map(container, options)
    setMap(kakaoMap)
    console.log(map)
    console.log(kakaoInfo)
    

    // Current my location
    new kakao.maps.Marker({
      map: kakaoMap,
      position: new kakao.maps.LatLng(props.coords.latitude, props.coords.longitude),
      image: new kakao.maps.MarkerImage(Bocchi, new kakao.maps.Size(40, 50)),
    })

    await hospital.forEach((el: { y: number; x: number; place_name: string }) => {
      const marker = new kakao.maps.Marker({
        map: kakaoMap,
        position: new kakao.maps.LatLng(el.y, el.x),
        image: new kakao.maps.MarkerImage(HMarker, new kakao.maps.Size(32, 45)),
        title: el.place_name
      })

      const cutsomOverlay =
        `<div class='overlay'>
          <div>${el.place_name}</div>
        </div>`

      new kakao.maps.CustomOverlay({
        map: kakaoMap,
        position: new kakao.maps.LatLng(el.y, el.x),
        content: cutsomOverlay,
        yAnchor: 1.9
      })

      kakao.maps.event.addListener(marker, 'click', () => {
        setKakaoInfo(el)
        getMarkerInfo(el)
      })

      kakao.maps.event.addListener(kakaoMap, 'click', () => {
        setSelected(false)
      })
    })
  }

  useEffect(() => {
    getLocationData()
  },[])

    return (
      <Fragment>
        <div className={ selected ? styles.aniwindow : styles.unaniwindow }>
          <div className={styles.contain}>
            <div className={styles.bar} />
            <div className={styles.name}>{ selectedMarker.place_name }</div>
            <div className={styles.address}>{ selectedMarker.address_name }</div>
            
            <div className={styles.phone}>{ selectedMarker.phone }</div>

            <div className={styles.dircontain}>
              <div className={styles.diriconcontain}>
                <FontAwesomeIcon className={styles.dirplus} icon={faArrowsLeftRight} />
              </div>
              <div className={styles.dirtext}>{ selectedDist.distance }m</div>
            </div>

            <div className={styles.dircontain}>
              <div className={styles.diriconcontain}>
                <FontAwesomeIcon className={styles.dirplus} icon={faPersonWalking} />
              </div>
              <div className={styles.dirtext}>{ selectedDist.walking + 5 }분</div>
            </div>

            <div className={styles.dircontain}>
              <div className={styles.diriconcontain}>
                <FontAwesomeIcon className={styles.dirplus} icon={faCar} />
              </div>
              <div className={styles.dirtext}>{ selectedDist.car + 5 }분</div>
            </div>
          </div>
        </div>

        <div className={styles.crosscontainer}>
          <button className={styles.crosshairs} onClick={() => { setSelected(false) }}>
            <FontAwesomeIcon className={styles.crosshair} icon={faCrosshairs} />
          </button>
        </div>

        <div id="map" className={styles.map}></div>
      </Fragment>
    )
}

export default KakaoMap